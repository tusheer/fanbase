import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ZodError } from 'zod';
import cookieParser from 'cookie-parser';

export const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });

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

export const middleware = t.middleware;
export const publicProcedure = t.procedure;

export const router = t.router;

export const isAuthed = middleware(({ next, ctx }) => {
    const access_token = cookieParser;
    console.log(ctx.req.headers.cookie);
    if (!ctx?.req.headers.cookies) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: {
                username: 'janeasdf',
            },
        },
    });
});

type InferMiddlwareContextType<T extends (value: (newValue: any) => any) => any> = T extends (
    e: (e: { ctx: infer E }) => any
) => any
    ? E
    : never;

export const protectedProcedure = t.procedure.use(isAuthed);

export type Context = inferAsyncReturnType<typeof createContext>;

export type AuthContext = InferMiddlwareContextType<(typeof protectedProcedure)['query']>;
