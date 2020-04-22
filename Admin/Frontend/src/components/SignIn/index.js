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
            validation: []
        },
        {
            label: 'Password',
            input: '',
            type: 'password',
            validation: []
        },
        {
            label: 'Remember Me',
            input: false,
            defaultChecked: false,
            type: 'checkbox'
        }
    ];

    const [formFields, setFormFields] = useState(cloneDeep(initialFormFields));

    const setInputValue = (field, e) => {
        const { value } = e.target;

        const currentFormFields = cloneDeep(formFields);
        currentFormFields[currentFormFields.indexOf(currentFormFields.find(f => f.label === field.label))].input = value;

        setFormFields(currentFormFields);
    };

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

                {
                    formFields.map((field, index) => {

                        if (field.type === 'checkbox') {
                            return (
                                <FormField key={index} className="signin-form-field" id={field.label}>
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
                                    <Row className="signin-form-submit">
                                        <Column small={12} className="signin-form-submit-container">
                                            <Button className="signin-form-submit-button">
                                                Sign in
                                            </Button>
                                        </Column>
                                    </Row>
                                </FormField>
                            )
                        }
                        else {
                            return (
                                <Row className="signin-form-row" key={index}>
                                    <Column small={8} smallCentered="centered">
                                        <FormField key={index} id={field.label} className="signin-form-field">
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
                                                    onChange={e => setInputValue(field, e)}
                                                    className="signin-form-input-field"
                                                    placeholder={field.label}
                                                />
                                            </FormFieldInline>
                                        </FormField>
                                    </Column>
                                </Row>
                            )
                        }
                    })
                }
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