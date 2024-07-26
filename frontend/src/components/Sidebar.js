import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sidebar">
            <ul>
                <li><Link to="/">Company List</Link></li>
                <li><Link to="/details">Company Details</Link></li>
            </ul>
        </nav>
    );
};

export default Sidebar;
