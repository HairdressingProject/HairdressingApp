import React from 'react';
import classes from './Modal.module.scss';

export const Modal = ({ active, children }) => {
    const modalOverlayClasses = [classes["modal-overlay"]];
    const modalContainerClasses = [classes["modal-container"]];

    if (active) {
        modalOverlayClasses.push(classes["modal-overlay-active"]);
        modalContainerClasses.push(classes["modal-container-active"]);
    }

    return (
        <div className={modalContainerClasses.join(' ')}>
            {children}
        </div>
    )
}