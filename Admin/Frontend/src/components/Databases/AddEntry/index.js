import React, { useState, useEffect} from 'react';
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline
} from 'react-foundation-components/lib/forms';
import classes from '../../Databases/Databases.module.scss';
import { FormWithValidation } from '../../Forms/FormWithValidation';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../_actions';
import { resourceNames } from '../../../_constants';

import { Alert } from '../../Alert';
import { history } from '../../../_helpers';


// ToDo: Validation | fix add users




export const AddEntry = ({title, initialFormFields, close}) => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const submission = useSelector(state => state.resources);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if(submission.users.error) {
            console.dir(submission)

            const errors = Object
                .values(submission.users.error)
                .reduce((acc, err) => {
                    err.forEach(e => {
                        acc.push(e);
                    });
                    return acc;
                }, [])

                .map(msg => ({
                    type: "danger",
                    message: msg
                }));
            
            setErrors(errors);
        }
    }, [submission]);

    const dismissError = () => {
        // if (errors && errors.length) {
        //     const updatedErrors = errors.filter(error => error.message !== err.message);
        //     setErrors(updatedErrors);
        //     return;
        // }
        setErrors(null);
    };

    // dispatch is a function that will be called with a resourceAction to send HTTP requests
    const dispatch = useDispatch();

    // resources is a "slice" of Redux store's state that contains items from all tables in the database
    //const resources = useSelector(state => state.resources);

    // Refresh the list of items from the database whenever the form is submitted
    useEffect(() => {
        if (formSubmitted) {
            //dispatch(resourceActions.getAll(resourceNames.HAIR_STYLES));
            Object
                .values(resourceNames)
                .forEach(resourceNames => {
                    dispatch(resourceActions.getAll(resourceNames))
                });
            setFormSubmitted(false);
        }
    }, [formSubmitted]);

    return (
        <>
        
        <div className={[classes["add-form-container"], "text-center"].join(' ')}>

            {
                errors ?
                    errors.map((err, i) => (
                        <Alert
                        key={i}
                        show={true}
                        type={err.type}
                        message={err.message}
                        dismiss={() => dismissError()}
                        />

                    ))
                    
                :
                ''
            }

            

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
                             if (isFormValid) { 
                                 dispatch(resourceActions.post(resourceNames.USERS, inputs));
                                 //history.push('/databases');
                            } 

                            //dispatch(resourceActions.post(resourceNames.USERS, inputs));
                            //window.location.reload();
                            // setTimeout(() => {
                            //     setFormSubmitted(true);
                            //     close(false);
                            // }, 300);

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
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);


                        break;

                        case "Skin Tones":
                            var inputs = {
                                skinToneName: formFields[0].input
                            }
                            console.log(inputs);
                            dispatch(resourceActions.post(resourceNames.SKIN_TONES, inputs));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                            


                        break;

                        case "Face Shapes":
                            var inputs = {
                                shapeName: formFields[0].input
                            }
                            console.log(inputs);

                            dispatch(resourceActions.post(resourceNames.FACE_SHAPES, inputs));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                        break;

                        case "Hair Lengths":
                            var inputs = {
                                hairLengthName: formFields[0].input
                            }
                            console.log(inputs);
                            dispatch(resourceActions.post(resourceNames.HAIR_LENGTHS, inputs));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);


                        break;

                        default:
                            break;
                    }

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
                                            error={field.validation?.some(v => v.error)}
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
                                            {
                                                field
                                                    .validation
                                                    .filter(v => v.error)
                                                    .map(v => v.errorMessage)
                                                    .map((msg, i) => (
                                                        <FormFieldError
                                                            key={i}
                                                            className={classes["signin-form-input-field-error"]}
                                                        >
                                                            {msg}
                                                        </FormFieldError>
                                                    ))
                                            }

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
        </>
        
    )

};