import { celebritySignupSchema } from 'schema';
import { router, publicProcedure } from '../../utils/trpc';

import { createCelebrityUserController } from '../../controller/user';

const userRoute = router({
    createCelebrityUser: publicProcedure.input(celebritySignupSchema).mutation(createCelebrityUserController),
});

export default userRoute;
