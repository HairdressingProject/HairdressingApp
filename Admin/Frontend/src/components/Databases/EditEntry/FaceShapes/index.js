import React from 'react';
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline
} from 'react-foundation-components/lib/forms';
import { FormWithValidation } from '../../../Forms/FormWithValidation';
import axios from 'axios';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';




export const EditFaceShapesForm = () => {


    const initialFormFields = [
        {
            label: 'Id',
            input: '',
            type: 'text',
            touched: false,
        },
        {
            label: 'Face Shape Name',
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
                }
            ]
        },
    ];
    

    return (
        <div className="face-shapes-add-form-container">
            <h1>Edit entry from Face Shapes table</h1>

            <FormWithValidation
                initialFormFields={initialFormFields}
                handleSubmit={(e, formFields) => {
                    e.preventDefault();
                    console.log(e);
                    console.log(formFields);

                    return axios
                        .put(
                            'https://localhost:5001/api/faceShapes/21', {
                                shapeName: "w00t21"
                            }, 
                            {
                                headers: { "Content-type": "application/json" }
                            }
                        )
                        .then((res) => {
                            console.log(res);
                            if (res.status === 200) {
                                alert("added");
                            } else {
                                alert("Error while trying to add new");
                            }
                
                
                        })

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
                                return(
                                    <>
                                    <FormField
                                        key={index}
                                        id={field.label.toLowerCase().split(' ').join('-')}
                                        className="editFaceShape-form-field editFaceShape-form-field-text-input"
                                    >
                                        <FormFieldInline>
                                            <FormFieldLabel className="editFaceShape-form-label">
                                                {field.label}
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

                                    </FormField>
                                    </>
                                );
                            })
                        }
                        <Row>
                            <Column small={4}>
                            <Button key="cancel" style={{ backgroundColor: 'red' }}>Cancel</Button>
                            </Column>
                            <Column small={4}>
                                <Button type="submit">Add</Button>
                            </Column>
                            <Column small={4}>
                            <Button key="clear" style={{ backgroundColor: 'yellow', color: 'black' }}>Clear</Button>
                            </Column>
                        </Row>
                        
                        </>
                    )}
            />
    </div>
    )


    

};