import React from 'react';
import Navbar from "../components/Homepage/Navbar";
import Tasks from "../components/Tasks";

const Home = () => {
    return (
        <div className="Homepage">
            <Navbar/>
            <Tasks/>
        </div>
    );
}
export default Home;