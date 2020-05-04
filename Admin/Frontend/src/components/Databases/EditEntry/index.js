import React from 'react';

import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline
} from 'react-foundation-components/lib/forms';
import { FormWithValidation } from '../../Forms/FormWithValidation';
import axios from 'axios';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

export const EditEntry = ({title, initialFormFields, objectToEdit, close, editObject}) => {
    console.log("edit this: ", editObject);

    return (
        <div className="edit-form-container">
            <h1>Edit entry in {title} table</h1>

            <FormWithValidation
                initialFormFields={initialFormFields}
                handleSubmit={(e, formFields) => {
                    e.preventDefault();
                    console.log(e);
                    console.log(formFields);

                    // return axios
                    //     .post(
                    //         'https://localhost:5001/api/Users', {
                    //             userName: "test500",
                    //             userPassword: "test500",
                    //             userEmail: "test500@mail.com",
                    //             firstName: "testName",
                    //             lastName: "testLastName",
                    //             userRole: "user"
                    //         }, 
                    //         {
                    //             headers: { "Content-type": "application/json" }
                    //         }
                    //     )
                    //     .then((res) => {
                    //         console.log(res);
                    //         if (res.status === 200) {
                    //             alert("added");
                    //         } else {
                    //             alert("Error while trying to add new");
                    //         }
                
                
                    //     })

                    }
                }

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
                                        className="edit-form-field edit-form-field-text-input"
                                    >
                                        <FormFieldInline>
                                            <FormFieldLabel className="edit-form-label">
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
                            <Button onClick={() => close(false)} key="cancel" style={{ backgroundColor: 'red' }}>Cancel</Button>
                            </Column>
                            <Column small={4}>
                                <Button type="submit">Submit</Button>
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