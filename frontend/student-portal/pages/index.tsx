import { Button } from 'ui';
import trpc from '../src/config/trpc';

export default function Web() {
    const utils = trpc.useContext();

    const { data } = trpc.getUsers.useQuery();

    const createUser = trpc.createUser.useMutation();

    const handleCreateUser = async () => {
        createUser.mutate(
            {
                email: 'tusher@gmail.com',
                name: 'tusher',
                surname: 'asdf',
            },
            {
                onSuccess: function () {
                    utils.getUsers.invalidate();
                },
            }
        );
    };

    return (
        <div>
            {JSON.stringify(data?.users)}
            <h1 onClick={handleCreateUser}> {createUser.isSuccess ? createUser.data.id : 'No data found '}</h1>
            <Button />
        </div>
    );
}
