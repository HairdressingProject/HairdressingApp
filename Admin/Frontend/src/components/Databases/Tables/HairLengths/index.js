import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

export const HairLengthsTable = () => {
    const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
          },
          {
            name: 'Hair Length Name',
            selector: 'hairLengthName',
            sortable: true,
          },
    ]

// DataTable settings
    const [loading, setLoading] = useState(false);

    // Logic to handle tabel sorting
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
      
// End of DataTable settings


    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://localhost:5001/api/HairLengths'
            );
            console.log("Hair Lengths results: ")
            console.log(result.data);
            setData(result.data);
        }
        fetchData();
    }, []);

    return (
        <DataTable
                    title="Hair Lengths"
                    columns={columns}
                    data={data}
                    onSort={handleSort}
                    selectableRows={selectableRows}
                    sortServer
                    progressPending={loading}
                    persistTableHead
                    />
    );
}
