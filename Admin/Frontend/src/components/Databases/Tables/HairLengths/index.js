import React, { useState, useEffect} from 'react';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

import differenceBy from 'lodash/differenceBy';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

export const HairLengthsTable = ({openAddModal, openEditModal, tableData}) => {
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

    const actions = <Button key="add" onClick={() => openAddModal(true)}>Add</Button>;

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
                <Row className="table-btn-container">
                    <Column small={6} className="edit-container">
                        { toggleEditBtn ? 
                        <Button key="edit" onClick={() => openEditModal(true)} style={{ backgroundColor: 'yellow', color: 'black' }}>Edit</Button>
                        :
                        null}
                    </Column>
  
                    <Column small={6} className="delete-container">
                        <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</Button>
                    </Column>
                
                </Row>
                
            </div>
            
        );
  
        }, [data, selectedRows, toggleCleared, openEditModal, toggleEditBtn]
    );


    return (
        <>
          <DataTable
            title="Hair Lengths"
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
            <Row className="btn-container">
              <Column small={12} className="btn-add">
                  {/* <Button onClick={handleAdd}>Add</Button> */}
                  {/* <Button onClick={() => setAddModalOpen(true)}>Add</Button> */}

              </Column>
          </Row>
        </>
    );
}
