import React from 'react';
import './MenuItem.scss';

import { LinkWithDropdown } from 'react-foundation-components';

export const MenuItem = ({text, icon, subItems}) => {

    return (
        <div className="menu-item-container">
            <div className="dropdown-container">

            <LinkWithDropdown
                dropdownContent={

                    subItems.map((item, index) =>(
                    <p key={index}>{item}</p>
                    ))
                }
            >
                <button className="menu-item-btn grid-x" dropdown>
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
            </LinkWithDropdown>



            </div>


        </div>
    )
}