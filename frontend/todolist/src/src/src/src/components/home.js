import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';

const Navbar = () => {
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
        <navbar>
            <div className={"navbar"}>
                <Button style={{ margin: "20px" }} variant="outlined" href="/task">Tasks</Button>
            </div>
        </navbar>
    );
};

export default Navbar;