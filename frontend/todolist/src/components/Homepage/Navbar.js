import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, TextField} from '@mui/material';
import {useLocation} from "react-router";

const Navbar = ({searchQuery, handleSearch}) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then((response) => {
                setData(response.data);
            })

            .catch((error) => {
                console.error('Cannot fetch data from server:', error);
                setError('Cannot fetch data from server.');
            });
    }, []);

    return (
        <nav>
            <div className={"navbar"}>
                <span style={{ margin: "20px"}}>To do App</span>
                <Button style={{ margin: "20px", width: "150px"}} variant="outlined" href="/">Home</Button>

                {location.pathname ==="/task" ? (
                        <Button style={{ margin: "20px", width: "150px"}} variant="outlined" href="/task/add">Add Task</Button>
                    ): (<Button style={{ margin: "20px", width: "150px"}} variant="outlined" href="/task">Tasks</Button>)
                }
                <TextField
                    label="Search Tasks"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearch}
                    sx={{ margin: "10px", width: "25%" }}
                />
            </div>
        </nav>
    );
};

export default Navbar;