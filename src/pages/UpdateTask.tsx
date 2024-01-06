import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Status, Task } from "./Dashboard";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

export default function UpdateTask() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  const task = tasks.find((task) => task.id === +params.id!);

  if (!task) {
    return <Typography>Task not found</Typography>;
  }

  const [title, setTitle] = useState<string>(task.title);
  const [description, setDescription] = useState<string>(task.description);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tasks: Task[] = JSON.parse(localStorage.getItem("tasks")!);
    const task = tasks.find((t) => t.id === +params.id!);
    if (!task) {
      return;
    }
    task.title = title;
    task.description = description;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    navigate("/");
  };

  const handleDelete = () => {
    const filteredTasks = tasks.filter((t: Task) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    navigate("/");
  };

  return (
    <Box component="main" className="flex flex-col gap-y-5 items-center">
      <Typography variant="h4">Update Task</Typography>
      <Box maxWidth="sm" className="w-7/12" component="form" onSubmit={handleSubmit}>
        <Typography variant="h6" gutterBottom>
          Title
        </Typography>
        <TextField
          id="title"
          name="title"
          variant="outlined"
          className="mb-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Typography variant="h6" gutterBottom>
          Description
        </Typography>
        <TextField
          id="description"
          name="description"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-5"
        />
        <Typography variant="h6" gutterBottom>
          Status
        </Typography>
        <Chip
          label={task.status.toUpperCase()}
          color={`${
            task.status.toUpperCase() === Status.COMPLETED
              ? "success"
              : "warning"
          }`}
          size="medium"
          className="mb-5"
        />
        <Box component="div">
          <IconButton aria-label="delete" size="large" onClick={handleDelete}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Box>
        <Button
          variant="contained"
          size="large"
          className="mt-5"
          type="submit"
          color="info"
          fullWidth
        >
          Update
        </Button>
        <Button
          variant="outlined"
          size="large"
          className="mt-5"
          fullWidth
          onClick={() => {
            navigate("/");
          }}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}
