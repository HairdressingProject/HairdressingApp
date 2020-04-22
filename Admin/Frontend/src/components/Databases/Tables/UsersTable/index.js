import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

export const UsersTable = () => {
    
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
    ];

    // DataTable settings
    const [loading, setLoading] = useState(false);

    // Logic to handle tabel sorting
    const handleSort = (column, sortDirection) => {
        // simulate server sort
        setLoading(true);
                
        // instead of setTimeout this is where you would handle your API call.
        setTimeout(() => {
          setUsersData(orderBy(usersData, column.selector, sortDirection));
          setLoading(false);
        }, 100);
      };


      const [selectableRows, setSelectableRows] = React.useState(false);
      
// End of DataTable settings

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {


        const fetchUsersTable = async () => {
            const result = await axios(
                'https://localhost:5001/api/Users'
                //'https://128.199.233.190:5001/api/Users'
            );

            console.log("Users Table data:");
            console.log(result.data);
            setUsersData(result.data);
        }


        

        fetchUsersTable();

    }, []);

    return (
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
    );
}