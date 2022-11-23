import { Button } from 'ui';
import trpc from '../src/config/trpc';

export default function Web() {
    const { data } = trpc.getId.useQuery();
    // if (isLoading) return 'Loading';

    return (
        <div>
            <h1>Web</h1>
            {data?.value}
            <Button />
        </div>
    );
}
