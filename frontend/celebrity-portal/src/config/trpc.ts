import type { AppRouter } from '@fanbase/hero';
import { getFetch, httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import { loggerLink } from '@trpc/client/links/loggerLink';
import SuperJSON from 'superjson';

let resolving = false;

const trpc = createTRPCNext<AppRouter>({
    config() {
        return {
            links: [
                loggerLink({
                    enabled: (opts) =>
                        // eslint-disable-next-line turbo/no-undeclared-env-vars
                        (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') ||
                        (opts.direction === 'down' && opts.result instanceof Error),
                }),
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @link https://trpc.io/docs/ssr
                     **/
                    url: 'http://localhost:8000/api/trpc',
                    fetch: async (url, options) => {
                        while (resolving) {
                            continue;
                        }
                        const fetch = getFetch();
                        const res = await fetch(url, { credentials: 'include', ...options });

                        // in this case all the batched requests have the same code, the the whole batch can be handled
                        if (res.status === 401) {
                            resolving = true;
                            return await handleTrpcUnauthError(url as URL, options);
                        }

                        // if nothing happens, carry on with the procedure
                        return res;
                    },
                }),
            ],
            transformer: SuperJSON,
            queryClientConfig: {
                defaultOptions: {
                    queries: { staleTime: 10 * (60 * 1000), cacheTime: 15 * (60 * 1000), retryDelay: 1 * (60 * 1000) },
                },
            },
            ssr: false,
        };
    },
});

export function handleTrpcUnauthError(url: URL, options: any) {
    const trpcFetch = getFetch();
    return new Promise((resolve, reject) => {
        fetch('http://localhost:8000/api/auth/refresh-token', {
            credentials: 'include',
        }).then((data) => {
            if (data.status === 401) {
                reject();
            } else {
                resolve(data);
            }
        });
    })
        .then(() => {
            resolving = false;
            return trpcFetch(url, { ...options, credentials: 'include' });
        })
        .catch(() => {
            resolving = false;
            location.replace('/signin');
            return trpcFetch(url, { ...options, credentials: 'include' });
        });
}

export default trpc;
