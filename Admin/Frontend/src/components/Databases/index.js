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
import {
    FormField,
    FormFieldInput,
    FormFieldLabel,
    FormFieldError,
    FormFieldInline
} from 'react-foundation-components/lib/forms';
import { FormWithValidation } from '../Forms/FormWithValidation';
import { AddFaceShapesForm } from './AddEntry/FaceShapes';

export const Databases = () => 
    {
        // *************************** Face Shapes Setup
        // Add Modal Setup
        const addFaceShapeRevealStyle = {
            'backgroundColor': 'rgba(12, 24, 83, 0.62)'
        };
        const [isAddModalOpen, setAddModalOpen] = useState(false);

        const showAddModal = status => {
            setAddModalOpen(status);
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
        
        const [showUsersTable, setShowUsersTable] = React.useState(false);
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

                
                    {/* Users table */}

                    { showUsersTable ?
                    <div className="selected-table-container">
                    <UsersTable/>
                    </div>
                    :
                    null}
                

                
                { showUserFeaturesTable ?
                    <div className="selected-table-container">
                    <UserFeaturesTable/>
                    </div>
                    :
                    null}
                

                
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

                {/* FaceShapes ******************************************************************** */}

                { showFaceShapesTable ?
                    <FaceShapesTable
                        setAddModalOpen={showAddModal}
                    />
                    :
                    null
                }


                <Modal
                    open={isAddModalOpen}
                    closeModal={setAddModalOpen}
                    isModal={true}
                    size="full"
                    revealStyle={addFaceShapeRevealStyle}
                >

                    <AddFaceShapesForm/>
                </Modal>

                {/* FaceShapes ******************************************************************** */}

                
            </div>
        )

};