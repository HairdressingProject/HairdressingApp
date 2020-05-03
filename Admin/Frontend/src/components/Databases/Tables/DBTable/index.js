import React, { useState, useEffect, useCallback, useMemo, useReducer} from 'react';
import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';
import differenceBy from 'lodash/differenceBy';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';
import table from 'react-foundation-components/lib/table';

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../../_actions';
import { resourceNames } from '../../../../_constants';



export const DBTable = ({tableTitle, openAddModal, openEditModal, tableData, tableColumns}) => {

  //const [state, dispatch] = useReducer(reducer, initialState);
  
  const [selRow, setSelRow] = useState(null);
  const [thing, setThing] = useState(null);
  const dispatch = useDispatch();

  const [toggleEditBtn, setToggleEditBtn] = useState(true);

  const handleAction = value => setThing(value);

  const updateState = useCallback(state => {
    console.log("Selected row: ", state.selectedRows)
    setSelRow(state.selectedRows);

    // The Edit button is enabled only if one item is selected
    if (state.selectedRows.length === 0 || state.selectedRows.length === 1) {
      setToggleEditBtn(true);
    } else {
        setToggleEditBtn(false);
    }

  });

  const actions = <Button key="add" onClick={() => openAddModal(true)}>Add</Button>;

  const contextActions = useMemo(() => {

    const handleDelete = () => {
      console.log("handleDelete ", selRow);
      selRow.map(row =>{
        dispatch(resourceActions.deleteResource(resourceNames.FACE_SHAPES,  row.id));
      }) 

      
    }

    const handleEdit = () => {
      console.log("handleEdit ", selRow[0].id);
      // open Edit Modal
    }    

    return(
      <div>
      <Row className="table-btn-container">
          <Column small={6} className="edit-container">
              { toggleEditBtn ? 
              <Button key="edit" onClick={handleEdit} style={{ backgroundColor: 'yellow', color: 'black' }}>Edit</Button>
              :
              null}
              {/* <Button key="edit" onClick={handleEdit} style={{ backgroundColor: 'yellow', color: 'black' }}>Edit</Button> */}
          </Column>
          <Column small={6} className="delete-container">
              <Button key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</Button>
          </Column>
      </Row>
  </div>      
    );
  });

  const columnsPow = useMemo(() => [...tableColumns,
      {
        cell: () => <Button raised primary onClick={handleAction}>Action</Button>,
        ignoreRowClick: true,
        allOverflow: true,
        button: true
      }    
  ]);

  return (
    <DataTable
      title={tableTitle}
      data={tableData}
      columns={columnsPow}
      actions={actions}
      contextActions={contextActions}
      onSelectedRowsChange={updateState}
      selectableRows
    />
  )


}