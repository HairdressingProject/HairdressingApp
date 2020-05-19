import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Column } from 'react-foundation-components/lib/grid';
import { Button } from 'react-foundation-components/lib/button';
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline
} from 'react-foundation-components/lib/forms';
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
        {
            label: 'I agree with Privacy Policy',
            input: false,
            defaultChecked: false,
            type: 'checkbox'
        }
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
                <Row>
                    <Column small={12} medium={6} mediumCentered="centered" className={classes['signup-form']}>
                        <Row className={classes['signup-title-container']}>
                            <Column small={12} smallCentered="centered">
                                <h1>
                                    Hairdressing Application - Admin Portal
                        </h1>
                            </Column>
                        </Row>
                        <Row className={classes["signup-subtitle-container"]}>
                            <Column small={12}>
                                <h2>
                                    Welcome back! Please login to continue.
                        </h2>
                            </Column>
                        </Row>

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
                                                        <FormField
                                                            key={index}
                                                            className={classes["signup-form-field"]}
                                                            id={field.label.toLowerCase().split(' ').join('-')}
                                                        >
                                                            <Row className={classes["signup-form-checkbox-container"]}>
                                                                <Column
                                                                    small={1}
                                                                    className={classes["signup-form-input"]}
                                                                >
                                                                    <FormFieldInput
                                                                        type={field.type}
                                                                        defaultChecked={field.type === 'checkbox' && field.defaultChecked}
                                                                        value={field.input}
                                                                        onChange={e => setInputValue(field, e)}
                                                                        className={[classes["signup-form-input-field"], classes["sign-form-input-checkbox"]].join(' ')}
                                                                    />
                                                                </Column>
                                                                <Column small={11}>
                                                                    <FormFieldLabel
                                                                        className={classes["signup-form-checkbox-label"]}
                                                                    >
                                                                        <span>
                                                                            I agree with <Link to="/privacy_policy">Privacy Policy</Link>
                                                                        </span>
                                                                    </FormFieldLabel>
                                                                </Column>
                                                            </Row>
                                                        </FormField>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Row className={classes["signup-form-row"]} key={index}>
                                                            <Column small={8} smallCentered="centered">
                                                                <FormField
                                                                    key={index}
                                                                    id={field.label.toLowerCase().split(' ').join('-')}
                                                                    className={[classes["signup-form-field"], classes["signup-form-field-text-input"]].join(' ')}
                                                                    error={field.validation?.some(v => v.error)}
                                                                >
                                                                    <FormFieldLabel></FormFieldLabel>
                                                                    <FormFieldInline>
                                                                        <FormFieldLabel className={classes["signup-form-label"]}>
                                                                            <img src={field.icon} alt={field.label} className={classes["signup-form-mail"]} />
                                                                        </FormFieldLabel>
                                                                        <FormFieldInput
                                                                            type={field.type}
                                                                            value={field.input}
                                                                            required={field.required}
                                                                            onChange={e => setInputValue(field, e)}
                                                                            onFocus={() => setFieldTouched(field)}
                                                                            onBlur={e => handleBlur(field, e)}
                                                                            className={classes["signup-form-input-field"]}
                                                                            placeholder={field.label}
                                                                        />
                                                                    </FormFieldInline>
                                                                    {
                                                                        field
                                                                            .validation
                                                                            .filter(v => v.error)
                                                                            .map(v => v.errorMessage)
                                                                            .map((msg, i) => (
                                                                                <FormFieldError
                                                                                    key={i}
                                                                                    className={classes["signup-form-input-field-error"]}
                                                                                >
                                                                                    {msg}
                                                                                </FormFieldError>
                                                                            ))
                                                                    }

                                                                </FormField>
                                                            </Column>
                                                        </Row>
                                                    )
                                                }
                                            })
                                        }
                                        <Row className={classes["signup-form-submit"]}>
                                            <Column small={12} className={classes["signup-form-submit-container"]}>
                                                <Button
                                                    type="submit"
                                                    className={
                                                        isFormValid ?
                                                            classes["signup-form-submit-button"] :
                                                            [classes["signup-form-submit-button"], classes["signup-form-submit-button-invalid"]].join(' ')
                                                    }
                                                    disabled={!isFormValid}
                                                >
                                                    Sign up
                                        </Button>
                                            </Column>
                                        </Row>
                                    </>
                                )
                            }
                        />
                    </Column>
                </Row>
                <Row className={classes["signin"]}>
                    <Column small={12} className={classes["signin-container"]}>
                        <p className={classes["signin-text"]}>
                            Returning user? <span className={classes["signin-span"]}><Link to="/sign_in" className={classes["signin-link"]}>Sign In</Link></span>
                        </p>
                    </Column>
                </Row>
            </div>
        </div>
    )
}