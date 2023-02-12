import { celebritySignupSchema, signinSchema, updateProfilePicturerSchema } from '@fanbase/schema';
import protectedProcedure from '../../middleware/protectedTrpcProdedure';
import { publicProcedure, router } from '../../utils/trpc';

import {
    createCelebrityUserController,
    getCelebrityProfileController,
    logoutCelebrityUserController,
    singinCelebrityUser,
    updateCelebrityProfilePicture,
} from '../../controller/user';

const userRoute = router({
    createCelebrityUser: publicProcedure.input(celebritySignupSchema).mutation(createCelebrityUserController),
    signinCelebrityUser: publicProcedure.input(signinSchema).mutation(singinCelebrityUser),
    getCelebrityProfile: protectedProcedure.query(getCelebrityProfileController),
    logoutCelebrityUser: protectedProcedure.mutation(logoutCelebrityUserController),
    updateCelebrityProfilePicturer: protectedProcedure
        .input(updateProfilePicturerSchema)
        .mutation(updateCelebrityProfilePicture),
});

export default userRoute;
