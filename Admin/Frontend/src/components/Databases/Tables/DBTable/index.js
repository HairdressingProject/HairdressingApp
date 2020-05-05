import React, { useEffect, useState, useCallback, useMemo} from 'react';
import DataTable from 'react-data-table-component'
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../../_actions';
import { resourceNames } from '../../../../_constants';



export const DBTable = ({tableTitle, openAddModal, openEditModal, tableData, tableColumns, editObject}) => {

  //const [state, dispatch] = useReducer(reducer, initialState);

  const [deleted, setDeleted] = useState(false);
  
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

  useEffect(() => {
    if (deleted) {
        //dispatch(resourceActions.getAll(resourceNames.HAIR_STYLES));
        Object
            .values(resourceNames)
            .forEach(resourceNames => {
                dispatch(resourceActions.getAll(resourceNames))
            });
        setDeleted(false);
    }
}, [deleted]);

  const actions = <Button key="add" onClick={() => openAddModal(true)}>Add</Button>;

  const contextActions = useMemo(() => {

    const handleDelete = () => {
      console.log("handleDelete ", selRow);
      selRow.map(row =>{
        switch (tableTitle) {
          case "Users":
              dispatch(resourceActions.deleteResource(resourceNames.USERS, row.id));
              //window.location.reload();
              setTimeout(() => {
                setDeleted(true);
            }, 300);
          break;
      
          case "User Features":
              dispatch(resourceActions.deleteResource(resourceNames.USER_FEATURES, row.id));
              setTimeout(() => {
                setDeleted(true);
            }, 300);
          break;
      
          case "Skin Tones":
              dispatch(resourceActions.deleteResource(resourceNames.SKIN_TONES, row.id));
              setTimeout(() => {
                setDeleted(true);
            }, 300);
          break;
      
          case "Face Shapes":
              dispatch(resourceActions.deleteResource(resourceNames.FACE_SHAPES, row.id));
              setTimeout(() => {
                setDeleted(true);
            }, 300);
          break;
      
          case "Hair Lengths":
              dispatch(resourceActions.deleteResource(resourceNames.HAIR_LENGTHS, row.id));
              setTimeout(() => {
                setDeleted(true);
            }, 300);
          break;
      
          default:
              break;
      }
      }) 

      
    }

    const handleEdit = () => {
      console.log("handleEdit ", selRow[0].id);
      // object to edit
      editObject(selRow[0]);
      // open Edit Modal
      openEditModal(true);
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

  const columns2 = useMemo(() => [...tableColumns,
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
      columns={tableColumns}
      actions={actions}
      contextActions={contextActions}
      onSelectedRowsChange={updateState}
      selectableRows
    />
  )


}