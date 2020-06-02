import React from 'react';
import classes from './Alert.module.scss';
import close from '../../img/icons/close.svg';

export const Alert = ({ show, type, message, dismiss }) => {
    const alertContainerClasses = [classes["alert-container", "grid-x"]];
    const alertMessageClasses = [classes["alert-message-text"]];

    if (!show) {
        alertContainerClasses.push(classes["alert-container-hidden"]);
    }

    if (type === 'success') {
        alertContainerClasses.push(classes["alert-container-success"]);
        alertMessageClasses.push(classes["alert-message-text-white"]);
    }
    else if (type === 'warning') {
        alertContainerClasses.push(classes["alert-container-warning"]);
        alertMessageClasses.push(classes["alert-message-text-white"]);
    }
    else {
        alertContainerClasses.push(classes["alert-container-danger"]);
        alertMessageClasses.push(classes["alert-message-text-white"]);
    }

    return (
        <div className={alertContainerClasses.join(' ')} expanded="true">
            <div className="cell small-12">
                <p className={classes["alert-message-container"]}>
                    <span className={alertMessageClasses.join(' ')}>
                        {message}
                    </span>

                    <button onClick={dismiss} className={classes["close-alert-button"]}>
                        <img src={close} alt="Close alert" className={classes["close-alert-img"]} />
                    </button>

                </p>
            </div>
        </div>
    )
}