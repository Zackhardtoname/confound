import React from 'react';

const NavBar = ({ title}) => {
    return (
        <nav className='navbar bg-white'>
            <h1>
                {title}
            </h1>
        </nav>
    );
}

export default NavBar;