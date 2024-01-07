import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TodoList from "../components/TodoList";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Chip, Typography } from "@mui/material";

export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
}

export default function Todo() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  const handleFilter = (status?: string) => {
    const data = localStorage.getItem("tasks");
    if (data) {
      const tasks: Task[] = JSON.parse(data);
      if (status) {
        setTasks(tasks.filter((task) => task.status === status));
        return;
      }
      setTasks(tasks);
    }
  };

  return (
    <Box component="main" className="flex flex-col gap-y-5">
      <Button variant="outlined" size="large" onClick={() => navigate("/new")}>
        Add Task
      </Button>
      <Typography variant="h4">Tasks</Typography>
      <Box className="flex gap-x-2">
        <Chip
          label={Status.COMPLETED}
          variant="outlined"
          onClick={() => handleFilter(Status.COMPLETED)}
          color="success"
        />
        <Chip
          label={Status.PENDING}
          variant="outlined"
          onClick={() => handleFilter(Status.PENDING)}
          color="warning"
        />
        <Chip label="ALL" variant="outlined" onClick={() => handleFilter()} />
      </Box>
      <TodoList tasks={tasks} />
    </Box>
  );
}
