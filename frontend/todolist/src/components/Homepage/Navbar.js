import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, TextField} from '@mui/material';

const Navbar = ({searchQuery, handleSearch}) => {
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
        <nav>
            <div className={"navbar"}>
                <span style={{ margin: "20px"}}>To do App</span>
                <Button style={{ margin: "20px", width: "150px"}} variant="outlined" href="/">Home</Button>
                <Button style={{ margin: "20px", width: "150px"}} variant="outlined" href="/task">Tasks</Button>
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