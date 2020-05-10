import React, { useState, useEffect, useMemo} from 'react';

import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';
import classes from './Permissions.module.scss';

import { userActions } from '../../_actions';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

import * as DataColumns from '../Databases/Tables/DBTable/DataColumns';

import Modal from 'react-foundation-modal';
import { FormWithValidation } from '../Forms/FormWithValidation';
import { FormField, FormFieldLabel, FormFieldInput, FormFieldError } from 'react-foundation-components/lib/forms';


import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../_actions';
import { resourceNames } from '../../_constants';

export const Permissions = () => {

    const initialFormFields = [
        {
            label: 'Admin',
            type: 'radio',
            value: 'admin'
            
        },
        {
            label: 'Developer',
            type: 'radio',
            value: 'developer'
            
        },
        {
            label: 'User',
            type: 'radio',
            value: 'user'
            
        }
    ]

    const [isModalOpen, setModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [toggleBtn, setToggleBtn] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);
    const [isChecked, setChecked] = useState(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [objToEdit, setObjToEdit] = useState(null);
    

    const showModal = status => {
        setModalOpen(status);
        console.log("isModalOpen: ", isModalOpen)
    }

    // ***************** Data Table settings

    const handleSelectedrow = (row) => {
        console.log("Selected row: ", row)
        setSelectedRow(row);
        if(row.selectedCount > 1)
        {
            setToggleBtn(false);
        }
        else {
            setToggleBtn(true);
        }
        console.log("Toggle button ",toggleBtn);
    }

    // *************** onChange
    const handleChange = e => {
        setChecked(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        console.log("Form submited");
        console.log(isChecked.toLowerCase());
        console.log("Object to edit", objToEdit)

        const requestMethod = 'PUT';

        const body = {
            Id:objToEdit.id, //objToEdit
            UserRole:isChecked.toLowerCase() //formFields[1].input
        };

        console.log("submitting form:");
        console.log(requestMethod);
        console.dir(body);

        // Submit
        //const selectedUser = localUsers.users.items.find(uid => uid.id == body.Id);

        // For PUT requests, don't forget to pass the entire resource object
        // Except for DateModified, since it's automatically set by the database
        // This is required by ASP.NET Core, because it strictly follows
        // The HTTP specification

        var resourceObject = {
            Id: objToEdit.id,
            UserName: objToEdit.userName,
            UserEmail: objToEdit.userEmail,
            UserPassword: "test", //ToDO: remove this field
            FirstName: objToEdit.firstName,
            LastName: objToEdit.lastName,
            UserRole: isChecked.toLowerCase()
        };

        console.log("Resource object", resourceObject);
        // dispatch(resourceActions.put(resourceNames.USERS, objToEdit.id, resourceObject));

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

    if(localUsers && localUsers.users && localUsers.users.items && localUsers.users.items.users) {
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

        return(
            <div>
                <Column small={6} className="delete-container">
                    <Button key="action" onClick={handleAction} primary disabled={!toggleBtn}>Change Role</Button>
                </Column>
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
                        <Column>
                            <Row>
                            <input type="radio" value="Admin" name="userRole" checked={isChecked === "Admin"} onChange={handleChange}/>
                            <label for="Admin">Admin</label>
                            </Row>
                            <Row>
                            <input type="radio" value="Developer" name="userRole" checked={isChecked === "Developer"} onChange={handleChange}/>
                            <label for="Developer">Developer</label>
                            </Row>
                            <Row>
                            <input type="radio" value="User" name="userRole" checked={isChecked === "User"} onChange={handleChange}/>
                            <label for="User">User</label>
                            </Row>
                        </Column>

                        <Column>
                        <Row>
                        <Button type="submit" disabled={isChecked === null}>Submit</Button>
                        </Row>
                        </Column>

                        <Column>
                        Selected option is : {isChecked}
                        </Column>
                        
                        
                        
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

