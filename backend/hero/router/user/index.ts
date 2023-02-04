import { celebritySignupSchema, signinSchema } from 'schema';
import protectedProcedure from '../../middleware/protectedTrpcProdedure';
import { publicProcedure, router } from '../../utils/trpc';

import {
    createCelebrityUserController,
    getCelebrityProfileController,
    logoutCelebrityUserController,
    singinCelebrityUser,
} from '../../controller/user';

const userRoute = router({
    createCelebrityUser: publicProcedure.input(celebritySignupSchema).mutation(createCelebrityUserController),
    signinCelebrityUser: publicProcedure.input(signinSchema).mutation(singinCelebrityUser),
    getCelebrityProfile: protectedProcedure.query(getCelebrityProfileController),
    logoutCelebrityUser: protectedProcedure.mutation(logoutCelebrityUserController),
});

export default userRoute;
