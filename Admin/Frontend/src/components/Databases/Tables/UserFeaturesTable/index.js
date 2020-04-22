import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

export const UserFeaturesTable = () => {
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

    // Logic to handle tabel sorting
    const handleSort = (column, sortDirection) => {
        // simulate server sort
        setLoading(true);
                
        // instead of setTimeout this is where you would handle your API call.
        setTimeout(() => {
          setUserFeaturesData(orderBy(userFeaturesData, column.selector, sortDirection));
          setLoading(false);
        }, 100);
      };


      const [selectableRows, setSelectableRows] = React.useState(false);
      
// End of DataTable settings

    const [userFeaturesData, setUserFeaturesData] = useState([]);

    useEffect(() => {


        const fetchUserFeaturesTable = async () => {
            const result = await axios(
                'https://localhost:5001/api/UserFeatures'
            );

            console.log("User Features Table data:");
            console.log(result.data);
            setUserFeaturesData(result.data);
        }


        

        fetchUserFeaturesTable();

    }, []);

    return (
        <DataTable
                    title="Users"
                    columns={userFeaturesTableColumns}
                    data={userFeaturesData}
                    onSort={handleSort}
                    selectableRows={selectableRows}
                    sortServer
                    progressPending={loading}
                    persistTableHead
                    />
    );
}