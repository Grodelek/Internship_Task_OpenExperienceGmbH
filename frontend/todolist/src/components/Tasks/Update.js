import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import Navbar from "../Homepage/Navbar";

function Update() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "UNDONE", // Default status
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/task/${id}`);
                if (response.status === 200) {
                    const data = await response.json();
                    setFormData({
                        name: data.name || "",
                        description: data.description || "",
                        status: data.status || "UNDONE",
                    });
                } else {
                    alert("Failed to fetch task data");
                }
            } catch (error) {
                console.error("Error while fetching task:", error);
                alert("An error occurred while loading the task.");
            }
        };

        fetchData();
    }, [id]);

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
            const response = await fetch(`http://localhost:8080/task/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Task updated successfully!");
                navigate("/task");
            } else {
                alert("Failed to update task!");
            }
        } catch (error) {
            console.error("Error while updating task:", error);
            alert("An error occurred while updating the task.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Navbar />
            <Box
                sx={{
                    backgroundColor: "rgba(67,85,202,0.75)",
                    width: "400px",
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
                        alignItems: "center",
                    }}
                >
                    <TextField
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            "& .MuiInputLabel-root": {
                                color: "grey",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "black",
                            },
                        }}
                        label="Task Name"
                        helperText="Please enter the Task name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        fullWidth
                    />
                    <TextField
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            "& .MuiInputLabel-root": {
                                color: "grey",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "black",
                            },
                        }}
                        label="Task Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        fullWidth
                        multiline
                        rows={3}
                    />
                    <TextField
                        sx={{
                            backgroundColor: "white",
                            borderRadius: "10px",
                            "& .MuiInputLabel-root": {
                                color: "grey",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "black",
                            },
                        }}
                        label="Status"
                        name="status"
                        select
                        value={formData.status}
                        onChange={handleChange}
                        fullWidth
                    >
                        <MenuItem value="DONE">Done</MenuItem>
                        <MenuItem value="UNDONE">Undone</MenuItem>
                    </TextField>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: "#7A2048",
                            "&:hover": { backgroundColor: "#9B3056" },
                        }}>
                        Update Task
                    </Button>
                </Box>
            </Box>
        </form>
    );
}

export default Update;
