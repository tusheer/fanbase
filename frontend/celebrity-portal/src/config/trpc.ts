import { httpBatchLink } from '@trpc/client';
import { createTRPCNext, CreateTRPCNext } from '@trpc/next';
import type { AppRouter } from 'hero';

import { loggerLink } from '@trpc/client/links/loggerLink';
import SuperJSON from 'superjson';

const trpc: CreateTRPCNext<AppRouter, any, any> = createTRPCNext<AppRouter>({
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
                }),
            ],
            transformer: SuperJSON,
            /**
             * @link https://tanstack.com/query/v4/docs/reference/QueryClient
             **/
            queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
});

export default trpc;
