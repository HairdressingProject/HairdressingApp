import React from 'react';
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline
} from 'react-foundation-components/lib/forms';
import classes from '../../Databases/Databases.module.scss';
import { FormWithValidation } from '../../Forms/FormWithValidation';
import axios from 'axios';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../_actions';
import { resourceNames } from '../../../_constants';

// ToDo: Validation | fix add users




export const AddEntry = ({title, initialFormFields, close}) => {

    // dispatch is a function that will be called with a resourceAction to send HTTP requests
    const dispatch = useDispatch();

    // resources is a "slice" of Redux store's state that contains items from all tables in the database
    //const resources = useSelector(state => state.resources);    

    return (
        <div className={[classes["add-form-container"], "text-center"].join(' ')}>
            <Row>
                <Column small={12} medium={6} mediumCentered="centered" className={classes["add-form"]}>
                    <Row className={classes["add-form-title-container"]}>
                        <Column small={12}>
                            <h1>Add a new entry to {title} table</h1>
                        </Column>
                    </Row>
                </Column>
            </Row>
            

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

                            // return axios //ToDo: check back end (usersController)
                            //     .post(
                            //         'https://localhost:5000/api/Users',
                            //         {
                            //             userName: inputs.userName,
                            //             userEmail: inputs.userEmail,
                            //             userPassword: inputs.userPassword,
                            //             firstName: inputs.firstName,
                            //             lastName: inputs.lastName,
                            //             userRole: inputs.userRole
                            //         },
                            //         {
                            //             headers: { "Content-type": "application/json" }
                            //         }
                            //     )
                            //     .then((res) => {
                            //         console.log(res);
                            //         window.location.reload();
                            //     });
                            console.log("zzzzzzzzzz")

                            dispatch(resourceActions.post(resourceNames.USERS, inputs));
                            //window.location.reload();

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
                            dispatch(resourceActions.post(resourceNames.USER_FEATURES, inputs));


                        break;

                        case "Skin Tones":
                            var inputs = {
                                skinToneName: formFields[0].input
                            }
                            console.log(inputs);
                            dispatch(resourceActions.post(resourceNames.SKIN_TONES, inputs));
                            


                        break;

                        case "Face Shapes":
                            var inputs = {
                                shapeName: formFields[0].input
                            }
                            console.log(inputs);

                            dispatch(resourceActions.post(resourceNames.FACE_SHAPES, inputs));
                        break;

                        case "Hair Lengths":
                            var inputs = {
                                hairLengthName: formFields[0].input
                            }
                            console.log(inputs);
                            dispatch(resourceActions.post(resourceNames.HAIR_LENGTHS, inputs));


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
                                    <Row>
                                        <Column>
                                            <FormField
                                            key={index}
                                            id={field.label.toLowerCase().split(' ').join('-')}
                                            className={[classes["add-form-field"], classes["add-form-field-text-input"]].join(' ')}
                                        >
                                            <FormFieldLabel></FormFieldLabel>
                                            <FormFieldInline>
                                            <FormFieldLabel className={classes["add-form-label"]}>
                                                <img src={field.icon} alt={field.label} className={classes["signup-form-mail"]} />
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
                                        </Column>
                                    </Row>

                                    </>
                                );
                            })
                        }
                        <Row>
                            <Column small={4}>
                            <Button onClick={() => close(false)} key="cancel" style={{ backgroundColor: 'red' }}>Cancel</Button>
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