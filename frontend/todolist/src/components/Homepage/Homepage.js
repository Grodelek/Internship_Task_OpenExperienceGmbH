import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "./Navbar";
import {Box, Button, Typography} from "@mui/material";

const Homepage = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8080/')
            .then((response) => {
                setData(response.data);
            })

            .catch((error) => {
                console.error('Błąd podczas pobierania danych:', error);
                setError('Nie udało się pobrać danych z serwera.');
            });
    }, []);
    return (
        <div className={"centered"}>
            <Navbar></Navbar>
            <Box sx={{ textAlign: 'center', padding: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Welcome in To-Do App!
                </Typography>
                <Typography style={{margin: "2vh"}} variant="h6" gutterBottom>
                    Manage your Daily Tasks in fast and easy way!
                </Typography>
                <Button variant="contained" sx={{backgroundColor: "#408EC6", marginRight: 2}} href="/task">
                    View Tasks
                </Button>
                <Button sx={{backgroundColor: "#7A2048"}} variant="contained" href="/task/add">
                    Add Task
                </Button>
            </Box>
        </div>
    );
};

export default Homepage;