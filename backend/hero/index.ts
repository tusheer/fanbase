import * as trpcExpress from '@trpc/server/adapters/express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import customConfig from './config/default';
import authRouter from './router/auth';
import uploadRouter from './router/upload';
import userRoute from './router/user';
import redisClient, { connectRedis } from './utils/connectRedis';
import { connectDB } from './utils/prisma';
import { Context, createContext, router } from './utils/trpc';

//TODO : Add lodash in packages

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
app.use('/api/auth', authRouter);
app.use('/api/upload', uploadRouter);

const port = customConfig.port;
app.listen(port, () => {
    connectDB();
    connectRedis();
    redisClient.on('error', (err) => console.log(err));
    console.log(`🚀 Server listening on port ${port}`);
});

export type { Context };
