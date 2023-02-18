import { ZodError } from '@fanbase/schema';
import * as trpcExpress from '@fanbase/trpc/server';
import { inferAsyncReturnType, initTRPC } from '@fanbase/trpc/server';
import superjson from '@fanbase/trpc/superjson';
export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export const trpc = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError:
                    error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        };
    },
});

export const middleware = trpc.middleware;
export const publicProcedure = trpc.procedure;

export const router = trpc.router;

export type InferMiddlwareContextType<T extends (value: (newValue: any) => any) => any> = T extends (
    e: (e: { ctx: infer E }) => any
) => any
    ? E
    : never;

export type Context = inferAsyncReturnType<typeof createContext>;
