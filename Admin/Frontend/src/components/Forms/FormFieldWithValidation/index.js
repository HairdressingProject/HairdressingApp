import React from 'react';

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
        <div
            key={props.key}
            id={id}
            className="signin-form-field signin-form-field-text-input"
            error={error}
        >
            <label></label>
            <div>
                <label className="signin-form-label">
                    <img src={labelIcon} alt={labelName} className="signin-form-mail" />
                </label>
                <input
                    type={type}
                    value={value}
                    required={required}
                    onChange={e => setInputValue(field, e)}
                    onFocus={() => setFieldTouched(field)}
                    onBlur={e => handleBlur(field, e)}
                    className="signin-form-input-field"
                    placeholder={field.label}
                />
            </div>
            {
                field
                    .validation
                    .filter(v => v.error)
                    .map(v => v.errorMessage)
                    .map((msg, i) => (
                        <p
                            key={i}
                            className="signin-form-input-field-error"
                        >
                            {msg}
                        </p>
                    ))
            }

        </div>
    )
}