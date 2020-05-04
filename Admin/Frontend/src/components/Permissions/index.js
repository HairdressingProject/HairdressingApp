import React, { useState, useEffect} from 'react';

import DataTable from 'react-data-table-component'
import { orderBy } from 'lodash';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../_actions';
import { Button } from 'react-foundation-components/lib/button';
import { Row, Column } from 'react-foundation-components/lib/grid';

import * as DataColumns from '../Databases/Tables/DBTable/DataColumns'

export const Permissions = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [tableData, setTableData] = useState([]);

    // ***************** Data Table settings

    const handleSelectedrow = (row) => {
        console.log("Selected row: ", row)
    }

    // Fetch Data ********************
    const [localUsers, setLocalUsers] = useState(null);
    const dispatch = useDispatch();
    const users = useSelector(state => state.users);

    // componentDidMount()
    useEffect(() => {
        dispatch(userActions.getAll())
    }, []);

    // componentDidUpdate()
    useEffect(() => {
        setLocalUsers({ users })
    }, [users]);

    useEffect(() => {
    }, [localUsers]);

    if(localUsers && localUsers.users && localUsers.users.items && localUsers.users.items.users) {
        console.log("localUSers");
        console.dir(localUsers.users.items.users);
        //setTableData(localUsers.users.items.users)
        var usersTableData = localUsers.users.items.users;
    }


    // if (localResources && localResources.resources) {
    //     if(localResources.resources.users && localResources.resources.users.items && localResources.resources.users.items.users) {
    //         setTableData(localResources.resources.users.items.users);
    //     }
    // }


    return (
        <div>
            Permissions
            <DataTable
                title="Users"
                columns={DataColumns.usersTableColumns}
                data={usersTableData}
                selectableRows
                onSelectedRowsChange={handleSelectedrow}
            />
            <Row className="btn-container">
              <Column small={12} className="btn-role">
                  {/* <Button onClick={handleAdd}>Add</Button> */}
                  <Button onClick={() => console.log("clicked")}>Change Role</Button>

              </Column>
          </Row>            
        </div>
    );

};

