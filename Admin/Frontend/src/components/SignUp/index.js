import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import user from '../../img/icons/user.svg';
import mail from '../../img/icons/mail.svg';
import password from '../../img/icons/password.svg';

import classes from './SignUp.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';
import { Alert } from '../Alert';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';

export const SignUp = () => {

    const initialFormFields = [
        {
            label: 'Given name',
            input: '',
            type: 'text',
            icon: user,
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
                    errorMessage: 'Maximum 128 characters allowed',
                    check: (input) => {
                        return input.length > 128;
                    }
                }
            ]
        },
        {
            label: 'Family name',
            input: '',
            type: 'text',
            icon: user,
            touched: false,
            required: false,
            validation: [
                {
                    error: false,
                    errorMessage: 'Maximum 128 characters allowed',
                    check: (input) => {
                        return input.length > 128;
                    }
                }
            ]
        },
        {
            label: 'Username',
            input: '',
            type: 'text',
            icon: user,
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
                    errorMessage: 'Maximum 32 characters allowed',
                    check: (input) => {
                        return input.length > 32;
                    }
                }
            ]
        },
        {
            label: 'Email',
            input: '',
            type: 'email',
            icon: mail,
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
                        return input.length < 6;
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
        // to be implemented
        /* {
            label: 'I agree with Privacy Policy',
            input: false,
            defaultChecked: false,
            type: 'checkbox'
        } */
    ];

    const dispatch = useDispatch();
    const authentication = useSelector(state => state.authentication);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (authentication.signUpErrors) {

            const errors = Object
                .values(authentication.signUpErrors)
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

            <div className={[classes['signup-container'], "text-center"].join(' ')}>
                <div className="grid-x">
                    <div className={[classes['signup-form'], "cell", "small-12", "medium-6", "text-center", "medium-offset-3"].join(' ')}>
                        <div className={classes['signup-title-container']}>
                            <div className="cell text-center">
                                <h1>
                                    Hairdressing Application - Admin Portal
                        </h1>
                            </div>
                        </div>
                        <div className={classes["signup-subtitle-container"]}>
                            <div className="cell text-center">
                                <h2>
                                    Welcome back! Please login to continue.
                        </h2>
                            </div>
                        </div>

                        <FormWithValidation
                            initialFormFields={initialFormFields}
                            handleSubmit={(e, isFormValid, formFields) => {
                                e.preventDefault();

                                const user = {
                                    FirstName: formFields[0].input,
                                    LastName: formFields[1].input,
                                    UserName: formFields[2].input,
                                    UserEmail: formFields[3].input,
                                    UserPassword: formFields[4].input
                                };

                                if (isFormValid) {
                                    dispatch(userActions.signUp(user));
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
                                                            className={classes["signup-form-field"]}
                                                            id={field.label.toLowerCase().split(' ').join('-')}
                                                        >
                                                            <div className={[classes["signup-form-checkbox-container"], "grid-x"].join(' ')}>
                                                                <div
                                                                    className={[classes["signup-form-input"], "cell", "small-1"].join(' ')}
                                                                >
                                                                    <input
                                                                        type={field.type}
                                                                        defaultChecked={field.type === 'checkbox' && field.defaultChecked}
                                                                        value={field.input}
                                                                        onChange={e => setInputValue(field, e)}
                                                                        className={[classes["signup-form-input-field"], classes["sign-form-input-checkbox"]].join(' ')}
                                                                    />
                                                                </div>
                                                                <div className="cell small-11">
                                                                    <label
                                                                        className={classes["signup-form-checkbox-label"]}
                                                                    >
                                                                        <span>
                                                                            I agree with <Link to="/privacy_policy">Privacy Policy</Link>
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <div className={classes["signup-form-row"]} key={index}>
                                                            <div className="cell small-8 text-center">
                                                                <div
                                                                    key={index}
                                                                    id={field.label.toLowerCase().split(' ').join('-')}
                                                                    className={[classes["signup-form-field"], classes["signup-form-field-text-input"]].join(' ')}
                                                                >
                                                                    <div className="grid-x medium-offset-3">
                                                                        <label className={[classes["signup-form-label"], "cell", "small-1"].join(' ')}>
                                                                            <img src={field.icon} alt={field.label} className={classes["signup-form-mail"]} />
                                                                        </label>
                                                                        <input
                                                                            type={field.type}
                                                                            value={field.input}
                                                                            required={field.required}
                                                                            onChange={e => setInputValue(field, e)}
                                                                            onFocus={() => setFieldTouched(field)}
                                                                            onBlur={e => handleBlur(field, e)}
                                                                            className={[classes["signup-form-input-field"], "cell", "small-11", "medium-6"].join(' ')}
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
                                                                                className={classes["signup-form-input-field-error"]}
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
                                        <div className={classes["signup-form-submit"]}>
                                            <div className={[classes["signup-form-submit-container"], "cell", "small-12"].join(' ')}>
                                                <button
                                                    type="submit"
                                                    className={
                                                        isFormValid ?
                                                            classes["signup-form-submit-button"] :
                                                            [classes["signup-form-submit-button"], classes["signup-form-submit-button-invalid"]].join(' ')
                                                    }
                                                    disabled={!isFormValid}
                                                >
                                                    Sign up
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        />
                    </div>
                </div>
                <div className={classes["signin"]}>
                    <div className={[classes["signin-container"], "cell", "small-12"].join(' ')}>
                        <p className={classes["signin-text"]}>
                            Returning user? <span className={classes["signin-span"]}><Link to="/sign_in" className={classes["signin-link"]}>Sign In</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}