import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import * as trpcExpress from '@trpc/server/adapters/express';
import z, { ZodError } from 'zod';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });

export type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
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

export const router = t.router;

export const procedure = t.procedure;
