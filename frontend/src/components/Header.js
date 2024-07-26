import React from 'react';

const Header = ({ onSearch }) => {
    return (
        <header className="header">
            <input type="text" placeholder="Search..." onChange={onSearch} />
        </header>
    );
};

export default Header;
