import Link from 'next/link';

export default function Web() {
    return (
        <div className="bg-dh-yellow-500">
            <Link href={'/signup'}>
                <button style={{ marginBottom: '20px' }}>Create New User</button>
            </Link>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}></div>
        </div>
    );
}
