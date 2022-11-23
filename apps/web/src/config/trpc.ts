import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from 'backend';

import { loggerLink } from '@trpc/client/links/loggerLink';
import SuperJSON from 'superjson';

export const trpc = createTRPCNext<AppRouter>({
    config({ ctx }) {
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
                    url: `http://localhost:8000/api/trpc`,
                }),
            ],
            transformer: SuperJSON,
            /**
             * @link https://tanstack.com/query/v4/docs/reference/QueryClient
             **/
            // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
        };
    },
});

export default trpc;
