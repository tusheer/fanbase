import { celebritySchema } from '../../schema/user';
import { router, protectedProcedure } from '../../utils/trpc';

const userRoute = router({
    createCelebrityUser: protectedProcedure.input(celebritySchema).mutation(() => {
        return {};
    }),
});

export default userRoute;
