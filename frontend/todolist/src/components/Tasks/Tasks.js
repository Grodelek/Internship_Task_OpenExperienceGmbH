import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Navbar from "../Homepage/Navbar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    const deleteTask = (id) => {
        axios.delete(`http://localhost:8080/task/delete/${id}`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            })
            .catch(error => console.error('Error deleting task:', error));
    };
    const markDone = async (id) => {
            const response = await fetch(`http://localhost:8080/task/done/${id}`, {method: "POST"});
            return response;
    }
    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Task Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'done', headerName: '', width: 150, renderCell: (params) => (
                <FontAwesomeIcon className={"faCheckDone"} icon={faCheck}
                    onClick={async () => {
                        const response = markDone(params.row.id);
                    if(response.ok){
                    alert("Task Done");
                        }
                    if(response.error){
                        alert("Can't mark task as done.");
                    }}
                }
                />
            ),
        },
        {
            field: 'delete', headerName: '', width: 150, renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteTask(params.row.id)}>
                    Delete
                </Button>
            ),
        },
    ];

    useEffect(() => {
        axios.get('http://localhost:8080/task')
            .then(response => setTasks(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={"centered"}>
           <Navbar></Navbar>
            <div className={"data-grid-wrapper"} style={{ height: 400, width: '50%' }}>
                <DataGrid
                    rows={tasks}
                    columns={columns}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    sx={{ border: '1px solid #ccc', backgroundColor: 'rgba(209, 212, 230, 0.8)' }}
                />
            </div>
        </div>
    );
};

export default Tasks;
