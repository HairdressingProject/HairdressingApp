import React, { useState, useEffect} from 'react';
import './Databases.scss';
import axios from 'axios';

import { Button, Table } from 'react-foundation-components';

import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const Databases = () => 
    {
        const columns = [
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

// DataTable settings
        const [loading, setLoading] = useState(false);
        //const [items, setData] = useState(data);

        const handleSort = (column, sortDirection) => {
            // simulate server sort
            setLoading(true);
        
            // instead of setTimeout this is where you would handle your API call.
            setTimeout(() => {
              setData(orderBy(data, column.selector, sortDirection));
              setLoading(false);
            }, 100);
          };

          const [selectableRows, setSelectableRows] = React.useState(false);
          
// DataTable settings


        const [data, setData] = useState([]);

        useEffect(async () => {
            const result = await axios(
                //'https://128.199.233.190:5001/api/Users'
                'https://localhost:5001/api/Users'
            );
            console.log("Result:");
            console.log(result);

            console.log("Result.data:");
            console.log(result.data);
            
            
            setData(result.data);
            setSelectableRows(!selectableRows)


        }, []);

        return(
            <div>
                databases

                <DataTable
                    title="Users"
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    selectableRows={selectableRows}
                    sortServer
                    progressPending={loading}
                    persistTableHead
                    />


                <div className="database-container">
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

                    <div className="table-btn-container grid-container">
                        <div className="btn-container grid-x">
                            <div className="cell small-4">
                                <Button class="table-btn grid-x">
                                    <div className="cell small-12">
                                        <span>Add</span>
                                    </div>
                                </Button>
                            </div>

                            <div className="cell small-4">
                                <Button class="table-btn grid-x">
                                    <div className="cell small-12">
                                        <span>Edit</span>
                                    </div>
                                </Button>
                            </div>

                            <div className="cell small-4">
                                <Button class="table-btn grid-x">
                                    <div className="cell small-12">
                                        <span>Delete</span>
                                    </div>
                                </Button>
                            </div>


                        </div>


                    </div>
                </div>




            </div>
        )

};