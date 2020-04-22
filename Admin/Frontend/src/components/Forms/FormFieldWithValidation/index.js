import React from 'react';
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline,
    FormFieldButton,
    FormFieldHelp
} from 'react-foundation-components/lib/forms';

export const FormFieldWithValidation = props => {
    const {
        id,
        error,
        labelName,
        labelIcon,
        type,
        value,
        required,
        handleChange,
        handleFocus,
        handleBlur,
        placeholder,
        errorMessages
    } = props;

    return (
        <FormField
            key={props.key}
            id={id}
            className="signin-form-field signin-form-field-text-input"
            error={error}
        >
            <FormFieldLabel></FormFieldLabel>
            <FormFieldInline>
                <FormFieldLabel className="signin-form-label">
                    <img src={labelIcon} alt={labelName} className="signin-form-mail" />
                </FormFieldLabel>
                <FormFieldInput
                    type={type}
                    value={value}
                    required={required}
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
    )
}