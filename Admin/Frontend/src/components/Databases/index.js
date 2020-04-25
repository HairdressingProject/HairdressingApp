import React, { useState, useEffect} from 'react';
import './Databases.scss';
import axios from 'axios';
import { UsersTable } from './Tables/UsersTable';
import { UserFeaturesTable } from './Tables/UserFeaturesTable';
import { SkinTonesTable } from './Tables/SkinTonesTable';
import { FaceShapesTable } from './Tables/FaceShapes';
import { HairLengthsTable } from './Tables/HairLengths';
import Modal from 'react-foundation-modal';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

import { AddFaceShapesForm } from './AddEntry/FaceShapes';
import { EditFaceShapesForm } from './EditEntry/FaceShapes';

import { AddUsersForm } from './AddEntry/Users';
import { EditUsersForm } from './EditEntry/Users';

import { AddEntry } from './AddEntry';
import { EditEntry } from './EditEntry';

import * as FormFields from '../Forms/FormFields';

export const Databases = () => 
    {

        // *************************** Users Setup
        // Add Modal Setup
        const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);
        const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
        const [objectToEdit, setObjectToEdit] = useState([]);

        const showAddUserModal = status => {
            setAddUserModalOpen(status);
        }

        const showEditUserModal = status => {
            setEditUserModalOpen(status);
        }

        const [showUsersTable, setShowUsersTable] = React.useState(false);




        // **************************** end of Users Setup

        // **************************** Users features Setup

        const [isAddUserFeaturesModalOpen, setAddUserFeaturesModalOpen] = useState(false);
        const [isEditUserFeaturesModalOpen, setEditUserFeaturesModalOpen] = useState(false);

        const showAddUserFeaturesModal = status => {
            setAddUserFeaturesModalOpen(status);
        }

        const showEditUserFeaturesModal = status => {
            setEditUserFeaturesModalOpen(status);
        }
        // **************************** end of Users Setup

        // *************************** Face Shapes Setup
        // Add Modal Setup

        const [isAddModalOpen, setAddModalOpen] = useState(false);

        const showAddModal = status => {
            setAddModalOpen(status);
        }

        const [isEditModalOpen, setEditModalOpen] = useState(false);

        const showEditModal = status => {
            setEditModalOpen(status);
        }

        const [showFaceShapesTable, setShowFaceShapesTable] = React.useState(false);

        // *************************** End of Face Shapes Setup

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
            },
            {
                name: 'Created',
                selector: 'created',
                sortable: true,
            },
            {
                name: 'Last Update',
                selector: 'updated',
                sortable: true,
            },
        ];

        const db_tables_rows = [
            {
                tableId: 0,
                tableName: "Users",
                created: "20/03/2020",
                updated: "28/03/2020"
            },
            {
                tableId: 1,
                tableName: "User Features",
                created: "20/03/2020",
                updated: "22/03/2020"
            },
            {
                tableId: 2,
                tableName: "Skin Tones",
                created: "20/03/2020",
                updated: "21/03/2020"
            },
            {
                tableId: 3,
                tableName: "Face Shapes",
                created: "20/03/2020",
                updated: "21/03/2020"
            },
            {
                tableId: 4,
                tableName: "Hair Lengths",
                created: "20/03/2020",
                updated: "21/03/2020"
            },
        ];



// Modal Set Up
        const revealStyle = {
            'backgroundColor': 'rgba(12, 24, 83, 0.62)'
        };


// DataTable settings
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
        var tablesI = [0,0,0,0,0];

          const handleChange = (row) => {
            var tablesToShow = row.selectedRows;
            
            
            console.log("Selected tables: ");
            console.log(tablesToShow);

            // setSelectedTables(row.SelectedRows);

            if (tablesToShow.length > 0) {
                tablesToShow.map((item, index) => {
                    console.log(item.tableId);
                    tablesI[item.tableId] = 1;
                });
            } else{
                tablesI=[0,0,0,0,0]
            }

            console.log('tablesI[0]: ', tablesI[0]);
            console.log('tablesI[1]: ', tablesI[1]);
            console.log('tablesI[2]: ', tablesI[2]);
            console.log('tablesI[3]: ', tablesI[3]);

            if (tablesI.length > 0) {
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
            }
            };

          
