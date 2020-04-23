import React, { useState } from 'react';
const cloneDeep = require('lodash.clonedeep');

export const FormWithValidation = ({ action, initialFormFields, handleSubmit, ...props }) => {
    const [formFields, setFormFields] = useState(cloneDeep(initialFormFields));
    const [isFormValid, setFormValidation] = useState(false);

    const validateField = (field, input) => {
        const fieldCopy = cloneDeep(field);
        const { validation } = fieldCopy || [];

        if (!validation || !validation.length) {
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

    const validateForm = currentFormFields => {
        const allRequiredFieldsTouched =
            currentFormFields
                .filter(f => f.required)
                .every(requiredField => requiredField.touched);

        const isFormValid = allRequiredFieldsTouched && !currentFormFields.some(f => f.validation?.some(v => v.error));

        return isFormValid;
    }

    const setInputValue = (field, e) => {
        const { value } = e.target;

        const [currentFormField, currentFormFieldIndex, currentFormFields] = copyFormFields(field);

        if (e.target.type === 'checkbox') {
            currentFormField.input = !currentFormField.input;
        } else {
            currentFormField.input = value;
        }

        const validatedFormField = validateField(currentFormField, value);

        currentFormFields[currentFormFieldIndex] = validatedFormField;
        const isFormValid = validateForm(currentFormFields);

        setFormFields(currentFormFields);
        setFormValidation(isFormValid);
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

        const isFormValid = validateForm(currentFormFields);

        setFormFields(currentFormFields);
        setFormValidation(isFormValid);
    }

    return (
        <form
            method="POST"
            action={action || '#'}
            onSubmit={e => handleSubmit(e, isFormValid, formFields)}
        >
            {
                props.fields(
                    formFields,
                    setInputValue,
                    setFieldTouched,
                    isFormValid,
                    handleBlur
                )
            }
        </form>
    )
}