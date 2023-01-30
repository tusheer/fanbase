import { celebritySignupSchema, signinSchema } from 'schema';
import { router, publicProcedure, protectedProcedure } from '../../utils/trpc';

import {
    createCelebrityUserController,
    getCelebrityProfileController,
    singinCelebrityUser,
} from '../../controller/user';

const userRoute = router({
    createCelebrityUser: publicProcedure.input(celebritySignupSchema).mutation(createCelebrityUserController),
    signinCelebrityUser: publicProcedure.input(signinSchema).mutation(singinCelebrityUser),
    getCelebrityProfile: protectedProcedure.query(getCelebrityProfileController),
});

export default userRoute;
