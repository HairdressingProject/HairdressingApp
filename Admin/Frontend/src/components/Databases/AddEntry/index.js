import React, { useState, useEffect } from 'react';
import classes from '../../Databases/Databases.module.scss';
import { FormWithValidation } from '../../Forms/FormWithValidation';

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../_actions';
import { resourceNames } from '../../../_constants';

import { Alert } from '../../Alert';


// ToDo: Validation | fix add users




export const AddEntry = ({ title, initialFormFields, close }) => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const submission = useSelector(state => state.resources);
    const [errors, setErrors] = useState(null);

    useEffect(() => {
        if (submission.users.error) {
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

                <div className="grid-x">
                    <div className={["cell", "small-12", "medium-6", classes["add-form"]].join(' ')}>
                        <div className={classes["add-form-title-container"]}>
                            <div className="cell small-12">
                                <h1>Add a new entry to {title} table</h1>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    initialFormFields && initialFormFields.length ?
                        (
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
                                                    return (
                                                        <div key={index}>
                                                            <div className="grid-x">
                                                                <div className="cell">
                                                                    <div
                                                                        key={index}
                                                                        id={field.label.toLowerCase().split(' ').join('-')}
                                                                        className={[classes["add-form-field"], classes["add-form-field-text-input"]].join(' ')}
                                                                    >
                                                                        <label></label>
                                                                        <div>
                                                                            <label className={classes["add-form-label"]}>
                                                                                <img src={field.icon} alt={field.label} className={classes["signup-form-mail"]} />
                                                                            </label>
                                                                            <input
                                                                                type={field.type}
                                                                                value={field.input}
                                                                                required={field.required}
                                                                                onChange={e => setInputValue(field, e)}
                                                                                onFocus={() => setFieldTouched(field)}
                                                                                onBlur={e => handleBlur(field, e)}
                                                                                className="signin-form-input-field"
                                                                                placeholder={field.label}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    {
                                                                        field.validation &&
                                                                        field
                                                                            .validation
                                                                            .filter(v => v.error)
                                                                            .map(v => v.errorMessage)
                                                                            .map((msg, i) => (
                                                                                <p
                                                                                    key={i}
                                                                                    className={classes["signin-form-input-field-error"]}
                                                                                >
                                                                                    {msg}
                                                                                </p>
                                                                            ))
                                                                    }
                                                                </div>
                                                            </div>

                                                        </div>
                                                    );
                                                })
                                            }
                                            <div className="grid-x">
                                                <div className="cell small-4">
                                                    <button onClick={() => close(false)} key="cancel" style={{ backgroundColor: 'red' }}>Cancel</button>
                                                </div>
                                                <div className="cell small-4">
                                                    <button type="submit">Add</button>
                                                </div>
                                                <div className="cell small-4">
                                                    <button key="clear" style={{ backgroundColor: 'yellow', color: 'black' }}>Clear</button>
                                                </div>
                                            </div>

                                        </>
                                    )}
                            />
                        ) : ''
                }

            </div>
        </>

    )

};