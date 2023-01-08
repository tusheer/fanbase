import { TRPCError } from '@trpc/server';
import { middleware } from '../utils/trpc';

export const isAuthed = middleware(({ next, ctx }) => {
    if (!ctx?.user?.isAdmin) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
