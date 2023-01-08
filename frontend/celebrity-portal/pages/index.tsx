import trpc from '../src/config/trpc';

export default function Web() {
    const createUser = trpc.createUser.useMutation();

    const handleCreateUser = async () => {
        createUser.mutate({
            email: Number(new Date()) + 'nedata@gmail.com',
            name: 'NEw Data',
        });
    };

    return (
        <div>
            <button style={{ marginBottom: '20px' }} onClick={handleCreateUser}>
                Create New User
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}></div>
        </div>
    );
}
