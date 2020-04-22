import React, { useState, useEffect} from 'react';
import './Databases.scss';
//import axios from 'axios';
import { UsersTable } from './Tables/UsersTable';
import { UserFeaturesTable } from './Tables/UserFeaturesTable';
import { SkinTonesTable } from './Tables/SkinTonesTable';
import { FaceShapesTable } from './Tables/FaceShapes';
import { HairLengthsTable } from './Tables/HairLengths';

//import { Button, Table } from 'react-foundation-components';

import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const Databases = () => 
    {

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
                tableId: 1,
                tableName: "Users",
                created: "20/03/2020",
                updated: "28/03/2020"
            },
            {
                tableId: 2,
                tableName: "User Features",
                created: "20/03/2020",
                updated: "22/03/2020"
            },
            {
                tableId: 3,
                tableName: "Face Shapes",
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
          const handleChange = (row) => {
            var tablesToShow = row.selectedRows;
            
            console.log("Selected tables: ");
            console.log(tablesToShow);

            // setSelectedTables(row.SelectedRows);

            // tablesToShow.map((item, index) => {
            //     console.log(item.tableId);
            //     switch(item.tableId) {
            //         case 1:
            //             setShowUsersTable(!showUsersTable);
            //         default:

            //     }

            // });


            setShowUsersTable(!showUsersTable);

            };

          
// End of DataTable settings

        // Initialize state variables 
        const [DBTables, setDBTables] = useState([]);
        
        const [showUsersTable, setShowUsersTable] = React.useState(false);

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

                <div className="selected-table-container">
                    {/* Users table */}

                    { showUsersTable ?
                    <UsersTable
                        //data={usersData}
                    />
                    :
                    null}
                </div>

                <div className="selected-table-container">
                    <UserFeaturesTable/>
                </div>

                <div className="selected-table-container">
                    <SkinTonesTable/>
                </div>

                <div className="selected-table-container">
                    <FaceShapesTable/>
                </div>

                <div className="selected-table-container">
                    <HairLengthsTable/>
                </div>



                    

                    

                    

                    

                    {/* <div className="table-btn-container grid-container">
                        <div className="btn-container grid-x">
                            <div className="cell small-4">
                                <Button className="table-btn grid-x">
                                    <div className="cell small-12">
                                        <span>Add</span>
                                    </div>
                                </Button>
                            </div>

                            <div className="cell small-4">
                                <Button className="table-btn grid-x">
                                    <div className="cell small-12">
                                        <span>Edit</span>
                                    </div>
                                </Button>
                            </div>

                            <div className="cell small-4">
                                <Button className="table-btn grid-x">
                                    <div className="cell small-12">
                                        <span>Delete</span>
                                    </div>
                                </Button>
                            </div>

                        </div>
                    </div> */}

                
            </div>
        )

};