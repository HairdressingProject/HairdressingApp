import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mail from '../../img/icons/mail.svg';
import password from '../../img/icons/password.svg';

import classes from './SignIn.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';
import { connect, useDispatch } from 'react-redux';
import { userActions } from '../../_actions';
import { useSelector } from 'react-redux';
import { Alert } from '../Alert';

const SignIn = () => {
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
        },
        {
            label: 'Password',
            input: '',
            type: 'password',
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
                        return input.trim().length < 6
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
    const authentication = useSelector(state => state.authentication);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (authentication.signInErrors) {

            const errors = Object
                .values(authentication.signInErrors)
                .reduce((acc, err) => {
                    err.forEach(e => {
                        acc.push(e);
                    });
                    return acc;
                }, [])
                .map(msg => ({
                    type: "danger",
                    message: msg
                }));

            setErrors(errors);
        }
    }, [authentication]);

    const dismissError = err => {
        if (errors && errors.length) {
            const updatedErrors = errors.filter(error => error.message !== err.message);
            setErrors(updatedErrors);
            return;
        }
        setErrors(null);
    }

    return (
        <div className={[classes["main-container"], "text-center"].join(' ')}>
            {
                errors ?
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
            <div className={[classes["signin-container"], "text-center"].join(' ')}>
                <div className="grid-x">
                    <div className={[classes["signin-form"], "cell", "small-12", "medium-6", "text-center", "medium-offset-3"].join(' ')}>
                        <div className={classes["signin-title-container"]}>
                            <div className="cell small-12">
                                <h1>
                                    Hairdressing Application - Admin Portal
                        </h1>
                            </div>
                        </div>
                        <div className={classes["signin-subtitle-container"]}>
                            <div className="cell small-12">
                                <h2>
                                    Welcome back! Please login to continue.
                        </h2>
                            </div>
                        </div>

                        <FormWithValidation
                            initialFormFields={initialFormFields}
                            handleSubmit={(e, isFormValid, formFields) => {
                                // handle form submission here
                                e.preventDefault();

                                const inputs = {
                                    usernameOrEmail: formFields[0].input,
                                    password: formFields[1].input,
                                };

                                if (isFormValid) {
                                    if (inputs.usernameOrEmail && inputs.password) {
                                        const { usernameOrEmail, password } = inputs;

                                        dispatch(userActions.login(usernameOrEmail, password));
                                    }
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
                                            formFields.map((field, index) => {

                                                if (field.type === 'checkbox') {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className={classes["signin-form-field"]}
                                                            id={field.label.toLowerCase().split(' ').join('-')}
                                                        >
                                                            <div className={classes["signin-form-checkbox-container"]}>
                                                                <div
                                                                    className={[classes["signin-form-input"], "cell", "small-12"]}
                                                                >
                                                                    <input
                                                                        type={field.type}
                                                                        defaultChecked={field.type === 'checkbox' && field.defaultChecked}
                                                                        value={field.input}
                                                                        onChange={e => setInputValue(field, e)}
                                                                        className={[classes["signin-form-input-field"], classes["sign-form-input-checkbox"]].join(' ')}
                                                                    />
                                                                </div>
                                                                <div className="cell small-6">
                                                                    <label
                                                                        className={classes["signin-form-checkbox-label"]}
                                                                    >
                                                                        {field.label}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div className={classes["signin-form-row"]} key={index}>
                                                            <div className="cell small-8 text-center">
                                                                <div
                                                                    key={index}
                                                                    id={field.label.toLowerCase().split(' ').join('-')}
                                                                    className={[classes["signin-form-field"], classes["signin-form-field-text-input"], "grid-x"].join(' ')}
                                                                >
                                                                    <div className={["cell", "small-12", "medium-6", "medium-offset-3", "grid-x", classes["field-container"]].join(' ')}>
                                                                        <label className={["cell", "small-2", "medium-1", classes["label-icon"]].join(' ')}>
                                                                            {
                                                                                field.label === 'Username or email' ?
                                                                                    <img src={mail} alt="Email" className={classes["signin-form-icon"]} /> :
                                                                                    <img src={password} alt="Password" className={classes["signin-form-icon"]} />
                                                                            }
                                                                        </label>
                                                                        <input
                                                                            type={field.type}
                                                                            value={field.input}
                                                                            required={field.required}
                                                                            onChange={e => setInputValue(field, e)}
                                                                            onFocus={() => setFieldTouched(field)}
                                                                            onBlur={e => handleBlur(field, e)}
                                                                            className={[classes["signin-form-input-field"], "cell", "small-10", "medium-11"].join(' ')}
                                                                            placeholder={field.label}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {
                                                                    field
                                                                        .validation
                                                                        .filter(v => v.error)
                                                                        .map(v => v.errorMessage)
                                                                        .map((msg, i) => (
                                                                            <p
                                                                                key={i}
                                                                                className={classes["signin-form-input-field-error"]}
                                                                            >
                                                                                {msg}
                                                                            </p>
                                                                        ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                        <div className="cell">
                                            <Link to="/forgot_password">Forgot Password?</Link>
                                        </div>
                                        <div className={classes["signin-form-submit"]}>
                                            <div className={["cell", classes["signin-form-submit-container"]].join(' ')}>
                                                <button
                                                    type="submit"
                                                    className={
                                                        isFormValid ?
                                                            classes["signin-form-submit-button"] :
                                                            [classes["signin-form-submit-button"], classes["signin-form-submit-button-invalid"]].join(' ')
                                                    }
                                                    disabled={!isFormValid}
                                                >
                                                    Sign in
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        />
                    </div>
                </div>
                <div className={classes["signup"]}>
                    <div className={["cell", classes["signup-container"]].join(' ')}>
                        <p className={classes["signup-text"]}>
                            New user? <span className={classes["signup-span"]}><Link to="/sign_up" className={classes["signup-link"]}>Sign Up</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(SignIn);

export { connectedLoginPage as SignIn };