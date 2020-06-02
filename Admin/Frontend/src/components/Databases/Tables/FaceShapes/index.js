import React, { useState } from 'react';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';
import differenceBy from 'lodash/differenceBy';

export const FaceShapesTable = ({ openAddModal, openEditModal, tableData }) => {

    const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
        },
        {
            name: 'Shape Name',
            selector: 'shapeName',
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
        //console.log("state.selectedRows: ", state.selectedRows);
        //console.log("selectedRows: ", selectedRows);
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

    const actions = <button key="add" onClick={() => openAddModal(true)}>Add</button>;

    // const handleAdd = () => {
    //     // Show add form
    //     // POST method
    //     console.log("handleAdd");

    // };

    const contextActions = React.useMemo(() => { //useState() ?

        // console.log('selected rows length: ', selectedRows.length);

        // if (selectedRows.length == 0 || selectedRows.length == 1) {
        //     setToggleEditBtn(true);
        //     console.log("Should be true")
        // } else {
        //     setToggleEditBtn(false);
        //     console.log("should be false")
        // }
        // console.log(toggleEditBtn);

        const handleDelete = () => {

            console.log("handleDelete row: ", selectedRows);
            // selectedRows.map(item => {
            //     console.log(item);
            // })

            // state.selectedRows.map(r => console.log("selected rows 2: ", r.id));

            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.shapeName)}?`)) {
                setToggleCleared(!toggleCleared);
                setData(differenceBy(data, selectedRows, 'id'));
                // DELETE Method API
                // ...
            }
        };

        // const handleEdit = () => {
        //     console.log("handleEdit row: ", selectedRows.length);
        //     selectedRows.map(item => {
        //         console.log(item);
        //     })
        //     // Show Edit form
        //     // POST Method API
        //     // ...
        // };

        return (
            <div>
                <div className="table-btn-container">
                    <div className="edit-container cell small-6">
                        {toggleEditBtn ?
                            <div key="edit" onClick={() => openEditModal(true)} style={{ backgroundColor: 'yellow', color: 'black' }}>Edit</div>
                            :
                            null}
                    </div>

                    <div className="delete-container cell small-6">
                        <div key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</div>
                    </div>

                </div>

            </div>

        );

    }, [data, selectedRows, toggleCleared, openEditModal, toggleEditBtn]
    );


    return (
        <>
            <DataTable
                title="Face Shapes"
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
            <div className="btn-container">
                <div className="btn-add cell small-12">
                    {/* <Button onClick={handleAdd}>Add</Button> */}
                    {/* <Button onClick={() => setAddModalOpen(true)}>Add</Button> */}

                </div>
            </div>
        </>
    );
}
