import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import z from 'zod';
import customConfig from './utils/default';
import prisma, { connectDB } from './utils/prisma';
import { procedure, router, Context, createContext } from './utils/trpc';

export const appRouter = router({
    createUser: procedure
        .input(
            z.object({
                name: z.string(),
                email: z.string().email(),
            })
        )
        .mutation(async ({ input: { email, name } }) => {
            console.log('URL', process.env.MONGODBURL);

            const user = await prisma.user.create({
                data: {
                    email,
                    name,
                },
            });
            console.log(user);
            return {
                ...user,
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

export { Context };
