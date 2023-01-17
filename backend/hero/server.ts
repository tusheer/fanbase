import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import customConfig from './utils/default';
import { connectDB } from './utils/prisma';
import { router, Context, createContext } from './utils/trpc';
import userRoute from './router/user';
import cookieParser from 'cookie-parser';

export const appRouter = router({
    user: userRoute,
});

export type AppRouter = typeof appRouter;

const app = express();

if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'));

app.use(cookieParser());
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

export type { Context };
