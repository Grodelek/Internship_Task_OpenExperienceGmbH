import './App.css';
import React, { Component }  from 'react';
import Tasks from "./components/Tasks/Tasks";
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import Homepage from "./components/Homepage/Homepage";

function App() {
    return (
        <div className="Home">
            <Router>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/task" element={<Tasks />} />
                </Routes>
            </Router>
        </div>
    );
}


export default App;