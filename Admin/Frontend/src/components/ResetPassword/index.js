import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
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

import classes from './ResetPassword.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';

export const ResetPassword = ({ userEmail }) => {
    const initialFormFields = [
        {
            label: userEmail || 'user@mail.com',
            type: 'text',
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

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();

    useEffect(() => {
        console.log(`token from query params: ${query.get("token")}`);
    }, []);

    return (
        <div className={[classes["newpassword-container"], "text-center"].join(' ')}>
            <Row>
                <Column small={12} medium={6} mediumCentered="centered" className={classes["newpassword-form"]}>
                    <Row className={classes["newpassword-title-container"]}>
                        <Column small={12}>
                            <h1>
                                Hairdressing Application - Admin Portal
                        </h1>
                        </Column>
                    </Row>
                    <Row className={classes["newpassword-subtitle-container"]}>
                        <Column small={12}>
                            <h2>
                                Enter your new password below:
                        </h2>
                        </Column>
                    </Row>

                    <FormWithValidation
                        initialFormFields={initialFormFields}
                        handleSubmit={(e, isFormValid, formFields) => {
                            // handle form submission here
                            e.preventDefault();
                            console.log('new password form submitted');
                            console.log(isFormValid);
                            console.dir(formFields);
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
                                            <Row className={classes["newpassword-form-row"]} key={index}>
                                                <Column small={8} smallCentered="centered">
                                                    <FormField
                                                        key={index}
                                                        id={field.label.toLowerCase().split(' ').join('-')}
                                                        className={[classes["newpassword-form-field"], classes["newpassword-form-field-text-input"]].join(' ')}
                                                        error={field.validation?.some(v => v.error)}
                                                    >
                                                        <FormFieldLabel></FormFieldLabel>
                                                        <FormFieldInline>
                                                            <FormFieldLabel className={classes["newpassword-form-label"]}>
                                                                <img src={field.icon} alt={field.label} className={classes["newpassword-form-mail"]} />
                                                            </FormFieldLabel>
                                                            <FormFieldInput
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
                                                        </FormFieldInline>
                                                        {
                                                            field.validation ?
                                                                field
                                                                    .validation
                                                                    .filter(v => v.error)
                                                                    .map(v => v.errorMessage)
                                                                    .map((msg, i) => (
                                                                        <FormFieldError
                                                                            key={i}
                                                                            className={classes["newpassword-form-input-field-error"]}
                                                                        >
                                                                            {msg}
                                                                        </FormFieldError>
                                                                    )) : ''
                                                        }

                                                    </FormField>
                                                </Column>
                                            </Row>
                                        ))
                                    }
                                    <Row className={classes["newpassword-form-submit"]}>
                                        <Column small={12} className={classes["newpassword-form-submit-container"]}>
                                            <Button
                                                type="submit"
                                                className={
                                                    isFormValid ?
                                                        classes["newpassword-form-submit-button"] :
                                                        [classes["newpassword-form-submit-button"], classes["newpassword-form-submit-button-invalid"]].join(' ')
                                                }
                                                disabled={!isFormValid}
                                            >
                                                Change password
                                        </Button>
                                        </Column>
                                    </Row>
                                </>
                            )
                        }
                    />
                </Column>
            </Row>
            <Row className={classes["links-container"]}>
                <Column small={12} className={classes["signin-container"]}>
                    <p className={classes["signin-text"]}>
                        Returning user? <span className={classes["signin-span"]}><Link to="/sign_in" className={classes["signin-link"]}>Sign In</Link></span>
                    </p>
                </Column>
                <Column small={12} className={classes["signup-container"]}>
                    <p className={classes["signup-text"]}>
                        New user? <span className={classes["signup-span"]}><Link to="/sign_up" className={classes["signup-link"]}>Sign Up</Link></span>
                    </p>
                </Column>
            </Row>
        </div>
    )
}