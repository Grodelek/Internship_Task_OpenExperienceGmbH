import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Box, TextField, Button } from "@mui/material";
import Navbar from "../Homepage/Navbar";

function CreateTask() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/task/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Task added successfully!");
                setFormData({ name: "", description: "" });
                navigate("/task");
            } else {
                alert("Failed to add task!");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Navbar/>
            <Box
                sx={{
                    backgroundColor: "rgba(67,85,202,0.75)",
                    width: "400px",
                    height: "auto",
                    borderRadius: "10px",
                    margin: "auto",
                    padding: "20px",
                    marginTop: "30px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        sx={{backgroundColor: "white" , borderRadius: "10px"}}
                        label="Name"
                        helperText="Please enter the Task name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        sx={{backgroundColor: "white" , borderRadius: "10px"}}
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ backgroundColor: "#7A2048", '&:hover': { backgroundColor: "#9B3056" } }}>
                        Add Task
                    </Button>
                </Box>
            </Box>
        </form>
    );
}

export default CreateTask;
