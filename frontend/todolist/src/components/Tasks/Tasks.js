import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import Navbar from "../Homepage/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';
import ProgressBar from "./ProgressBar";

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const deleteTask = (id) => {
        axios.delete(`http://localhost:8080/task/delete/${id}`)
            .then(() => {
                setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
                setFilteredTasks(prevTasks => prevTasks.filter(task => task.id !== id));
            })
            .catch(error => console.error('Error deleting task:', error));
    };

    const updateTask = (id) => {
        navigate(`/task/update/${id}`);
    };

    const markDone = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/task/done/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Failed to mark task as done: ${errorMessage}`);
            }
            setTasks((prevTasks) => {
                return prevTasks.map((task) => {
                    if (task.id === id) {
                        return { ...task, status: task.status === "DONE" ? "UNDONE" : "DONE" };
                    }
                    return task;
                });
            });
            setFilteredTasks((prevTasks) => {
                return prevTasks.map((task) => {
                    if (task.id === id) {
                        return { ...task, status: task.status === "DONE" ? "UNDONE" : "DONE" };
                    }
                    return task;
                });
            });
        } catch (error) {
            console.error('Error marking task as done:', error);
            throw error;
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Task Name', width: 200 },
        { field: 'description', headerName: 'Description', width: 200 },
        {
            field: 'status', headerName: 'Status', width: 150, renderCell: (params) => (
                <FontAwesomeIcon className={params.row.status === "DONE" ? "faCheckDone" : "faCross"}
                                 icon={params.row.status === "DONE" ? faCheck : faTimes}
                                 onClick={async () => {
                                     await markDone(params.row.id);
                                     if (params.row.status === "DONE") {
                                         alert(`Task marked as Undone.`);
                                     } else {
                                         alert(`Task marked as Done.`);
                                     }
                                 }} />
            ),
        },
        {
            field: 'update', headerName: '', width: 150, renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="success"
                    onClick={() => updateTask(params.id)}
                >Update</Button>
            ),
        },
        {
            field: 'delete', headerName: '', width: 150, renderCell: (params) => (
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteTask(params.row.id)}
                >Delete</Button>
            ),
        },
    ];

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query === "") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(task =>
                task.name.toLowerCase().includes(query.toLowerCase()) ||
                task.description.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredTasks(filtered);
        }
    };

    useEffect(() => {
        axios.get('http://localhost:8080/task')
            .then(response => {
                setTasks(response.data);
                setFilteredTasks(response.data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className={"centered"}>
            <Navbar searchQuery={searchQuery} handleSearch={handleSearch} />
            <div className={"data-grid-wrapper"} style={{height: 400, width: '50%'}}>
                <DataGrid
                    rows={filteredTasks}
                    columns={columns}
                    pageSize={5}
                    sx={{border: '1px solid #ccc', backgroundColor: 'rgba(209, 212, 230, 0.8)'}}
                />
                <ProgressBar tasks={tasks}/>
            </div>
        </div>
    );
};

export default Tasks;