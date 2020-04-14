import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.scss';

export const Sidebar = ({routes}) => (
    <ul className="sidebar-container">
        {
            routes.map((route, index) => (
                <li key={index} className="sidebar-link">
                    <Link to={route.path}>{route.path.slice(1).split('_').join(' ')}</Link>
                </li>
            ))
        }
    </ul>
);