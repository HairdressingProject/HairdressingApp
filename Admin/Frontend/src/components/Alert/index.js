import React from 'react';
import { Row, Column } from 'react-foundation-components/lib/grid';
import classes from './Alert.module.scss';
import close from '../../img/icons/close.svg';

export const Alert = ({ show, type, message, dismiss }) => {
    const alertContainerClasses = [classes["alert-container"]];

    if (!show) {
        alertContainerClasses.push(classes["alert-container-hidden"]);
    }

    if (type === 'success') {
        alertContainerClasses.push(classes["alert-container-success"]);
    } else {
        alertContainerClasses.push(classes["alert-container-danger"]);
    }

    return (
        <Row className={alertContainerClasses.join(' ')} expanded>
            <Column small={10}>
                <p className={classes["alert-text"]}>
                    {message}
                </p>
            </Column>
            <Column small={2} className={classes["close-alert-container"]}>
                <button onClick={dismiss} className={classes["close-alert-button"]}>
                    <img src={close} alt="Close alert" className={classes["close-alert-img"]} />
                </button>
            </Column>
        </Row>
    )
}