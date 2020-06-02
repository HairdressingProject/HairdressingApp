import React, { useEffect, useState } from 'react';
import { FormWithValidation } from '../../Forms/FormWithValidation';

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../_actions';
import { resourceNames } from '../../../_constants';

export const EditEntry = ({ title, initialFormFields, objectToEdit, close, editObject }) => {
    const dispatch = useDispatch();
    console.log("edit this: ", editObject);

    const [formSubmitted, setFormSubmitted] = useState(false);

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
        <div className="edit-form-container">
            <h1>Edit entry in {title} table</h1>

            <FormWithValidation
                initialFormFields={initialFormFields}
                handleSubmit={(e, isFormValid, formFields) => {
                    e.preventDefault();
                    console.log(e);
                    console.log(isFormValid);
                    console.log(formFields);

                    console.log("Initial object: ");
                    console.dir(editObject);
                    console.log("Inputs object: ");
                    console.log(formFields);



                    // Create a resource objecte


                    switch (title) {

                        case "Users": {
                            //const selectedHairStyle = localHairStyles.hairStyles.items.find(h => h.id == body.Id);


                            var resourceObject = {
                                Id: editObject.id,
                                UserName: formFields[0].input,
                                UserEmail: formFields[1].input,
                                UserPassword: formFields[2].input, //ToDO: remove this field
                                FirstName: formFields[3].input,
                                LastName: formFields[4].input,
                                UserRole: formFields[5].input
                            };
                            console.log("resourceObject");
                            console.dir(resourceObject);
                            dispatch(resourceActions.put(resourceNames.USERS, editObject.id, resourceObject));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                            break;
                        }

                        case "User Features": {

                            var resourceObject = {
                                Id: editObject.id,
                                UserId: editObject.userId,
                                FaceShapeId: parseInt(formFields[1].input),
                                SkinToneId: parseInt(formFields[2].input),
                                HairStyleId: parseInt(formFields[3].input),
                                HairLengthId: parseInt(formFields[4].input)
                            };
                            console.log("resourceObject");
                            console.dir(resourceObject);
                            dispatch(resourceActions.put(resourceNames.USER_FEATURES, editObject.id, resourceObject));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                            break;
                        }

                        case "Skin Tones": {

                            var resourceObject = {
                                Id: editObject.id,
                                SkinToneName: formFields[0].input,
                            };
                            console.log("resourceObject");
                            console.dir(resourceObject);
                            dispatch(resourceActions.put(resourceNames.SKIN_TONES, editObject.id, resourceObject));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                            break;
                        }

                        case "Face Shapes": {

                            var resourceObject = {
                                Id: editObject.id,
                                FaceShapeName: formFields[0].input,
                            };
                            console.log("resourceObject");
                            console.dir(resourceObject);
                            dispatch(resourceActions.put(resourceNames.FACE_SHAPES, editObject.id, resourceObject));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                            break;
                        }

                        case "Hair Lengths": {

                            var resourceObject = {
                                Id: editObject.id,
                                HairLengthName: formFields[0].input,
                            };
                            console.log("resourceObject");
                            console.dir(resourceObject);
                            dispatch(resourceActions.put(resourceNames.HAIR_LENGTHS, editObject.id, resourceObject));
                            setTimeout(() => {
                                setFormSubmitted(true);
                                close(false);
                            }, 300);
                            break;
                        }

                        default: {
                            break;
                        }


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
                                        <>
                                            <div
                                                key={index}
                                                id={field.label.toLowerCase().split(' ').join('-')}
                                                className="edit-form-field edit-form-field-text-input"
                                            >
                                                <div>
                                                    <label className="edit-form-label">
                                                        {field.label}
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
                                        </>
                                    );
                                })
                            }
                            <div className="grid-x">
                                <div className="cell small-4">
                                    <button onClick={() => close(false)} key="cancel" style={{ backgroundColor: 'red' }}>Cancel</button>
                                </div>
                                <div className="cell small-4">
                                    <button type="submit">Submit</button>
                                </div>
                                <div className="cell small-4">
                                    <button key="clear" style={{ backgroundColor: 'yellow', color: 'black' }}>Clear</button>
                                </div>
                            </div>

                        </>
                    )}
            />
        </div>

    )

};