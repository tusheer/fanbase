import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import z from 'zod';
import customConfig from './utils/default';
import prisma, { connectDB } from './utils/prisma';
import { procedure, router, Context, createContext } from './utils/trpc';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
    getUsers: procedure.query(async () => {
        const users = await prisma.user.findMany();
        return {
            users: [...users],
        };
    }),

    createUser: procedure
        .input(
            z.object({
                name: z.string(),
                email: z.string().email(),
            })
        )
        .mutation(async ({ input: { email, name } }) => {
            try {
                const user = await prisma.user.create({
                    data: {
                        email,
                        name,
                    },
                });
                return {
                    ...user,
                };
            } catch (error) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'An unexpected error occurred, please try again later.',
                    // optional: pass the original error to retain stack trace
                    cause: error,
                });
            }
        }),
});

export type AppRouter = typeof appRouter;

const app = express();

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

export { Context };
