import React, { useEffect, useState } from 'react';
import axios from "axios";
import {Button} from "@mui/material";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/task')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (

        <div className={"centered"}>
            <div className={"navbar"}>
                <Button style={{ margin: "20px" }} variant="outlined" href="/">Home</Button>
            </div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.name} - {task.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Tasks;