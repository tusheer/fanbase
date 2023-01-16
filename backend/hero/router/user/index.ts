import { celebritySignupSchema } from 'schema';
import { router, publicProcedure } from '../../utils/trpc';
import prisma from '../../utils/prisma';
import { TRPCError } from '@trpc/server';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

const userRoute = router({
    createCelebrityUser: publicProcedure
        .input(celebritySignupSchema)
        .mutation(async ({ input: { email, firstName, lastName, password, phoneNumber } }) => {
            try {
                const hashpassword = await argon2.hash(password);

                const celebrityUser = await prisma.celebrity.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        password: hashpassword,
                        phone: Number(phoneNumber),
                    },
                    select: {
                        email: true,
                        id: true,
                        username: true,
                    },
                });
                const token = jwt.sign({ ...celebrityUser }, process.env.JWT_SECRET as string, { algorithm: 'RS256' });

                return { ...celebrityUser, token };
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
