import { celebritySignupSchema } from 'schema';
import { router, protectedProcedure } from '../../utils/trpc';

const userRoute = router({
    createCelebrityUser: protectedProcedure.input(celebritySignupSchema).mutation(() => {
        return {};
    }),
});

export default userRoute;