// End of DataTable settings

        // Initialize state variables 
        const [DBTables, setDBTables] = useState([]);
        
        const [showUserFeaturesTable, setShowUserFeaturesTable] = React.useState(false);
        const [showSkinTonesTable, setShowSkinTonesTable] = React.useState(false);
        const [showHairLengthsTable, setShowHairLengthsTable] = React.useState(false);

        useEffect(() => {

            setDBTables(db_tables_rows);

        }, []);

        return(
            <div>
                databases
                {/* Table that shows all tables on the database */}
                <div className="db-table-container">
                    <DataTable
                        title="hairdress_db Tables"
                        columns={db_tables_columns}
                        data={DBTables} // ToDo: Handle dynamycally the tables fom the DB
                        onSort={handleSort}
                        sortServer
                        progressPending={loading}
                        persistTableHead
                        highlightOnHover
                        selectableRows
                        selectableRowsHighlight
                        onSelectedRowsChange={handleChange}
                    />
                </div>

                
                {/* Users ********************************************** */}

                    { showUsersTable ?
                    <UsersTable
                        setAddUserModalOpen={showAddUserModal}
                        setEditUserModalOpen={showEditUserModal}
                        
                    />
                    :
                    null
                    }

                    <Modal
                        open={isAddUserModalOpen}
                        closeModal={setAddUserModalOpen}
                        isModal={true}
                        size="full"
                        revealStyle={revealStyle}
                    >

                        {/* <AddUsersForm/> */}
                        <AddEntry
                            title="Users"
                            initialFormFields={FormFields.userInitialFields}
                        />

                    </Modal>

                    <Modal
                        open={isEditUserModalOpen}
                        closeModal={setEditUserModalOpen}
                        isModal={true}
                        size="full"
                        revealStyle={revealStyle}
                    >

                        {/* <EditUsersForm/> */}
                        <EditEntry
                            title="Users"
                            initialFormFields={FormFields.userInitialFields}
                            
                        />
                        
                    </Modal>

                {/* end of Users ********************************************** */}
                

                

                {/* Users Features ********************************************** */}
                { showUserFeaturesTable ?
                    <div className="selected-table-container">
                    <UserFeaturesTable
                        setAddUserFeaturesModalOpen={showAddUserFeaturesModal}
                        setEditUserFeaturesModalOpen={showEditUserFeaturesModal}
                    />
                    </div>
                    :
                    null}

                    <Modal
                        open={isAddUserFeaturesModalOpen}
                        closeModal={setAddUserFeaturesModalOpen}
                        isModal={true}
                        size="full"
                        revealStyle={revealStyle}
                    >

                        {/* <AddUsersForm/> */}
                        <AddEntry
                            title="User Features"
                            initialFormFields={FormFields.userFeaturesAddInitialFormFields}
                        />

                    </Modal>

                    <Modal
                        open={isEditUserFeaturesModalOpen}
                        closeModal={setEditUserFeaturesModalOpen}
                        isModal={true}
                        size="full"
                        revealStyle={revealStyle}
                    >

                        {/* <EditUsersForm/> */}
                        <EditEntry
                            title="User Features"
                            initialFormFields={FormFields.userFeaturesAddInitialFormFields}
                            
                        />
                        
                    </Modal>

                {/* end of Users Features ********************************************** */}                    
                

                
                { showSkinTonesTable ?
                    <div className="selected-table-container">
                    <SkinTonesTable/>
                    </div>
                    :
                    null}
                

                

                

                { showHairLengthsTable ?
                    <div className="selected-table-container">
                    <HairLengthsTable/>
                    </div>
                    :
                    null}

                {/* FaceShapes **************************************** */}

                { showFaceShapesTable ?
                    <FaceShapesTable
                        setAddModalOpen={showAddModal}
                        setEditModalOpen={showEditModal}
                    />
                    :
                    null
                }

                <Modal
                    open={isAddModalOpen}
                    closeModal={setAddModalOpen}
                    isModal={true}
                    size="full"
                    revealStyle={revealStyle}
                >

                    {/* <AddFaceShapesForm/> */}
                    <AddEntry
                            title="Face Shapes"
                            initialFormFields={FormFields.faceShapesAddInitialFormFields}
                        />

                </Modal>

                <Modal
                    open={isEditModalOpen}
                    closeModal={setEditModalOpen}
                    isModal={true}
                    size="full"
                    revealStyle={revealStyle}
                >

                    {/* <EditFaceShapesForm/> */}
                    <EditEntry
                        title="Face Shapes"
                        initialFormFields={FormFields.faceShapesEditInitialFormFields}
                    />
                    
                </Modal>

                {/* end of FaceShapes ******************************** */}

                
            </div>
        )

};