import React, { useState, useEffect, useMemo } from 'react';

import DataTable from 'react-data-table-component'

import { userActions } from '../../_actions';

import * as DataColumns from '../Databases/Tables/DBTable/DataColumns';

import Modal from 'react-foundation-modal';


import { useDispatch, useSelector } from 'react-redux';

/**
 * Permissions page is where the Administrator can change users role.
 * Contains a <DataTable/> component with an array of users as data with "selectableRows" property.
 * A <Button/> component that onClick() shows a <Modal/> with a Form to change the user role
 */

export const Permissions = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [toggleBtn, setToggleBtn] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isChecked, setChecked] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [objToEdit, setObjToEdit] = useState(null);


    /**
     * Function to open and close a <Modal/> component
     * 
     * @param {bool} status 
     */
    const showModal = status => {
        setModalOpen(status);
    }

    // Refresh the list of items from the database whenever the form is submitted
    useEffect(() => {
        if (formSubmitted) {
            dispatch(userActions.getAll())
            setFormSubmitted(false);
        }
    }, [formSubmitted]);



    // ***************** Data Table settings

    /**
     * Function that sets the "Change role" <Button/> disabled boolean property to true or false
     * @param {object} row 
     */
    const handleSelectedrow = (row) => {
        console.log("Selected row: ", row)
        setSelectedRow(row); // update selectedRow state variable
        if (row.selectedCount > 1) // if more than one element is selected, then disable the button
        {
            setToggleBtn(false);
        }
        else // Enable button only if one element is selected
        {
            setToggleBtn(true);
        }
        console.log("Toggle button ", toggleBtn);
    }

    /**
     * Function that updates the state variable isChecked (null by default)
     * 
     * @param {string} e.target.value The string value userRole of radio element 
     * 
     */
    const handleChange = e => {
        setChecked(e.target.value);
    };

    /**
     * Function to handle the change role form submit event
     * 
     * @param {} e 
     * 
     * @param {string} isChecked value from radio element
     * @param {obj} objToEdit instance of User class to Edit
     * @param {string} requestMethod http method
     * @param {obj} body http request body
     */
    const handleSubmit = e => {
        e.preventDefault();
        console.log("Form submited");
        console.log(isChecked.toLowerCase());
        console.log("Object to edit", objToEdit)

        const requestMethod = 'PUT';

        const body = {
            Id: objToEdit.id,
            UserName: objToEdit.userName,
            UserEmail: objToEdit.userEmail,
            UserRole: isChecked.toLowerCase()
        };

        console.log("submitting form:");
        console.log(requestMethod);
        console.dir(body);


        // For PUT requests, don't forget to pass the entire resource object
        // Except for DateModified, since it's automatically set by the database
        // This is required by ASP.NET Core, because it strictly follows
        // The HTTP specification


        dispatch(userActions.changeUserRole(body));
        setTimeout(() => {
            setFormSubmitted(true);
            showModal(false); // close modal after submit
        }, 300);

    };

    // Fetch Data ********************
    const [localUsers, setLocalUsers] = useState(null);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    // componentDidMount()
    useEffect(() => {
        dispatch(userActions.getAll())
    }, []);

    // componentDidUpdate()
    useEffect(() => {
        setLocalUsers({ users })
    }, [users]);

    useEffect(() => {
    }, [localUsers]);

    if (localUsers && localUsers.users && localUsers.users.items && localUsers.users.items.users) {
        console.log("localUSers");
        console.dir(localUsers.users.items.users);
        //setTableData(localUsers.users.items.users)
        var usersTableData = localUsers.users.items.users;
    }

    const contextActions = useMemo(() => {
        const handleAction = () => {
            console.log("handling action", selectedRow);
            console.log("Object to Edit", selectedRow.selectedRows[0]);
            setObjToEdit(selectedRow.selectedRows[0]);
            // Open change user role modal
            showModal(true);

        }

        return (
            <div className="grid-x">
                <div className="delete-container cell small-6">
                    <button key="action" onClick={handleAction} disabled={!toggleBtn}>Change Role</button>
                </div>
            </div>
        );
    });




    return (
        <div>
            Permissions
            <DataTable
                title="Users"
                columns={DataColumns.usersTableColumns}
                data={usersTableData}
                selectableRows
                onSelectedRowsChange={handleSelectedrow}
                contextActions={contextActions}
            />

            <Modal
                open={isModalOpen}
                closeModal={showModal}
                isModal={true}
                size="full">

                Change role
                    <>
                    <form onSubmit={handleSubmit}>
                        <div className="cell">
                            <div className="grid-x">
                                <input type="radio" value="Admin" name="userRole" checked={isChecked === "Admin"} onChange={handleChange} />
                                <label for="Admin">Admin</label>
                            </div>
                            <div className="grid-x">
                                <input type="radio" value="Developer" name="userRole" checked={isChecked === "Developer"} onChange={handleChange} />
                                <label for="Developer">Developer</label>
                            </div>
                            <div className="grid-x">
                                <input type="radio" value="User" name="userRole" checked={isChecked === "User"} onChange={handleChange} />
                                <label for="User">User</label>
                            </div>
                        </div>

                        <div className="cell">
                            <div className="grid-x">
                                <button type="submit" disabled={isChecked === null}>Submit</button>
                            </div>
                        </div>

                        <div className="cell">
                            Selected option is : {isChecked}
                        </div>



                    </form>


                    {/* <Row className={classes["change-rol-form-container"]}>
                        <FormWithValidation
                            initialFormFields={initialFormFields}
                            handleSubmit={(e) => {
                                e.preventDefault();

                                const requestMethod = 'PUT';

                                const body = {
                                    Id:1, //objToEdit
                                    UserRole:'admin' //formFields[1].input
                                };

                                console.log("submitting form:");
                                console.log(objToEdit);
                                console.log(requestMethod);
                                console.dir(body);

                                // Submit
                                const selectedUser = localUsers.users.items.find(uid => uid.id == body.Id);

                                // For PUT requests, don't forget to pass the entire resource object
                                // Except for DateModified, since it's automatically set by the database
                                // This is required by ASP.NET Core, because it strictly follows
                                // The HTTP specification

                                // var resourceObject = {
                                //     Id: objToEdit.id,
                                //     UserName: objToEdit.userName,
                                //     UserEmail: objToEdit.userEmail,
                                //     UserPassword: formFields[2].input, //ToDO: remove this field
                                //     FirstName: objToEdit.firstName,
                                //     LastName: objToEdit.LastName,
                                //     UserRole: formFields[0].input
                                // };

                                // dispatch(resourceActions.put(resourceNames.USERS, body.Id, {
                                //     Id: body.Id,
                                //     UserName: body.HairStyleName,
                                //     HairStyleLinks: selectedHairStyle.hairStyleLinks,
                                //     DateCreated: selectedHairStyle.dateCreated
                                // }));
                            }}
                            fields ={(
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
                                            return(
                                                <FormField
                                                    className={classes["form-field"]}
                                                    key={index}
                                                    id={field.label.toLowerCase().split(' ').join('-')}

                                                >
                                                    <Row>
                                                        <Column
                                                            small={12}
                                                            large={4}
                                                        >
                                                            <FormFieldLabel className={classes["form-label"]}>
                                                                {field.label}
                                                            </FormFieldLabel>
                                                        </Column>
                                                        <Column>
                                                            <FormFieldInput
                                                                type={field.type}
                                                                value={field.value}
                                                                onChange={e => setChecked(field, e)}
                                                                className={classes["form-radio"]}
                                                            />
                                                        </Column>
                                                    </Row>

                                                </FormField>
                                            )                                            
                                        }
                                    )
                                }
                                </>
                            )
                            }
                        />
                    </Row> */}
                </>

            </Modal>

        </div>
    );

};

