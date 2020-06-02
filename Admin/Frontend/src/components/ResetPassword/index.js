import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mail from '../../img/icons/mail.svg';
import password from '../../img/icons/password.svg';

import classes from './ResetPassword.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';
import { useDispatch } from 'react-redux';
import { userActions, resourceActions } from '../../_actions/index';
import { resourceNames } from '../../_constants';
import { useSelector } from 'react-redux';
import { Alert } from '../Alert';
import { TailSpin } from 'svg-loaders-react';
import { useHistory } from 'react-router-dom';

export const ResetPassword = () => {
    const [token, setToken] = useState(null);
    const [userEmail, setUserEmail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);
    const resources = useSelector(state => state.resources);
    const users = useSelector(state => state.users);

    const history = useHistory();
    const dispatch = useDispatch();

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    useEffect(() => {
        const token = query.get("token");

        if (!token || !token.trim()) {
            // no token, redirect to /sign_in
            history.push('/sign_in');
            return;
        }

        setToken(token);

        dispatch(resourceActions.get(resourceNames.USERS, token));
    }, [dispatch, history, query]);

    useEffect(() => {
        console.log("Resources updated:");
        console.dir(resources);

        if (resources && resources.users && resources.users.item && resources.users.item.userEmail) {
            setUserEmail(resources.users.item.userEmail);
        }

        if (resources && resources.users && resources.users.error) {
            const errors = Object
                .values(resources.users.error)
                .reduce((acc, err) => {
                    err.forEach(e => acc.push(e));
                    return acc;
                }, [])
                .map(err => ({
                    type: 'danger',
                    message: err
                }));

            setErrors(errors);
        }
    }, [resources]);

    useEffect(() => {
        // Processing set new password...
        if (users.requestingSetNewPassword && !users.processedSetNewPassword) {
            setLoading(true);
        }

        // Successfully set new password
        else if (!users.requestingSetNewPassword && users.processedSetNewPassword) {
            setLoading(false);
            history.push('/');
        }

        // Something went wrong
        else if (!users.requestingSetNewPassword && !users.processedSetNewPassword && users.setNewPasswordErrors) {
            setLoading(false);
            const errors = Object
                .values(users.setNewPasswordErrors)
                .reduce((acc, err) => {
                    err.forEach(e => acc.push(e));
                    return acc;
                }, [])
                .map(err => ({
                    type: 'danger',
                    message: err
                }));

            setErrors(errors);
        }

        // Request hasn't been made yet
        else {
            setLoading(false);
        }
    }, [users, history]);

    const initialFormFields = [
        {
            label: 'Email',
            input: 'user@mail.com',
            type: 'email',
            icon: mail,
            disabled: true
        },
        {
            label: 'New password',
            input: '',
            type: 'password',
            icon: password,
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
                    errorMessage: 'Minimum 6 characters required',
                    check: (input) => {
                        return input.trim().length < 6;
                    }
                },
                {
                    error: false,
                    errorMessage: 'Maximum 512 characters allowed',
                    check: (input) => {
                        return input.length > 512;
                    }
                },
                {
                    error: false,
                    errorMessage: 'Passwords do not match',
                    check: (input, allFormFields) => {
                        const confirmPasswordField = allFormFields.find(f => f.label === 'Confirm new password');
                        const passwordsMatch = confirmPasswordField.touched && input !== confirmPasswordField.input;

                        return passwordsMatch;
                    }
                }
            ]
        },
        {
            label: 'Confirm new password',
            input: '',
            type: 'password',
            icon: password,
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
                    errorMessage: 'Minimum 6 characters required',
                    check: (input) => {
                        return input.trim().length < 6;
                    }
                },
                {
                    error: false,
                    errorMessage: 'Maximum 512 characters allowed',
                    check: (input) => {
                        return input.length > 512;
                    }
                },
                {
                    error: false,
                    errorMessage: 'Passwords do not match',
                    check: (input, allFormFields) => {
                        const newPasswordField = allFormFields.find(f => f.label === 'New password');
                        const passwordsMatch = newPasswordField.touched && input !== newPasswordField.input;

                        return passwordsMatch;
                    }
                }
            ]
        }
    ];

    useEffect(() => {
        if (userEmail) {
            initialFormFields[0].input = userEmail;
        }
    }, [userEmail, initialFormFields]);

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
            <Alert
                show={loading}
                message="Processing...do not close this tab"
                type="warning"
            />
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
                    )) : ''
            }

            <div className={[classes["newpassword-container"], "text-center"].join(' ')}>
                <div className="grid-x">
                    <div className={[classes["newpassword-form"], "cell", "small-12", "medium-6", "text-center"].join(' ')}>
                        <div className={classes["newpassword-title-container"]}>
                            <div className="cell small-12">
                                <h1>
                                    Hairdressing Application - Admin Portal
                        </h1>
                            </div>
                        </div>
                        <div className={classes["newpassword-subtitle-container"]}>
                            <div className="cell small-12">
                                <h2>
                                    Enter your new password below:
                        </h2>
                            </div>
                        </div>

                        <FormWithValidation
                            initialFormFields={initialFormFields}
                            handleSubmit={(e, isFormValid, formFields) => {
                                // handle form submission here
                                e.preventDefault();

                                if (isFormValid) {
                                    const newPassword = formFields[1].input;
                                    dispatch(userActions.setNewPassword(userEmail, newPassword, token));
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
                                                <div className={classes["newpassword-form-row"]} key={index}>
                                                    <div className="cell small-8 text-center">
                                                        <div
                                                            key={index}
                                                            id={field.label.toLowerCase().split(' ').join('-')}
                                                            className={[classes["newpassword-form-field"], classes["newpassword-form-field-text-input"]].join(' ')}
                                                            error={field.validation?.some(v => v.error)}
                                                        >
                                                            <label></label>
                                                            <div>
                                                                <label className={classes["newpassword-form-label"]}>
                                                                    <img src={field.icon} alt={field.label} className={classes["newpassword-form-mail"]} />
                                                                </label>
                                                                {
                                                                    field.label === 'Email' ?
                                                                        userEmail ?


                                                                            (
                                                                                <input
                                                                                    type={field.type}
                                                                                    value={userEmail}
                                                                                    required={field.required}
                                                                                    disabled={field.disabled}
                                                                                    className={classes["newpassword-form-input-field"]}
                                                                                    placeholder={userEmail}
                                                                                />
                                                                            )
                                                                            :
                                                                            (
                                                                                <input
                                                                                    type={field.type}
                                                                                    value={field.input}
                                                                                    required={field.required}
                                                                                    disabled={field.disabled}
                                                                                    className={classes["newpassword-form-input-field"]}
                                                                                    placeholder={field.input}
                                                                                />
                                                                            )
                                                                        :
                                                                        (
                                                                            <input
                                                                                type={field.type}
                                                                                value={field.input}
                                                                                required={field.required}
                                                                                disabled={field.disabled}
                                                                                onChange={e => setInputValue(field, e)}
                                                                                onFocus={() => setFieldTouched(field)}
                                                                                onBlur={e => handleBlur(field, e)}
                                                                                className={classes["newpassword-form-input-field"]}
                                                                                placeholder={field.label}
                                                                            />
                                                                        )
                                                                }

                                                            </div>
                                                            {
                                                                field.validation ?
                                                                    field
                                                                        .validation
                                                                        .filter(v => v.error)
                                                                        .map(v => v.errorMessage)
                                                                        .map((msg, i) => (
                                                                            <p
                                                                                key={i}
                                                                                className={classes["newpassword-form-input-field-error"]}
                                                                            >
                                                                                {msg}
                                                                            </p>
                                                                        )) : ''
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className={classes["newpassword-form-submit"]}>
                                            <div className={[classes["newpassword-form-submit-container"], "cell", "small-12"].join(' ')}>
                                                <button
                                                    type="submit"
                                                    className={
                                                        isFormValid ?
                                                            classes["newpassword-form-submit-button"] :
                                                            [classes["newpassword-form-submit-button"], classes["newpassword-form-submit-button-invalid"]].join(' ')
                                                    }
                                                    disabled={!isFormValid || loading}
                                                >
                                                    {
                                                        loading ?
                                                            <TailSpin />
                                                            : 'Change password'
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
                            Returning user? <span className={classes["signin-span"]}><Link to="/sign_in" className={classes["signin-link"]}>Sign In</Link></span>
                        </p>
                    </div>
                    <div className={[classes["signup-container"], "cell small-12"]}>
                        <p className={classes["signup-text"]}>
                            New user? <span className={classes["signup-span"]}><Link to="/sign_up" className={classes["signup-link"]}>Sign Up</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}