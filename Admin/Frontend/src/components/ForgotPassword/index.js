import React from 'react';
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

import classes from './ForgotPassword.module.scss';
import { FormWithValidation } from '../Forms/FormWithValidation';

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

    return (
        <div className={[classes["forgotpassword-container"], "text-center"].join(' ')}>
            <div className={classes["forgotpassword-form"]}>
                <Row className={classes["forgotpassword-title-container"]}>
                    <Column small={12}>
                        <h1>
                            Hairdressing Application - Admin Portal
                        </h1>
                    </Column>
                </Row>
                <Row className={classes["forgotpassword-subtitle-container"]}>
                    <Column small={12}>
                        <h2>
                            Enter your registered username or email below to
                            recover your password.
                        </h2>
                    </Column>
                </Row>

                <FormWithValidation
                    initialFormFields={initialFormFields}
                    handleSubmit={(e, isFormValid, formFields) => {
                        // handle form submission here
                        e.preventDefault();
                        console.log('forgot password form submitted');
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
                                    formFields.map((field, index) => {

                                        if (field.type === 'checkbox') {
                                            return (
                                                <FormField
                                                    key={index}
                                                    className={classes["forgotpassword-form-field"]}
                                                    id={field.label.toLowerCase().split(' ').join('-')}
                                                >
                                                    <Row className={classes["forgotpassword-form-checkbox-container"]}>
                                                        <Column
                                                            small={1}
                                                            className={classes["forgotpassword-form-input"]}
                                                        >
                                                            <FormFieldInput
                                                                type={field.type}
                                                                defaultChecked={field.type === 'checkbox' && field.defaultChecked}
                                                                value={field.input}
                                                                onChange={e => setInputValue(field, e)}
                                                                className={[classes["forgotpassword-form-input-field"], classes["sign-form-input-checkbox"]].join(' ')}
                                                            />
                                                        </Column>
                                                        <Column small={6}>
                                                            <FormFieldLabel
                                                                className={classes["forgotpassword-form-checkbox-label"]}
                                                            >
                                                                {field.label}
                                                            </FormFieldLabel>
                                                        </Column>
                                                        <Column small={5}>
                                                            <a href="#">Forgot Password?</a>
                                                        </Column>
                                                    </Row>
                                                </FormField>
                                            )
                                        }
                                        else {
                                            return (
                                                <Row className={classes["forgotpassword-form-row"]} key={index}>
                                                    <Column small={8} smallCentered="centered">
                                                        <FormField
                                                            key={index}
                                                            id={field.label.toLowerCase().split(' ').join('-')}
                                                            className={[classes["forgotpassword-form-field"], classes["forgotpassword-form-field-text-input"]].join(' ')}
                                                            error={field.validation?.some(v => v.error)}
                                                        >
                                                            <FormFieldLabel></FormFieldLabel>
                                                            <FormFieldInline>
                                                                <FormFieldLabel className={classes["forgotpassword-form-label"]}>
                                                                    <img src={mail} alt="Email" className={classes["forgotpassword-form-mail"]} />
                                                                </FormFieldLabel>
                                                                <FormFieldInput
                                                                    type={field.type}
                                                                    value={field.input}
                                                                    required={field.required}
                                                                    onChange={e => setInputValue(field, e)}
                                                                    onFocus={() => setFieldTouched(field)}
                                                                    onBlur={e => handleBlur(field, e)}
                                                                    className={classes["forgotpassword-form-input-field"]}
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
                                                                            className={classes["forgotpassword-form-input-field-error"]}
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
                                <Row className={classes["forgotpassword-form-submit"]}>
                                    <Column small={12} className={classes["forgotpassword-form-submit-container"]}>
                                        <Button
                                            type="submit"
                                            className={
                                                isFormValid ?
                                                    classes["forgotpassword-form-submit-button"] :
                                                    [classes["forgotpassword-form-submit-button"], classes["forgotpassword-form-submit-button-invalid"]].join(' ')
                                            }
                                            disabled={!isFormValid}
                                        >
                                            Recover password
                                        </Button>
                                    </Column>
                                </Row>
                            </>
                        )
                    }
                />
            </div>
            <Row className={classes["links-container"]}>
                <Column small={12} className={classes["signin-container"]}>
                    <p className={classes["signin-text"]}>
                        Returning user? <span className={classes["signin-span"]}><a href="#" className={classes["signup-link"]}>Sign In</a></span>
                    </p>
                </Column>
                <Column small={12} className={classes["signup-container"]}>
                    <p className={classes["signup-text"]}>
                        New user? <span className={classes["signup-span"]}><a href="#" className={classes["signup-link"]}>Sign Up</a></span>
                    </p>
                </Column>
            </Row>
        </div>
    )
}