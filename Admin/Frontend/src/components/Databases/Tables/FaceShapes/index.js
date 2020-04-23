import React, { useState, useEffect} from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';
import differenceBy from 'lodash/differenceBy';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

export const FaceShapesTable = ({setAddModalOpen}) => {

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


      const [selectableRows, setSelectableRows] = React.useState(false);
      
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



        if (state.selectedRows.length == 0 || state.selectedRows.length == 1) {
            setToggleEditBtn(true);
            console.log("Should be true")
        } else {
            setToggleEditBtn(false);
            console.log("should be false")
        }
        console.log(toggleEditBtn);

      }, []);

    const actions = <Button key="add" onClick={() => setAddModalOpen(true)}>Add</Button>;

    const handleAdd = () => {
        // Show add form
        // POST method
        console.log("handleAdd");

    };

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
            selectedRows.map(item => {
                console.log(item);
            })

            // state.selectedRows.map(r => console.log("selected rows 2: ", r.id));
            
            if (window.confirm(`Are you sure you want to delete:\r ${selectedRows.map(r => r.shapeName)}?`)) {
            setToggleCleared(!toggleCleared);
            setData(differenceBy(data, selectedRows, 'id'));
            // DELETE Method API
            // ...
            }
        };

        const handleEdit = () => {
            console.log("handleEdit row: ", selectedRows.length);
            selectedRows.map(item => {
                console.log(item);
            })
            // Show Edit form
            // POST Method API
            // ...
        };
    
        return (
            <div>
                <Row className="table-btn-container">
                    <Column small={6} className="edit-container">
                        { toggleEditBtn ? 
                        <Button key="edit" onClick={handleEdit} style={{ backgroundColor: 'yellow', color: 'black' }} icon>Edit</Button>
                        :
                        null}
                    </Column>

                    <Column small={6} className="delete-container">
                        <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }} icon>Delete</Button>
                    </Column>
                
                </Row>
                
            </div>
            
        );

        }, [data, selectedRows, toggleCleared]
    );

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                'https://localhost:5001/api/FaceShapes'
            );
            console.log("Face Shapes results: ")
            console.log(result.data);
            setData(result.data);
        }
        fetchData();
    }, []);

    return (
        <div className="selected-table-container">
        <DataTable
            title="Face Shapes"
            columns={columns}
            data={data}
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
            </div>
    );
}
