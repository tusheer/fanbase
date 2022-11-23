import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import z, { ZodError } from 'zod';
import customConfig from './utils/default';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import superjson from 'superjson';
import connectDB from './utils/connectDB';

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({ req, res });

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

export const appRouter = t.router({
    hello: t.procedure
        .input(
            z.object({
                text: z.string(),
            })
        )
        .query(({ input }) => {
            return {
                greeting: `hello ${input.text}`,
            };
        }),

    getId: t.procedure.query(() => {
        return {
            value: 'Some value',
        };
    }),
});

export type AppRouter = typeof appRouter;

const app = express();

// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(
    cors({
        origin: [customConfig.origin, 'http://localhost:3000'],
        credentials: true,
    })
);
app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    })
);

const port = customConfig.port;
app.listen(port, () => {
    connectDB();
    console.log(`🚀 Server listening on port ${port}`);
});
