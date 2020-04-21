import React, { useState, useEffect} from 'react';
import axios from 'axios';

import { Table } from 'react-foundation-components';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

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
                            <th>User id</th>
                            <th>User Name</th>
                            <th>User First Name</th>
                            <th>User Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.userName}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>




                
            </div>
        )

};