import './App.css';
import React, { Component }  from 'react';
import Home from "./components/Homepage/Navbar";
import Tasks from "./components/Tasks";
import { BrowserRouter as Router, Route, Routes } from 'react-router';

function App() {
    return (
        <div className="Home">
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/task" element={<Tasks />} />
                </Routes>
            </Router>
        </div>
    );
}


export default App;