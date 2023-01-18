import { celebritySignupSchema, signinSchema } from 'schema';
import { router, publicProcedure } from '../../utils/trpc';

import { createCelebrityUserController, singinCelebrityUser } from '../../controller/user';

const userRoute = router({
    createCelebrityUser: publicProcedure.input(celebritySignupSchema).mutation(createCelebrityUserController),
    signinCelebrityUser: publicProcedure.input(signinSchema).mutation(singinCelebrityUser),
});

export default userRoute;
