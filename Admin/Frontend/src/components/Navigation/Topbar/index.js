import React from 'react';
import './Topbar.scss';
import hair from '../../../img/icons/hair.svg';
import hairText from '../../../img/icons/hairdressing-project.svg';


export const Topbar = () => {
    return (
        <div className="_top-bar">
            <div className="_top-bar-left">
                <img src={hair} className="_top-bar-logo" alt="Logo" />
                <img src={hairText} className="_top-bar-text" alt="Hairdressing Project" />
            </div>
        </div>
    )
}