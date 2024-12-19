import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        <navbar>
            <div className={"navbar"}>

            </div>
        </navbar>
    );
};

export default Homepage;