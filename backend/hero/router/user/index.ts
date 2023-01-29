import { celebritySignupSchema, signinSchema } from 'schema';
import { router, publicProcedure, protectedProcedure } from '../../utils/trpc';

import { createCelebrityUserController, getCelebrityProfile, singinCelebrityUser } from '../../controller/user';

const userRoute = router({
    createCelebrityUser: publicProcedure.input(celebritySignupSchema).mutation(createCelebrityUserController),
    signinCelebrityUser: publicProcedure.input(signinSchema).mutation(singinCelebrityUser),
    getCelebrityProfile: protectedProcedure.query(getCelebrityProfile),
});

export default userRoute;
