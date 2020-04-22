import React, { useState } from 'react';
import { Row, Column } from 'react-foundation-components/lib/grid';
import { Button } from 'react-foundation-components/lib/button';
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline,
    FormFieldButton,
    FormFieldHelp
} from 'react-foundation-components/lib/forms';
import mail from '../../img/icons/mail.svg';
import password from '../../img/icons/password.svg';

import './SignIn.scss';
const cloneDeep = require('lodash.clonedeep');

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

    const [formFields, setFormFields] = useState(cloneDeep(initialFormFields));
    const [isFormValid, setFormValid] = useState(false);

    const validateField = (field, input) => {
        const fieldCopy = cloneDeep(field);
        const { validation } = fieldCopy || [];

        if (!validation.length) {
            // no validation is required
            return field;
        }

        fieldCopy.validation = validation.map(v => ({
            ...v,
            error: v.check(input)
        }));

        return fieldCopy;
    }

    const copyFormFields = field => {
        const currentFormFields = cloneDeep(formFields);

        const currentFormFieldIndex = currentFormFields.indexOf(
            currentFormFields.find(f => f.label === field.label)
        );

        const currentFormField = currentFormFields[currentFormFieldIndex];

        return [currentFormField, currentFormFieldIndex, currentFormFields];
    };

    const setInputValue = (field, e) => {
        const { value } = e.target;

        const [currentFormField, currentFormFieldIndex, currentFormFields] = copyFormFields(field);

        currentFormField.input = value;
        const validatedFormField = validateField(currentFormField, value);

        currentFormFields[currentFormFieldIndex] = validatedFormField;

        const isFormValid = !currentFormFields.some(f => f.validation?.some(v => v.error));

        setFormFields(currentFormFields);
        setFormValid(isFormValid);
    };

    const setFieldTouched = (field) => {
        // avoid changing this property unnecessarily
        if (field.touched) {
            return;
        }

        const [currentFormField, currentFormFieldIndex, currentFormFields] = copyFormFields(field);
        currentFormField.touched = true;

        currentFormFields[currentFormFieldIndex] = currentFormField;

        setFormFields(currentFormFields);
    }

    const handleBlur = (field, e) => {
        const { value: input } = e.target;

        const [currentFormField, currentFormFieldIndex, currentFormFields] = copyFormFields(field);

        const validatedField = validateField(currentFormField, input);
        currentFormFields[currentFormFieldIndex] = validatedField;

        const isFormValid = !currentFormFields.some(f => f.validation?.some(v => v.error));

        setFormFields(currentFormFields);
        setFormValid(isFormValid);
    }

    const signInSubmitButtonClasses = ["signin-form-submit-button"];

    if (!isFormValid) {
        signInSubmitButtonClasses.push("signin-form-submit-button-invalid")
    }

    return (
        <div className="signin-container text-center">
            <div className="signin-form">
                <Row className="signin-title-container">
                    <Column small={12}>
                        <h1>
                            Hairdressing Application - Admin Portal
                        </h1>
                    </Column>
                </Row>
                <Row className="signin-subtitle-container">
                    <Column small={12}>
                        <h2>
                            Welcome back! Please login to continue.
                        </h2>
                    </Column>
                </Row>

                <form action="#">
                    {
                        formFields.map((field, index) => {

                            if (field.type === 'checkbox') {
                                return (
                                    <FormField
                                        key={index}
                                        className="signin-form-field"
                                        id={field.label.toLowerCase().split(' ').join('-')}
                                    >
                                        <Row className="signin-form-checkbox-container">
                                            <Column
                                                small={1}
                                                className="signin-form-input"
                                            >
                                                <FormFieldInput
                                                    type={field.type}
                                                    defaultChecked={field.type === 'checkbox' && field.defaultChecked}
                                                    value={field.input}
                                                    onChange={e => setInputValue(field, e)}
                                                    className="signin-form-input-field sign-form-input-checkbox"
                                                />
                                            </Column>
                                            <Column small={6}>
                                                <FormFieldLabel
                                                    className="signin-form-checkbox-label"
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
                                    <Row className="signin-form-row" key={index}>
                                        <Column small={8} smallCentered="centered">
                                            <FormField
                                                key={index}
                                                id={field.label.toLowerCase().split(' ').join('-')}
                                                className="signin-form-field signin-form-field-text-input"
                                                error={field.validation?.some(v => v.error)}
                                            >
                                                <FormFieldLabel></FormFieldLabel>
                                                <FormFieldInline>
                                                    <FormFieldLabel className="signin-form-label">
                                                        {
                                                            field.label === 'Username or email' ?
                                                                <img src={mail} alt="Email" className="signin-form-mail" /> :
                                                                <img src={password} alt="Password" className="signin-form-password" />
                                                        }
                                                    </FormFieldLabel>
                                                    <FormFieldInput
                                                        type={field.type}
                                                        value={field.input}
                                                        required={field.required}
                                                        onChange={e => setInputValue(field, e)}
                                                        onFocus={() => setFieldTouched(field)}
                                                        onBlur={e => handleBlur(field, e)}
                                                        className="signin-form-input-field"
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
                                                                className="signin-form-input-field-error"
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
                    <Row className="signin-form-submit">
                        <Column small={12} className="signin-form-submit-container">
                            <Button
                                type="submit"
                                className={signInSubmitButtonClasses.join(' ')}
                                disabled={!isFormValid}
                            >
                                Sign in
                        </Button>
                        </Column>
                    </Row>
                </form>

            </div>
            <Row className="signup">
                <Column small={12} className="signup-container">
                    <p className="signup-text">
                        New user? <span className="signup-span"><a href="#" className="signup-link">Sign Up</a></span>
                    </p>
                </Column>
            </Row>
        </div>
    )
}