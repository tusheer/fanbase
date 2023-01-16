import { celebritySignupSchema } from 'schema';
import { router, publicProcedure } from '../../utils/trpc';
import prisma from '../../utils/prisma';
import { TRPCError } from '@trpc/server';

const userRoute = router({
    createCelebrityUser: publicProcedure
        .input(celebritySignupSchema)
        .mutation(async ({ input: { email, firstName, lastName, password, phoneNumber } }) => {
            try {
                const celebrityUser = await prisma.celebrity.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        password,
                        phone: Number(phoneNumber),
                    },
                });
                console.log({ email });
                return celebrityUser;
            } catch (error) {
                throw new TRPCError({
                    cause: error,
                    code: 'BAD_REQUEST',
                    message: 'Bad Request',
                });
            }
        }),
});

export default userRoute;
