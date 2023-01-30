import { TRPCError, inferAsyncReturnType, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ZodError } from 'zod';
import { verifyJwt } from './jwt';

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
    try {
        const access_token = ctx.req.cookies.access_token;
        const device_uid = ctx.req.cookies.device_uid;
        const refresh_token = ctx.req.cookies.refresh_token;
        const logged_in = ctx.req.cookies.logged_in;

        if (!access_token && !device_uid && !refresh_token && !logged_in) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        const decodedUser = verifyJwt(access_token, 'accessTokenPrivateKey');

        if (!decodedUser) {
            throw new TRPCError({ code: 'UNAUTHORIZED' });
        }

        return next({
            ctx: {
                user: decodedUser,
            },
        });
    } catch (error) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
});

type InferMiddlwareContextType<T extends (value: (newValue: any) => any) => any> = T extends (
    e: (e: { ctx: infer E }) => any
) => any
    ? E
    : never;

export const protectedProcedure = t.procedure.use(isAuthed);

export type Context = inferAsyncReturnType<typeof createContext>;

export type AuthContext = InferMiddlwareContextType<(typeof protectedProcedure)['query']>;
