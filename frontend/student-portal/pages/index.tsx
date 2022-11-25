import { Button } from 'ui';
import trpc from '../src/config/trpc';

export default function Web() {
    const createUser = trpc.createUser.useMutation();

    const handleCreateUser = async () => {
        createUser.mutate({
            email: 'tusher@gmail.com',
            name: 'tusher',
        });
    };

    return (
        <div>
            <h1 onClick={handleCreateUser}> {createUser.isSuccess ? createUser.data.id : 'No data found '}</h1>
            <Button />
        </div>
    );
}
