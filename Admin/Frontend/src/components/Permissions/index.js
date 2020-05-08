import React, { useState, useEffect, useMemo} from 'react';

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
    const [toggleBtn, setToggleBtn] = useState(true);
    const [selectedRow, setSelectedRow] = useState(null);

    // ***************** Data Table settings

    const handleSelectedrow = (row) => {
        console.log("Selected row: ", row)
        setSelectedRow(row);
        if(row.selectedCount > 1)
        {
            setToggleBtn(false);
        }
        else {
            setToggleBtn(true);
        }
        console.log("Toggle button ",toggleBtn);
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

    const contextActions = useMemo(() => {
        const handleAction = () => {
            console.log("handling action", selectedRow);
            // Open change user role modal

        }

        return(
            <div>
                <Column small={6} className="delete-container">
                    <Button key="action" onClick={handleAction} primary disabled={!toggleBtn}>Change Role</Button>
                </Column>
            </div>
        );
    });


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
                contextActions={contextActions}
            />
         
        </div>
    );

};

