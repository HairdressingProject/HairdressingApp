import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Alert } from '../Alert';
import mail from '../../img/icons/mail.svg';

import classes from './ForgotPassword.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions/user.actions';
import { TailSpin } from 'svg-loaders-react';

export const ForgotPassword = () => {
    const initialFormFields = [
        {
            label: 'Username or email',
            input: '',
            type: 'text',
            touched: false,
            required: true,
            validation: [
                {
                    error: false,
                    errorMessage: 'This field is required',
                    check: (input) => {
                        return !input || !input.trim();
                    }
                },
                {
                    error: false,
                    errorMessage: 'Spaces are not allowed in this field',
                    check: (input) => {
                        return /\s/g.test(input.trim());
                    }
                },
                {
                    error: false,
                    errorMessage: 'Maximum 512 characters allowed',
                    check: (input) => {
                        return input.length > 512;
                    }
                }
            ]
        }
    ];

    const dispatch = useDispatch();
    const users = useSelector(state => state.users);
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (users && users.processedRecoverPassword && users.forgotPasswordErrors) {
            setLoading(false);
            setErrors(
                Object
                    .values(users.forgotPasswordErrors)
                    .reduce((acc, err) => {
                        err.forEach(e => acc.push(e));
                        return acc;
                    }, [])
                    .map(err => ({
                        type: 'danger',
                        message: err
                    }))
            );
        }

        if (users && users.processedRecoverPassword && !users.forgotPasswordErrors) {
            setLoading(false);
            setSuccess({
                type: 'success',
                message: 'Instructions to recover your password have been sent to your email.'
            });
        }

        // Show loading spinner or something in this case
        if (users && users.requestingRecoverPassword) {
            setLoading(true);
        }
    }, [users]);

    const dismissError = err => {
        if (errors && errors.length) {
            const updatedErrors = errors.filter(error => error.message !== err.message);
            setErrors(updatedErrors);
            return;
        }
        setErrors(null);
    }

    return (
        <div className={classes["main-container"]}>

            {
                loading ?
                    (
                        <Alert
                            message="Processing...do not close this tab"
                            show={true}
                            type="warning"
                        />
                    )
                    :
                    ''
            }

            {
                !loading && errors && errors.length ?
                    errors.map((err, i) => (
                        <Alert
                            key={i}
                            show={true}
                            type={err.type}
                            message={err.message}
                            dismiss={() => dismissError(err)}
                        />
                    ))
                    :
                    ''
            }

            {
                !loading && success ?
                    <Alert
                        show={true}
                        type={success.type}
                        message={success.message}
                        dismiss={() => setSuccess(null)}
                    />
                    : ''
            }

            <div className={[classes["forgotpassword-container"], "text-center"].join(' ')}>
                <div className="grid-x">
                    <div className={[classes["forgotpassword-form"], "cell", "small-12", "medium-8"].join(' ')}>
                        <div className={classes["forgotpassword-title-container"]}>
                            <div className="cell small-12">
                                <h1>
                                    Hairdressing Application - Admin Portal
                        </h1>
                            </div>
                        </div>
                        <div className={[classes["forgotpassword-subtitle-container"], "grid-x"].join(' ')}>
                            <div className="cell small-12">
                                <h2>
                                    Enter your registered username or email below to
                                    recover your password.
                                </h2>
                            </div>
                        </div>

                        <FormWithValidation
                            initialFormFields={initialFormFields}
                            handleSubmit={(e, isFormValid, formFields) => {
                                // handle form submission here
                                e.preventDefault();

                                if (isFormValid) {
                                    const usernameOrEmail = formFields[0].input;
                                    dispatch(userActions.forgotPassword(usernameOrEmail));
                                    // setLoading(true);
                                }
                            }}
                            fields={(
                                formFields,
                                setInputValue,
                                setFieldTouched,
                                isFormValid,
                                handleBlur) => (
                                    <>
                                        {
                                            formFields.map((field, index) => (
                                                <div className={classes["forgotpassword-form-row"]} key={index}>
                                                    <div className="cell small-8 text-center">
                                                        <div
                                                            key={index}
                                                            id={field.label.toLowerCase().split(' ').join('-')}
                                                            className={[classes["forgotpassword-form-field"], classes["forgotpassword-form-field-text-input"]].join(' ')}
                                                            error={field.validation?.some(v => v.error)}
                                                        >
                                                            <label></label>
                                                            <div>
                                                                <label className={classes["forgotpassword-form-label"]}>
                                                                    <img src={mail} alt="Email" className={classes["forgotpassword-form-mail"]} />
                                                                </label>
                                                                <input
                                                                    type={field.type}
                                                                    value={field.input}
                                                                    required={field.required}
                                                                    onChange={e => setInputValue(field, e)}
                                                                    onFocus={() => setFieldTouched(field)}
                                                                    onBlur={e => handleBlur(field, e)}
                                                                    className={classes["forgotpassword-form-input-field"]}
                                                                    placeholder={field.label}
                                                                />
                                                            </div>
                                                            {
                                                                field
                                                                    .validation
                                                                    .filter(v => v.error)
                                                                    .map(v => v.errorMessage)
                                                                    .map((msg, i) => (
                                                                        <p
                                                                            key={i}
                                                                            className={classes["forgotpassword-form-input-field-error"]}
                                                                        >
                                                                            {msg}
                                                                        </p>
                                                                    ))
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className={classes["forgotpassword-form-submit"]}>
                                            <div className={[classes["forgotpassword-form-submit-container"], "cell", "small-12"].join(' ')}>
                                                <button
                                                    type="submit"
                                                    className={
                                                        isFormValid ?
                                                            classes["forgotpassword-form-submit-button"] :
                                                            [classes["forgotpassword-form-submit-button"], classes["forgotpassword-form-submit-button-invalid"]].join(' ')
                                                    }
                                                    disabled={!isFormValid || loading}
                                                >
                                                    {
                                                        loading ?
                                                            <TailSpin />
                                                            :
                                                            'Recover password'
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        />
                    </div>
                </div>
                <div className={classes["links-container"]}>
                    <div className={[classes["signin-container"], "cell", "small-12"].join(' ')}>
                        <p className={classes["signin-text"]}>
                            Returning user? <span className={classes["signin-span"]}><Link to="/sign_in" className={classes["signup-link"]}>Sign In</Link></span>
                        </p>
                    </div>
                    <div className={[classes["signup-container"], "cell", "small-12"].join(' ')}>
                        <p className={classes["signup-text"]}>
                            New user? <span className={classes["signup-span"]}><Link to="/sign_up" className={classes["signup-link"]}>Sign Up</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}