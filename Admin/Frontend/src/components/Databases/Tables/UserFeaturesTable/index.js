import React, { useState } from 'react';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

import differenceBy from 'lodash/differenceBy';

export const UserFeaturesTable = ({ openAddModal, openEditModal, tableData }) => {
    const columns = [
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
            setData(orderBy(data, column.selector, sortDirection));
            setLoading(false);
        }, 100);
    };


    // End of DataTable settings

    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = React.useState(false);
    const [toggleEditBtn, setToggleEditBtn] = useState(true);

    const [data, setData] = useState([]);

    const handleRowSelected = React.useCallback(state => {
        setSelectedRows(state.selectedRows);
        console.log("state.selectedRows: ", state.selectedRows);
        console.log("selectedRows: ", selectedRows);



        if (state.selectedRows.length === 0 || state.selectedRows.length === 1) {
            setToggleEditBtn(true);
            console.log("Should be true")
        } else {
            setToggleEditBtn(false);
            console.log("should be false")
        }
        console.log(toggleEditBtn);

    }, [selectedRows, toggleEditBtn]);

    const actions = <div key="add" onClick={() => openAddModal(true)}>Add</div>;


    const contextActions = React.useMemo(() => { //useState() ?


        const handleDelete = () => {

            // console.log("handleDelete row: ", selectedRows);
            // selectedRows.map(item => {
            //     console.log(item);
            // })


            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.id)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(data, selectedRows, 'id'));
                // DELETE Method API
                // ...
            }
        };



        return (
            <div>
                <div className="table-btn-container grid-x">
                    <div className="edit-container cell small-6">
                        {toggleEditBtn ?
                            <button key="edit" onClick={() => openEditModal(true)} style={{ backgroundColor: 'yellow', color: 'black' }}>Edit</button>
                            :
                            null}
                    </div>

                    <div className="delete-container cell small-6">
                        <button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</button>
                    </div>

                </div>

            </div>

        );

    }, [data, selectedRows, toggleCleared, openEditModal, toggleEditBtn]
    );




    return (
        <DataTable
            title="User Features"
            columns={columns}
            data={tableData}
            onSort={handleSort}
            selectableRows
            actions={actions}
            onSelectedRowsChange={handleRowSelected}
            contextActions={contextActions}
            clearSelectedRows={toggleCleared}
            sortServer
            progressPending={loading}
            persistTableHead
        />
    );
}