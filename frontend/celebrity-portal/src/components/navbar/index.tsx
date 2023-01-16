import React from 'react';
import { Button } from 'ui/components';

const Navbar = () => {
    return (
        <nav className="h-16 bg-white border-b ">
            <div className="max-w-7xl px-5 flex justify-between items-center mx-auto ">
                <div>Fanbase</div>
                <div>
                    <Button>Hi</Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
