import React, { useState, useEffect} from 'react';
// import axios from 'axios';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

import differenceBy from 'lodash/differenceBy';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

export const DBTable = () => {

    const columns = [
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
        }
    ];

    const data = [
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
    }
                
        // instead of setTimeout this is where you would handle your API call.
    //     setTimeout(() => {
    //       setData(orderBy(data, column.selector, sortDirection));
    //       setLoading(false);
    //     }, 100);
    //   };


      //const [selectableRows, setSelectableRows] = React.useState(false);



        // Logic to handle selected row


        const [showUsersTable2, setShowUsersTable2] = React.useState(false);
        const [showFaceShapesTable2, setShowFaceShapesTable2] = React.useState(false);
        const [showUserFeaturesTable2, setShowUserFeaturesTable2] = React.useState(false);
        const [showSkinTonesTable2, setShowSkinTonesTable2] = React.useState(false);
        const [showHairLengthsTable2, setShowHairLengthsTable2] = React.useState(false);        


        const [activeTable, setActiveTable] = useState(null);


        const handleChange2 = (state) => {

        

        console.log('Selected Rows: ', state.selectedRows)
        var tablesToShow = [];

        state.selectedRows.map((item) => {
            tablesToShow.push(item.tableId);
        });

        console.log('tables to show: ', tablesToShow);

        if (tablesToShow.length > 0) {
            tablesToShow.map((table) => {
                switch (table) {
                    case 0:
                        console.log('show users table');
                        setShowUsersTable(true);
                        break;
                    case 1:
                        console.log('show user features table');
                        setShowUserFeaturesTable(true);
                        break;
                    case 2:
                        console.log('show skin tones table');
                        setShowSkinTonesTable(true);
                        break;
                    case 3:
                        console.log('show face shapes table');
                        setShowFaceShapesTable(true);
                        break;
                    case 4:
                        console.log('show hair lengths table');
                        setShowHairLengthsTable(true);
                        break;
                }
            });
        }

        
        };      
      
// End of DataTable settings

    return (
        <div>
            databases
            {/* Table that shows all tables on the database */}
            <div className="db-table-container">
                {/* <DataTable
                    title="hairdress_db Tables"
                    columns={columns}
                    data={data} // ToDo: Handle dynamycally the tables fom the DB
                    onSort={handleSort}
                    sortServer
                    progressPending={loading}
                    persistTableHead
                    selectableRows
                    selectableRowsHighlight
                    onSelectedRowsChange={handleChange}

                /> */}

                <DataTable
                    title="DB Tables"
                    columns={columns}
                    data={data}
                    selectableRows
                    Clicked
                    onSelectedRowsChange={handleChange2}
                />



            </div>
        </div>

    );

}