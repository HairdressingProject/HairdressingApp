import React, { useEffect, useState } from 'react';
import classes from './DummyComponent.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../_actions';
import { resourceNames } from '../../_constants';
import { Row, Column } from 'react-foundation-components/lib/grid';
import { Table } from 'react-foundation-components/lib/table';
import { FormField, FormFieldLabel, FormFieldInput, FormFieldError } from 'react-foundation-components/lib/forms';
import { Button } from 'react-foundation-components/lib/button';
import { FormWithValidation } from '../Forms/FormWithValidation';

export const DummyComponent = () => {

    // localResources will be used to store resources fetched from the backend in this component
    // setLocalResources is a function that is roughly equivalent to setState in a class component
    const [localResources, setLocalResources] = useState(null);

    // You can use the same technique above for any kind of resource
    const [localHairStyles, setLocalHairStyles] = useState(null);

    const [formSubmitted, setFormSubmitted] = useState(false);

    // dispatch is a function that will be called with a resourceAction to send HTTP requests
    const dispatch = useDispatch();

    // resources is a "slice" of Redux store's state that contains items from all tables in the database
    const resources = useSelector(state => state.resources);

    // You can use the same approach to access any specific table, like hairStyles
    const hairStyles = useSelector(state => state.resources.hairStyles);

    /**
     * useEffect() is a React hook that allows you to pass callbacks that run whenever 
     * one or more variables that are declared in this component change
     * 
     * You can pass an array of variables as second argument
     * If you do so, the callback will run when the values of those variables change
     * 
     * Passing an empty array will make the callback run as soon as this component loads
     * It would be equivalent to componentDidMount() in a class component
     */
    useEffect(() => {
        /**
         * IMPORTANT: Make sure you're authenticated (open your browser's console or dev tools and 
         * check the "Application" tab) before dispatching any actions
         * 
         * To sign in, navigate to http://localhost:3000/sign_in and enter the details below:
         * 
         * Username or email: admin
         * Password: 123456  
         *  
        */

        // Get all hair styles from the database
        dispatch(resourceActions.getAll(resourceNames.HAIR_STYLES));
    }, []);

    useEffect(() => {
        console.log('A new hair style entry was fetched/updated! It will be stored in localHairStyles');

        setLocalHairStyles({ hairStyles });
    }, [hairStyles]);

    useEffect(() => {
        console.dir(localHairStyles);
    }, [localHairStyles]);

    // Refresh the list of items from the database whenever the form is submitted
    useEffect(() => {
        if (formSubmitted) {
            dispatch(resourceActions.getAll(resourceNames.HAIR_STYLES));
            setFormSubmitted(false);
        }
    }, [formSubmitted]);


    // Alternatively, comment out the four useEffects above and uncomment the ones below to get ALL resources from the database, from all tables

    /* useEffect(() => {
        Object
            .values(resourceNames)
            .forEach(resourceName => {
                dispatch(resourceActions.getAll(resourceName));
            });
    }, []);

    useEffect(() => {
        console.log('A new resource has been fetched/updated! It will be stored in localResources');

        setLocalResources({ resources });
    }, [resources]);

    useEffect(() => {
        console.dir(localResources);
    }, [localResources]); */

    const initialFormFields = [
        {
            label: 'Request method',
            type: 'select',
            options: ['POST', 'PUT', 'DELETE'],
            touched: false,
            input: 'POST',
            defaultValue: 'POST'
        },
        {
            label: 'Id',
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
        {
            label: 'HairStyleName',
            type: 'text',
            input: '',
            required: true,
            touched: false,
            validation: [
                {
                    error: false,
                    errorMessage: 'This field is required',
                    check: (input) => {
                        return !input || !input.trim();
                    }
                },
            ]
        }
    ];

    return (
        <div className={[classes["dummy-container"], "text-center"].join(' ')}>
            <Row>
                <Column small={12}>
                    <h1 className={classes["dummy-title"]}>
                        Fill in the form below to update or add a new <b>hair style</b>:
                    </h1>
                </Column>
            </Row>
            <Row className={classes["dummy-form-container"]}>
                <FormWithValidation
                    initialFormFields={initialFormFields}
                    handleSubmit={(e, isFormValid, formFields) => {
                        e.preventDefault();

                        const requestMethod = formFields[0].input;

                        // Keep form validation in mind when extracting the values below
                        const body = {
                            Id: formFields[1].input,
                            HairStyleName: formFields[2].input
                        };

                        /* console.log("submitting form:");
                        console.log(requestMethod);
                        console.dir(body); */

                        // Submit form here
                        if (requestMethod === 'POST') {
                            dispatch(resourceActions.post(resourceNames.HAIR_STYLES, { HairStyleName: body.HairStyleName }));
                        }
                        else if (requestMethod === 'PUT') {
                            const selectedHairStyle = localHairStyles.hairStyles.items.find(h => h.id == body.Id);

                            // For PUT requests, don't forget to pass the entire resource object
                            // Except for DateModified, since it's automatically set by the database
                            // This is required by ASP.NET Core, because it strictly follows
                            // The HTTP specification
                            dispatch(resourceActions.put(resourceNames.HAIR_STYLES, body.Id, {
                                Id: body.Id,
                                HairStyleName: body.HairStyleName,
                                HairStyleLinks: selectedHairStyle.hairStyleLinks,
                                DateCreated: selectedHairStyle.dateCreated
                            }));
                        }
                        else {
                            dispatch(resourceActions.deleteResource(resourceNames.HAIR_STYLES, body.Id));
                        }

                        // This small delay avoids race conditions
                        // For example: If a POST_SUCCESS action kicks in after a GETALL_SUCCESS action, the list of resources will not be updated
                        // I'm still trying to figure out how to solve this properly
                        setTimeout(() => {
                            setFormSubmitted(true);
                        }, 300);

                        // Clear form fields
                        formFields.forEach((f, i) => {
                            if (f.type === 'text') {
                                f.input = '';
                            }

                            // BUG: Select option doesn't get reset
                            // Perhaps should make setInputValue available here?
                            else {
                                f.input = 'POST';
                                f.defaultValue = 'POST';
                            }
                        });
                    }}
                    fields={(
                        formFields,
                        setInputValue,
                        setFieldTouched,
                        isFormValid,
                        handleBlur
                    ) => (
                            <>
                                {
                                    formFields.map(
                                        (field, index) => {
                                            if (field.type === 'select') {
                                                return (
                                                    <FormField
                                                        className={classes["dummy-form-field"]}
                                                        key={index}
                                                        id={field.label.toLowerCase().split(' ').join('-')}
                                                    >
                                                        <Row>
                                                            <Column
                                                                small={12}
                                                                smallCentered="centered"
                                                            >
                                                                <FormFieldLabel className={classes["dummy-form-label"]}>
                                                                    {field.label}
                                                                </FormFieldLabel>
                                                            </Column>
                                                        </Row>
                                                        <Row>
                                                            <Column
                                                                small={12}
                                                                large={3}
                                                                smallCentered="centered"
                                                            >
                                                                <FormFieldInput
                                                                    type={field.type}
                                                                    onChange={e => setInputValue(field, e)}
                                                                    className={classes["dummy-form-option"]}
                                                                    defaultValue={field.defaultValue}
                                                                >
                                                                    {
                                                                        field.options.map((option, i) => (
                                                                            <option
                                                                                key={i}
                                                                            >
                                                                                {option}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </FormFieldInput>
                                                            </Column>
                                                        </Row>
                                                    </FormField>
                                                )
                                            }
                                            else {
                                                return (
                                                    <FormField
                                                        className={classes["dummy-form-field"]}
                                                        key={index}
                                                        id={field.label.toLowerCase().split(' ').join('-')}
                                                        error={field.validation?.some(v => v.error) ? "true" : "false"}
                                                    >
                                                        <Row>
                                                            <Column>
                                                                <FormFieldLabel className={classes["dummy-form-label"]}>
                                                                    {field.label}
                                                                </FormFieldLabel>
                                                            </Column>
                                                        </Row>
                                                        <Row>
                                                            <Column
                                                                small={12}
                                                                large={4}
                                                                smallCentered="centered"
                                                                className={classes["dummy-form-input-container"]}
                                                            >
                                                                <FormFieldInput
                                                                    type={field.type}
                                                                    value={field.input}
                                                                    required={field.required}
                                                                    onChange={e => setInputValue(field, e)}
                                                                    onFocus={() => setFieldTouched(field)}
                                                                    onBlur={e => handleBlur(field, e)}
                                                                    className={classes["dummy-form-input"]}
                                                                    placeholder={field.label}
                                                                    disabled={
                                                                        (field.label === 'Id' && formFields[0].input === 'POST')
                                                                        ||
                                                                        (field.label === 'HairStyleName' &&
                                                                            formFields[0].input === 'DELETE')
                                                                    }
                                                                />
                                                            </Column>
                                                        </Row>
                                                        {
                                                            field.validation &&
                                                            field
                                                                .validation
                                                                .filter(v => v.error)
                                                                .map(v => v.errorMessage)
                                                                .map((msg, i) => (
                                                                    <Row key={i}>
                                                                        <Column>
                                                                            <FormFieldError
                                                                            >
                                                                                {msg}
                                                                            </FormFieldError>
                                                                        </Column>
                                                                    </Row>
                                                                ))
                                                        }
                                                    </FormField>
                                                )
                                            }
                                        }
                                    )

                                }
                                <Button
                                    color="success"
                                    type="submit"
                                    className={classes["dummy-form-submit"]}
                                    disabled={formSubmitted}
                                >
                                    Submit
                                </Button>
                            </>
                        )}
                />
            </Row>
            <Row>
                <h2 className={classes["dummy-table-title"]}>
                    Hair styles from <code>localHairStyles</code>:
                </h2>
            </Row>
            <Table scroll={true} className={classes["dummy-table"]}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>HairStyleName</th>
                        <th>DateCreated</th>
                        <th>DateModified</th>
                        <th>HairStyleLinks</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        localHairStyles &&
                        localHairStyles.hairStyles &&
                        localHairStyles.hairStyles.items &&
                        localHairStyles
                            .hairStyles
                            .items
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.hairStyleName}
                                    </td>
                                    <td>
                                        {item.dateCreated}
                                    </td>
                                    <td>
                                        {item.dateModified}
                                    </td>
                                    <td>
                                        {item.hairStyleLinks.join(', ')}
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
        </div>
    )
}