import React from 'react';
import axios from 'axios';
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
import mail from '../../img/icons/mail.svg';
import password from '../../img/icons/password.svg';

import classes from './SignIn.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';

export const SignIn = () => {
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
                    errorMessage: 'Maximum 512 characters allowed',
                    check: (input) => {
                        return input.length > 512;
                    }
                }
            ]
        },
        {
            label: 'Remember Me',
            input: false,
            defaultChecked: false,
            type: 'checkbox'
        }
    ];

    return (
        <div className={[classes["signin-container"], "text-center"].join(' ')}>
            <Row>
                <Column small={12} medium={6} mediumCentered="centered" className={classes["signin-form"]}>
                    <Row className={classes["signin-title-container"]}>
                        <Column small={12}>
                            <h1>
                                Hairdressing Application - Admin Portal
                        </h1>
                        </Column>
                    </Row>
                    <Row className={classes["signin-subtitle-container"]}>
                        <Column small={12}>
                            <h2>
                                Welcome back! Please login to continue.
                        </h2>
                        </Column>
                    </Row>

                    <FormWithValidation
                        initialFormFields={initialFormFields}
                        handleSubmit={(e, isFormValid, formFields) => {
                            // handle form submission here
                            e.preventDefault();
                            console.log('sign in form submitted');
                            console.log(isFormValid);
                            console.dir(formFields);

                            if (isFormValid) {
                                axios
                                    .get('https://localhost:5001/api/users')
                                    .then(console.log);
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
                                                        className={classes["signin-form-field"]}
                                                        id={field.label.toLowerCase().split(' ').join('-')}
                                                    >
                                                        <Row className={classes["signin-form-checkbox-container"]}>
                                                            <Column
                                                                small={1}
                                                                className={classes["signin-form-input"]}
                                                            >
                                                                <FormFieldInput
                                                                    type={field.type}
                                                                    defaultChecked={field.type === 'checkbox' && field.defaultChecked}
                                                                    value={field.input}
                                                                    onChange={e => setInputValue(field, e)}
                                                                    className={[classes["signin-form-input-field"], classes["sign-form-input-checkbox"]].join(' ')}
                                                                />
                                                            </Column>
                                                            <Column small={6}>
                                                                <FormFieldLabel
                                                                    className={classes["signin-form-checkbox-label"]}
                                                                >
                                                                    {field.label}
                                                                </FormFieldLabel>
                                                            </Column>
                                                            <Column small={5}>
                                                                <Link to="/forgot_password">Forgot Password?</Link>
                                                            </Column>
                                                        </Row>
                                                    </FormField>
                                                )
                                            }
                                            else {
                                                return (
                                                    <Row className={classes["signin-form-row"]} key={index}>
                                                        <Column small={8} smallCentered="centered">
                                                            <FormField
                                                                key={index}
                                                                id={field.label.toLowerCase().split(' ').join('-')}
                                                                className={[classes["signin-form-field"], classes["signin-form-field-text-input"]].join(' ')}
                                                                error={field.validation?.some(v => v.error)}
                                                            >
                                                                <FormFieldLabel></FormFieldLabel>
                                                                <FormFieldInline>
                                                                    <FormFieldLabel className={classes["signin-form-label"]}>
                                                                        {
                                                                            field.label === 'Username or email' ?
                                                                                <img src={mail} alt="Email" className={classes["signin-form-icon"]} /> :
                                                                                <img src={password} alt="Password" className={classes["signin-form-icon"]} />
                                                                        }
                                                                    </FormFieldLabel>
                                                                    <FormFieldInput
                                                                        type={field.type}
                                                                        value={field.input}
                                                                        required={field.required}
                                                                        onChange={e => setInputValue(field, e)}
                                                                        onFocus={() => setFieldTouched(field)}
                                                                        onBlur={e => handleBlur(field, e)}
                                                                        className={classes["signin-form-input-field"]}
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
                                                                                className={classes["signin-form-input-field-error"]}
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
                                    <Row className={classes["signin-form-submit"]}>
                                        <Column small={12} className={classes["signin-form-submit-container"]}>
                                            <Button
                                                type="submit"
                                                className={
                                                    isFormValid ?
                                                        classes["signin-form-submit-button"] :
                                                        [classes["signin-form-submit-button"], classes["signin-form-submit-button-invalid"]].join(' ')
                                                }
                                                disabled={!isFormValid}
                                            >
                                                Sign in
                                        </Button>
                                        </Column>
                                    </Row>
                                </>
                            )
                        }
                    />
                </Column>
            </Row>
            <Row className={classes["signup"]}>
                <Column small={12} className={classes["signup-container"]}>
                    <p className={classes["signup-text"]}>
                        New user? <span className={classes["signup-span"]}><Link to="/sign_up" className={classes["signup-link"]}>Sign Up</Link></span>
                    </p>
                </Column>
            </Row>
        </div>
    )
}