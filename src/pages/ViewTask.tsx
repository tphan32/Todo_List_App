import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Status, Task } from "./Dashboard";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ViewTask() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const tasks: Task[] = JSON.parse(localStorage.getItem("tasks") || "[]");
  const task = tasks.find((task) => task.id === +params.id!);

  if (!task) {
    return <Typography>Task not found</Typography>;
  }
  const [status, setStatus] = useState<Status>(task.status);

  const handleComplete = () => {
    task.status = Status.COMPLETED;
    setStatus(Status.COMPLETED);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleHold = () => {
    task.status = Status.PENDING;
    setStatus(Status.PENDING);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleDelete = () => {
    const filteredTasks = tasks.filter((t: Task) => t.id !== task.id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    navigate("/");
  };

  return (
    <Box component="main" className="flex flex-col gap-y-5 items-center">
      <Typography variant="h4">View Task</Typography>
      <Box maxWidth="sm" className="w-7/12">
        <Typography variant="h6">Title</Typography>
        <Typography className="mb-5" noWrap paragraph>
          {task.title}
        </Typography>
        <Typography variant="h6">Description</Typography>
        <Box component="div" className="break-words">
          {task.description.split("\n").map((words) => {
            return <Typography key={words}>{words}</Typography>;
          })}
        </Box>
        <Typography variant="h6" className="mt-5" gutterBottom>
          Status
        </Typography>
        <Chip
          label={status.toUpperCase()}
          color={`${
            status.toUpperCase() === Status.COMPLETED ? "success" : "warning"
          }`}
          size="medium"
          className="mb-5"
        />
        <Box component="div">
          <IconButton aria-label="delete" size="large" onClick={handleDelete}>
            <DeleteIcon fontSize="large" />
          </IconButton>
        </Box>
        {status.toUpperCase() === Status.PENDING && (
          <Button
            variant="contained"
            size="large"
            className="mt-5"
            color="success"
            fullWidth
            disableElevation
            onClick={handleComplete}
          >
            Complete
          </Button>
        )}
        {status.toUpperCase() === Status.COMPLETED && (
          <Button
            variant="contained"
            size="large"
            className="mt-5"
            color="warning"
            fullWidth
            disableElevation
            onClick={handleHold}
          >
            Incomplete
          </Button>
        )}
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
