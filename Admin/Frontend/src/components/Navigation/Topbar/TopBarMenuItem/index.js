import React from 'react';
// import './TopbarMenuItem.scss';

export const TopbarMenuItem =({icon, text}) => (
    <div className={
        ['item-container', 'grid-container'].join(' ')
    }>
        <button className={
            ['item-btn', 'grid-x'].join(' ')
        }
        >
            <div className="cell small-4">
                <img
                    src={icon}
                    alt={text}
                    className="item-img"
                />
            </div>
            <div className="cell small-4">
                <span className="item-name">
                    {text}
                </span>
            </div>

        </button>
    </div>
)