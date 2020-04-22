import React, { useState, useEffect} from 'react';
import './Databases.scss';
import axios from 'axios';

import { Button, Table } from 'react-foundation-components';

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

        const usersTableColumns = [
            {
                name: 'Id',
                selector: 'id',
                sortable: true,
              },
              {
                name: 'User Name',
                selector: 'userName',
                sortable: true,
              },
              {
                name: 'First Name',
                selector: 'firstName',
                sortable: true,
              },
              {
                name: 'Last Name',
                selector: 'lastName',
                sortable: true,
              },
              {
                name: 'User Email',
                selector: 'userEmail',
                sortable: true,
              },
              {
                name: 'User role',
                selector: 'userRole',
                sortable: true,
              },
        ]

        const userFeaturesTableColumns = [
            {
                name: 'Id',
                selector: 'id',
                sortable: true
            },
            {
                name: 'User Id',
                selector: 'userId',
                sortable: true
            },
            {
                name: 'Faceshape Id',
                selector: 'faceShapeId',
                sortable: true
            },
            {
                name: 'Skin Tone Id',
                selector: 'skinToneId',
                sortable: true
            },
            {
                name: 'Hair Style Id',
                selector: 'hairStyleId',
                sortable: true
            },
            {
                name: 'Hair Length Id',
                selector: 'hairLengthId',
                sortable: true
            },
        ];

// DataTable settings
        const [loading, setLoading] = useState(false);
        //const [items, setData] = useState(data);

        // Logic to handle tabel sorting
        const handleSort = (column, sortDirection) => {
            // simulate server sort
            setLoading(true);
        
            
            // instead of setTimeout this is where you would handle your API call.
            setTimeout(() => {
              setDBTables(orderBy(DBTables, column.selector, sortDirection));
              setUsersData(orderBy(usersData, column.selector, sortDirection));
              setUserFeaturesData(orderBy(userFeaturesData, column.selector, sortDirection));


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

          const [selectableRows, setSelectableRows] = React.useState(false);
          
// End of DataTable settings

        // Initialize state variables 
        const [DBTables, setDBTables] = useState([]);
        const [usersData, setUsersData] = useState([]);
        const [showUsersTable, setShowUsersTable] = React.useState(false);

        const [userFeaturesData, setUserFeaturesData] = useState([]);

        const [selectedTables, setSelectedTables] = useState([]);

        

        useEffect(() => {

            setDBTables(db_tables_rows);

            const fetchUsersTable = async () => {
                const result = await axios(
                    'https://localhost:5001/api/Users'
                    //'https://128.199.233.190:5001/api/Users'
                );

                console.log("Users Table data:");
                console.log(result.data);
                setUsersData(result.data);
            }

            const fetchUserFeaturesTable = async () => {
                const result = await axios(
                    'https://localhost:5001/api/UserFeatures'
                );

                console.log("User Features Table data:");
                console.log(result.data);
                setUserFeaturesData(result.data);
            }

            

            fetchUsersTable();
            fetchUserFeaturesTable();

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
                    <DataTable
                    title="Users"
                    columns={usersTableColumns}
                    data={usersData}
                    onSort={handleSort}
                    selectableRows={selectableRows}
                    sortServer
                    progressPending={loading}
                    persistTableHead
                    />
                    : 
                    null }


                    {/* User Features table */}
                    <DataTable
                        title="User Features"
                        columns={userFeaturesTableColumns}
                        data={userFeaturesData}
                        onSort={handleSort}
                        selectableRows={selectableRows}
                        sortServer
                        progressPending={loading}
                        persistTableHead
                        />                    

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



                {/* <div className="database-container">
                    <Table scroll>
                        <thead>
                            <tr>
                                <th>Table Name</th>
                                <th>Created</th>
                                <th>Last Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Users</td>
                                <td>20/03/2020</td> 
                                <td>25/03/2020</td>                               
                                
                            </tr>
                            <tr>
                                <td>User Features</td>
                                <td>20/03/2020</td>
                                <td>25/03/2020</td>
                            </tr>
                            <tr>
                                <td>Face Shapes</td>                                
                                <td>25/03/2020</td>
                                <td>27/03/2020</td>
                            </tr>                            
                        </tbody>
                    </Table>

                </div>

                <div className="table-container">
                    <Table scroll>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>User Name</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>User Email</th>
                                <th>User Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.userName}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.userEmail}</td>
                                    <td>{item.userRole}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>


                </div> */}




            </div>
        )

};