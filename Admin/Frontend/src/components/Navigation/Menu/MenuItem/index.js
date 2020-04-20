import React from 'react';
import './MenuItem.scss';

import { Switch, LinkWithDropdown } from 'react-foundation-components';

export const MenuItem = ({text, icon, subItems}) => {

    return (
        <div className="menu-item-container">
            <div className="dropdown-container grid-container">

            <LinkWithDropdown
                closeOnClickOutside
                dropdownContent={

                    subItems.map((item, index) =>(
                    // <p key={index}>{item}</p>
                    <button key={index} className="dropdown-item-btn grid-x">
                        <div className="dropdown-menu-item cell small-12">
                            {item}
                            {item == 'Show Notifications' &&
                                <Switch defaultChecked />
                            }
                            {item == 'Dark Mode' &&
                                <Switch />
                            }
                        </div>

                    </button>
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