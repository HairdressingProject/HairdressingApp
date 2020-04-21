import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { Table } from 'react-foundation-components';

//axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const Databases = () => 
    {
        
        const [data, setData] = useState([]);

        useEffect(async () => {
            const result = await axios(
                //'https://128.199.233.190:5001/api/Users'
                'https://localhost:5001/api/Users'
            );
            console.log("Result:");
            console.log(result);

            console.log("Result.data:");
            console.log(result.data);
            
            
            setData(result.data);
        }, []);

        return(
            <div>
                databases

                <Table scroll>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>User Email</th>
                            <th>User Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.userName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.userEmail}</td>
                                <td>{item.userRole}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>



            </div>
        )

};