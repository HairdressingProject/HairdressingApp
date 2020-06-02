import React, { useState } from 'react';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';
import differenceBy from 'lodash/differenceBy';

export const UsersTable = ({ openAddModal, openEditModal, tableData }) => {

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


  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [toggleEditBtn, setToggleEditBtn] = useState(true);

  const [data, setData] = useState([]);

  const handleRowSelected = React.useCallback(state => {
    setSelectedRows(state.selectedRows);
    console.log("state.selectedRows: ", state.selectedRows);
    console.log("selectedRows: ", selectedRows);

    // The Edit button is enabled only if one item is selected
    if (state.selectedRows.length === 0 || state.selectedRows.length === 1) {
      setToggleEditBtn(true);
    } else {
      setToggleEditBtn(false);
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


    const handleDelete = () => {

      console.log("handleDelete row: ", selectedRows);
      // selectedRows.map(item => {
      //     console.log(item);
      // })


      if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.userName)}?`)) {
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
        <div className="table-btn-container grid-x">
          <div small={6} className="edit-container cell small-6">
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
    <>
      <DataTable
        title="Users"
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
      <button className="btn-container grid-x">
        <div className="btn-add cell small-12">
          {/* <Button onClick={handleAdd}>Add</Button> */}
          {/* <Button onClick={() => setAddModalOpen(true)}>Add</Button> */}

        </div>
      </button>
    </>
  );
}