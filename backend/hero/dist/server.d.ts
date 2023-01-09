import * as _trpc_server from '@trpc/server';
import { inferAsyncReturnType } from '@trpc/server';
import * as superjson from 'superjson';
import * as _trpc_server_dist_rpc from '@trpc/server/dist/rpc';
import * as qs from 'qs';
import * as express_serve_static_core from 'express-serve-static-core';
import * as express from 'express';
import express__default from 'express';
import zod from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

declare const createContext: ({ req, res }: trpcExpress.CreateExpressContextOptions) => {
    req: express.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
    res: express.Response<any, Record<string, any>>;
};
type Context = inferAsyncReturnType<typeof createContext>;

declare const appRouter: _trpc_server.CreateRouterInner<_trpc_server.RootConfig<{
    ctx: {
        req: express__default.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
        res: express__default.Response<any, Record<string, any>>;
    };
    meta: object;
    errorShape: {
        data: {
            zodError: zod.typeToFlattenedError<any, string> | null;
            code: "PARSE_ERROR" | "BAD_REQUEST" | "INTERNAL_SERVER_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "METHOD_NOT_SUPPORTED" | "TIMEOUT" | "CONFLICT" | "PRECONDITION_FAILED" | "PAYLOAD_TOO_LARGE" | "TOO_MANY_REQUESTS" | "CLIENT_CLOSED_REQUEST";
            httpStatus: number;
            path?: string | undefined;
            stack?: string | undefined;
        };
        message: string;
        code: _trpc_server_dist_rpc.TRPC_ERROR_CODE_NUMBER;
    };
    transformer: typeof superjson.default;
}>, {
    createUser: _trpc_server.BuildProcedure<"mutation", {
        _config: _trpc_server.RootConfig<{
            ctx: {
                req: express__default.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
                res: express__default.Response<any, Record<string, any>>;
            };
            meta: object;
            errorShape: {
                data: {
                    zodError: zod.typeToFlattenedError<any, string> | null;
                    code: "PARSE_ERROR" | "BAD_REQUEST" | "INTERNAL_SERVER_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "NOT_FOUND" | "METHOD_NOT_SUPPORTED" | "TIMEOUT" | "CONFLICT" | "PRECONDITION_FAILED" | "PAYLOAD_TOO_LARGE" | "TOO_MANY_REQUESTS" | "CLIENT_CLOSED_REQUEST";
                    httpStatus: number;
                    path?: string | undefined;
                    stack?: string | undefined;
                };
                message: string;
                code: _trpc_server_dist_rpc.TRPC_ERROR_CODE_NUMBER;
            };
            transformer: typeof superjson.default;
        }>;
        _meta: object;
        _ctx_out: _trpc_server.Overwrite<{
            req: express__default.Request<express_serve_static_core.ParamsDictionary, any, any, qs.ParsedQs, Record<string, any>>;
            res: express__default.Response<any, Record<string, any>>;
        }, {
            user: string | string[];
        }>;
        _input_in: {
            name: string;
            email: string;
        };
        _input_out: {
            name: string;
            email: string;
        };
        _output_in: typeof _trpc_server.unsetMarker;
        _output_out: typeof _trpc_server.unsetMarker;
    }, {
        id: string;
        email: string;
        username: string;
        firstName: string | null;
        lastName: string | null;
        phone: number | null;
        password: string;
        createdAt: Date;
        updateAt: Date;
        country: string | null;
    }>;
}>;
type AppRouter = typeof appRouter;

export { AppRouter, Context, appRouter };
