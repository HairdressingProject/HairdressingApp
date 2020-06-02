import React, { useEffect, useState, useCallback, useMemo } from 'react';
import DataTable from 'react-data-table-component'

import { useDispatch, useSelector } from 'react-redux';
import { resourceActions } from '../../../../_actions';
import { resourceNames } from '../../../../_constants';



export const DBTable = ({ tableTitle, openAddModal, openEditModal, tableData, tableColumns, editObject }) => {

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

  const actions = <button key="add" onClick={() => openAddModal(true)}>Add</button>;

  const contextActions = useMemo(() => {

    const handleDelete = () => {
      console.log("handleDelete ", selRow);
      selRow.map(row => {
        switch (tableTitle) {
          case "Users":
            if (window.confirm(`Are you sure you want to delete:\r Id: ${row.id} \r UserName: ${row.userName}?`)) {
              dispatch(resourceActions.deleteResource(resourceNames.USERS, row.id));
              setTimeout(() => {
                setDeleted(true);
              }, 300)

            };
            break;

          case "User Features":
            if (window.confirm(`Are you sure you want to delete:\r Id: ${row.id} \r UserId: ${row.userId}?`)) {
              dispatch(resourceActions.deleteResource(resourceNames.USER_FEATURES, row.id));
              setTimeout(() => {
                setDeleted(true);
              }, 300);
            };
            break;

          case "Skin Tones":
            if (window.confirm(`Are you sure you want to delete:\r Id: ${row.id} \r SkinToneName: ${row.skinToneName}?`)) {
              dispatch(resourceActions.deleteResource(resourceNames.SKIN_TONES, row.id));
              setTimeout(() => {
                setDeleted(true);
              }, 300);
            };
            break;

          case "Face Shapes":
            if (window.confirm(`Are you sure you want to delete:\r Id: ${row.id} \r ShapeName: ${row.shapeName}?`)) {
              dispatch(resourceActions.deleteResource(resourceNames.FACE_SHAPES, row.id));
              setTimeout(() => {
                setDeleted(true);
              }, 300);
            };
            break;

          case "Hair Lengths":
            if (window.confirm(`Are you sure you want to delete:\r Id: ${row.id} \r HairLengthName: ${row.hairLengthName}?`)) {
              dispatch(resourceActions.deleteResource(resourceNames.HAIR_LENGTHS, row.id));
              setTimeout(() => {
                setDeleted(true);
              }, 300);
            };
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

    return (
      <div>
        <div className="table-btn-container">
          <div className="edit-container cell small-6">

            <div key="edit" onClick={handleEdit} style={{ backgroundColor: 'yellow', color: 'black' }} disabled={!toggleEditBtn}>Edit</div>

            {/* <Button key="edit" onClick={handleEdit} style={{ backgroundColor: 'yellow', color: 'black' }}>Edit</Button> */}
          </div>
          <div className="delete-container cell small-6">
            <div key="delete" onClick={handleDelete} style={{ backgroundColor: 'red' }}>Delete</div>
          </div>
        </div>
      </div>
    );
  });

  const columns2 = useMemo(() => [...tableColumns,
  {
    cell: () => <button onClick={handleAction}>Action</button>,
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