import React from 'react';
import './MenuItem.scss';

export const MenuItem = ({text, icon}) => {

    return (
        <div className="menu-item-container">
            <button className="menu-item-btn grid-x">
                <div className="menu-item-img cell small-4">
                    <img 
                        src={icon} 
                        alt={text} 
                        style={{position: 'relative', width: '100%', height: '100%'}}
                    />
                </div>
                <div className="cell small-8">
                    <span className="menu-item-name">
                        {text}
                    </span>
                </div>
            </button>
        </div>
    )
}