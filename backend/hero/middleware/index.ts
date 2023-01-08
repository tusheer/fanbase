import { TRPCError } from '@trpc/server';
import { middleware } from '../utils/trpc';

export const isAuthed = middleware(({ next, ctx }) => {
    if (!ctx?.req.headers.token) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.req.headers.token,
        },
    });
});
