import React, { useState, useEffect } from 'react';
import classes from './Databases.module.scss';

import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

import { ModalForm } from './ModalForm'


import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../_actions';
import { resourceNames } from '../../_constants';

import { DBTable } from './Tables/DBTable'
import * as DataColumns from './Tables/DBTable/DataColumns'

export const Databases = () => {

    // Declare a state boolean variable for each table on the database to show or hide the table when selected (conditional rendering)

    const [showUsersTable, setShowUsersTable] = useState(false);
    const [showFaceShapesTable, setShowFaceShapesTable] = useState(false);
    const [showUserFeaturesTable, setShowUserFeaturesTable] = useState(false);
    const [showSkinTonesTable, setShowSkinTonesTable] = useState(false);
    const [showHairLengthsTable, setShowHairLengthsTable] = useState(false);


    // Declare state variables to toggle Add and Edit Modals
    //
    // The 'useState' hook takes an initial state as a parameter and returns an array
    // wich holds the current state as first item and a function to change the state
    // as second item
    //
    // We declare a state variable for each one of the tables on the database (one for Add and one for Edit)

    const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
    const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
    const [isAddUserFeaturesModalOpen, setAddUserFeaturesModalOpen] = useState(false);
    const [isEditUserFeaturesModalOpen, setEditUserFeaturesModalOpen] = useState(false);
    const [isAddFaceShapesModalOpen, setAddFaceShapesModalOpen] = useState(false);
    const [isEditFaceShapesModalOpen, setEditFaceShapesModalOpen] = useState(false);
    const [isAddSkinTonesModalOpen, setAddSkinTonesModalOpen] = useState(false);
    const [isEditSkinTonesModalOpen, setEditSkinTonesModalOpen] = useState(false);
    const [isAddHairLengthsModalOpen, setAddHairLengthsModalOpen] = useState(false);
    const [isEditHairLengthsModalOpen, setEditHairLengthsModalOpen] = useState(false);


    // Define a function to toggle the state variable to open the modal
    // The function is passed as a property to the table component (which is a child of Databases component)
    // example:
    //
    // <UsersTable
    //     setAddUserModalOpen={showAddUserModal}
    //     setEditUserModalOpen={showEditUserModal}
    // />
    //
    // Then, on the UsersTable component we can link this function to the button onClick()
    // <Button key="add" onClick={() => setAddUserModalOpen(true)}>Add</Button>;
    //

    const showAddUserModal = status => {
        setAddUserModalOpen(status);
    }

    const showEditUserModal = status => {
        setEditUserModalOpen(status);
    }

    const showAddUserFeaturesModal = status => {
        setAddUserFeaturesModalOpen(status);
    }

    const showEditUserFeaturesModal = status => {
        setEditUserFeaturesModalOpen(status);
    }

    const showAddFaceShapesModal = status => {
        setAddFaceShapesModalOpen(status);
    }


    const showEditFaceShapesModal = status => {
        setEditFaceShapesModalOpen(status);
    }


    const showAddSkinTonesModal = status => {
        setAddSkinTonesModalOpen(status);
    }

    const showEditSkinTonesModal = status => {
        setEditSkinTonesModalOpen(status);
    }

    const showAddHairLengthsModal = status => {
        setAddHairLengthsModalOpen(status);
    }

    const showEditHairLengthsModal = status => {
        setEditHairLengthsModalOpen(status);
    }

    // objToEdit to pass object props to edit form

    const [objToEdit, setObjToEdit] = useState(null);
    const selectObjToEdit = myObj => {
        setObjToEdit(myObj);
    }



    // ***************** Databases Table settings

    // Define columns

    const db_tables_columns = [
        {
            name: 'Table Id',
            selector: 'tableId',
            sortable: true,
        },
        {
            name: 'Table Name',
            selector: 'tableName',
            sortable: true,
        }
    ];

    // Define content

    const db_tables_rows = [
        {
            tableId: 0,
            tableName: "Users",
        },
        {
            tableId: 1,
            tableName: "User Features",
        },
        {
            tableId: 2,
            tableName: "Skin Tones",
        },
        {
            tableId: 3,
            tableName: "Face Shapes",
        },
        {
            tableId: 4,
            tableName: "Hair Lengths",
        },
    ];



    // show loading message if data is loading
    const [loading, setLoading] = useState(false);

    // Logic to handle tabel sorting
    const handleSort = (column, sortDirection) => {
        // simulate server sort
        setLoading(true);

        // instead of setTimeout this is where you would handle your API call.
        setTimeout(() => {
            setDBTables(orderBy(DBTables, column.selector, sortDirection));

            setLoading(false);
        }, 100);
    };

    // Logic to handle selected row
    // tablesI is an array that indicates 0 if the table is not selected and 1 if is selected
    var tablesI = [0, 0, 0, 0, 0];

    const handleChange = (row) => {
        var tablesToShow = row.selectedRows;


        /* console.log("Selected tables: ");
        console.log(tablesToShow); */


        if (tablesToShow.length > 0) {
            tablesToShow.forEach((item) => {
                // console.log(item.tableId);
                tablesI[item.tableId] = 1;
            });
        } else {
            tablesI = [0, 0, 0, 0, 0]
        }


        if (tablesI[0] === 0) {
            setShowUsersTable(false);
        } else {
            setShowUsersTable(true);
        };

        if (tablesI[1] === 0) {
            setShowUserFeaturesTable(false);
        } else {
            setShowUserFeaturesTable(true);
        };

        if (tablesI[2] === 0) {
            setShowSkinTonesTable(false);
        } else {
            setShowSkinTonesTable(true);
        };

        if (tablesI[3] === 0) {
            setShowFaceShapesTable(false);
        } else {
            setShowFaceShapesTable(true);
        };

        if (tablesI[4] === 0) {
            setShowHairLengthsTable(false);
        } else {
            setShowHairLengthsTable(true);
        };
    };


    const [DBTables, setDBTables] = useState([]);
    // ***************** End ofDatabases Table settings

    // Fetch Data ************************************************************
    const [localResources, setLocalResources] = useState(null);
    const dispatch = useDispatch();
    const resources = useSelector(state => state.resources);


    // componentDidMount()
    useEffect(() => {
        setDBTables(db_tables_rows);
        Object
            .values(resourceNames)
            .forEach(resourceNames => {
                dispatch(resourceActions.getAll(resourceNames))
            });
    }, []);

    // componentDidUpdate()
    useEffect(() => {
        setLocalResources({ resources })
    }, [resources]);

    useEffect(() => {
    }, [localResources]);



    if (localResources && localResources.resources) {


        if (localResources.resources.users && localResources.resources.users.items && localResources.resources.users.items.users) {
            var usersTableData = localResources.resources.users.items.users;
        }

        if (localResources.resources.userFeatures && localResources.resources.userFeatures.items) {
            var userFeaturesTableData = localResources.resources.userFeatures.items;
        }

        if (localResources.resources.skinTones && localResources.resources.skinTones.items) {
            var skinTonesTableData = localResources.resources.skinTones.items;
        }

        if (localResources.resources.faceShapes && localResources.resources.faceShapes.items) {
            var faceShapesTableData = localResources.resources.faceShapes.items;
        }

        if (localResources.resources.hairLengths && localResources.resources.hairLengths.items) {
            var hairLengthsTableData = localResources.resources.hairLengths.items;
        }
    }

    // *************************************************** End of fetch Data


    return (
        <div>
            <h1 className={["text-center", classes["databases-title"]].join(' ')}>Databases</h1>

            {/* Table that shows all tables on the database */}
            <div className={classes["db-table-container"]}>
                <DataTable //https://www.npmjs.com/package/react-data-table-component
                    title="hairdress_db Tables"
                    columns={db_tables_columns}
                    data={DBTables}
                    onSort={handleSort}
                    className={classes["data-table"]}
                    sortServer
                    progressPending={loading}
                    persistTableHead
                    highlightOnHover
                    selectableRows
                    selectableRowsHighlight
                    onSelectedRowsChange={handleChange}
                />
            </div>
            {/* Enf of Table that shows all tables on the database */}


            {/* Users ********************************************** */}
            {showUsersTable ? // if true, show the table
                <div className={classes["selected-table-container"]}>
                    <DBTable
                        tableTitle={"Users"}
                        openAddModal={showAddUserModal}
                        openEditModal={showEditUserModal}
                        tableData={usersTableData}
                        tableColumns={DataColumns.usersTableColumns}
                        editObject={selectObjToEdit}
                    />
                </div>
                :
                null
            }

            <ModalForm
                tableSource="Users"
                openAddModal={isAddUserModalOpen}
                openEditModal={isEditUserModalOpen}
                closeAddModal={setAddUserModalOpen}
                closeEditModal={setEditUserModalOpen}
                editObject={objToEdit}
            />

            {/* end of Users ********************************************** */}


            {/* Users Features ********************************************** */}
            {showUserFeaturesTable ?
                <div className={classes["selected-table-container"]}>
                    <DBTable
                        tableTitle={"User Features"}
                        openAddModal={showAddUserFeaturesModal}
                        openEditModal={showEditUserFeaturesModal}
                        tableData={userFeaturesTableData}
                        tableColumns={DataColumns.userFeaturesTableColumns}
                        editObject={selectObjToEdit}
                    />
                </div>
                :
                null
            }

            <ModalForm
                tableSource="User Features"
                openAddModal={isAddUserFeaturesModalOpen}
                openEditModal={isEditUserFeaturesModalOpen}
                closeAddModal={showAddUserFeaturesModal}
                closeEditModal={showEditUserFeaturesModal}
                editObject={objToEdit}
            />
            {/* end of Users Features ********************************************** */}



            {/* Skin Tones ********************************************** */}
            {showSkinTonesTable ?
                <div className={classes["selected-table-container"]}>
                    <DBTable
                        tableTitle={"Skin Tones"}
                        openAddModal={showAddSkinTonesModal}
                        openEditModal={showEditSkinTonesModal}
                        tableData={skinTonesTableData}
                        tableColumns={DataColumns.skinTonesTableColumns}
                        editObject={selectObjToEdit}
                    />
                </div>
                :
                null}

            <ModalForm
                tableSource="Skin Tones"
                openAddModal={isAddSkinTonesModalOpen}
                openEditModal={isEditSkinTonesModalOpen}
                closeAddModal={showAddSkinTonesModal}
                closeEditModal={showEditSkinTonesModal}
                editObject={objToEdit}
            />
            {/* End of skin tones ********************************************** */}



            {/* Hair Lengths ********************************************** */}
            {showHairLengthsTable ?
                <div className={classes["selected-table-container"]}>
                    <DBTable
                        tableTitle={"Hair Lengths"}
                        openAddModal={showAddHairLengthsModal}
                        openEditModal={showEditHairLengthsModal}
                        tableData={hairLengthsTableData}
                        tableColumns={DataColumns.hairLengthsTableColumns}
                        editObject={selectObjToEdit}
                    />
                </div>
                :
                null}

            <ModalForm
                tableSource="Hair Lengths"
                openAddModal={isAddHairLengthsModalOpen}
                openEditModal={isEditHairLengthsModalOpen}
                closeAddModal={showAddHairLengthsModal}
                closeEditModal={showEditHairLengthsModal}
                editObject={objToEdit}
            />
            {/* End of Hair Lengths ********************************************** */}



            {/* FaceShapes **************************************** */}
            {showFaceShapesTable ?
                <div className={classes["selected-table-container"]}>
                    <DBTable
                        tableTitle={"Face Shapes"}
                        openAddModal={showAddFaceShapesModal}
                        openEditModal={showEditFaceShapesModal}
                        tableData={faceShapesTableData}
                        tableColumns={DataColumns.faceShapesTableColumns}
                        editObject={selectObjToEdit}
                    />
                </div>
                :
                null
            }
            <ModalForm
                tableSource="Face Shapes"
                openAddModal={isAddFaceShapesModalOpen}
                openEditModal={isEditFaceShapesModalOpen}
                closeAddModal={showAddFaceShapesModal}
                closeEditModal={showEditFaceShapesModal}
                editObject={objToEdit}
            />
            {/* end of FaceShapes ******************************** */}







        </div>
    )

};