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

// ToDo: Validation | fix add users


export const AddEntry = ({title, initialFormFields}) => {

    return (
        <div className="add-form-container">
            <h1>Add a new entry to {title} table</h1>

            <FormWithValidation
                initialFormFields={initialFormFields}
                handleSubmit={(e, isFormValid, formFields) => {
                    e.preventDefault();
                    console.log(e);
                    console.log(isFormValid);
                    console.log(formFields);

                    //console.log(form)


                    switch (title) {
                        case "Users":
                            var inputs = {
                                userName: formFields[0].input,
                                userEmail: formFields[1].input,
                                userPassword: formFields[2].input,
                                firstName: formFields[3].input,
                                lastName: formFields[4].input,
                                userRole: formFields[5].input
                            }
                            
                            console.log("inputs", inputs);

                            return axios //ToDo: check back end (usersController)
                                .post(
                                    'https://localhost:5000/api/Users',
                                    {
                                        userName: inputs.userName,
                                        userEmail: inputs.userEmail,
                                        userPassword: inputs.userPassword,
                                        firstName: inputs.firstName,
                                        lastName: inputs.lastName,
                                        userRole: inputs.userRole
                                    },
                                    {
                                        headers: { "Content-type": "application/json" }
                                    }
                                )
                                .then((res) => {
                                    console.log(res);
                                });

                        break;


                        case "User Features":
                            var inputs = {
                                userId: formFields[0].input,
                                faceShapeId: formFields[1].input,
                                skinToneId: formFields[2].input,
                                hairStyleId: formFields[3].input,
                                hairLengthId: formFields[4].input,
                            }

                            console.log(inputs);

                            return axios
                                .post(
                                    'https://localhost:5000/api/UserFeatures',
                                    {
                                        userId: inputs.userId,
                                        faceShapeId: inputs.faceShapeId,
                                        skinToneId: inputs.skinToneId,
                                        hairStyleId: inputs.hairStyleId,
                                        hairLengthId: inputs.hairLengthId,
                                    },
                                    {
                                        headers: { "Content-type": "application/json" }
                                    }
                                )
                                .then((res) => {
                                    console.log(res);
                                });
                        break;

                        case "Skin Tones":
                            var inputs = {
                                skinToneName: formFields[0].input
                            }
                            console.log(inputs);

                            return axios
                            .post(
                                'https://localhost:5000/api/SkinTones',
                                {
                                    skinToneName: inputs.skinToneName,
                                },
                                {
                                    headers: { "Content-type": "application/json" }
                                }
                            )
                            .then((res) => {
                                console.log(res);
                            });
                        break;

                        case "Face Shapes":
                            var inputs = {
                                shapeName: formFields[0].input
                            }
                            console.log(inputs);

                            return axios
                            .post(
                                'https://localhost:5000/api/FaceShapes',
                                {
                                    shapeName: inputs.shapeName,
                                },
                                {
                                    headers: { "Content-type": "application/json" }
                                }
                            )
                            .then((res) => {
                                console.log(res);
                            });
                        break;

                        case "Hair Lengths":
                            var inputs = {
                                hairLengthId: formFields[0].input
                            }
                            console.log(inputs);

                            return axios
                            .post(
                                'https://localhost:5000/api/HairLengths',
                                {
                                    hairLengthName: inputs.hairLengthId,
                                },
                                {
                                    headers: { "Content-type": "application/json" }
                                }
                            )
                            .then((res) => {
                                console.log(res);
                                window.location.reload();
                            });
                        break;

                        default:
                            break;
                    }


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
                                        className="add-form-field add-form-field-text-input"
                                    >
                                        <FormFieldInline>
                                            <FormFieldLabel className="add-form-label">
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