import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import z from 'zod';
import customConfig from './utils/default';
import prisma, { connectDB } from './utils/prisma';
import { protectedProcedure, router, Context, createContext } from './utils/trpc';
import { TRPCError } from '@trpc/server';

export const appRouter = router({
    createUser: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                email: z.string().email(),
            })
        )
        .mutation(async ({ input: { email } }) => {
            try {
                const user = await prisma.celebrity.create({
                    data: {
                        email,
                        password: '',
                        username: '',
                    },
                });
                return {
                    ...user,
                };
            } catch (error) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'An unexpected error occurred, please try again later.',
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
