import React, { PropsWithChildren } from 'react';
import Navbar from '../../components/navbar';

const BaseLayout: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className = '' }) => {
    return (
        <main className={className}>
            <Navbar />
            {children}
        </main>
    );
};

export default BaseLayout;
