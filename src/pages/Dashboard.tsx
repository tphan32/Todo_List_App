import React, { useState } from "react";
import Button from "@mui/material/Button";
import TodoList from "../components/TodoList";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Chip, Typography } from "@mui/material";
import { useAppContext } from "../components/store/AppContext";

export enum Status {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
}

export default function Todo() {
  const { tasks } = useAppContext();
  let filteredTasks = tasks;
  const [filter, setFilter] = useState<Status | null>(null);
  const navigate = useNavigate();

  if (filter) {
    filteredTasks = tasks.filter((task) => task.status === filter);
  }

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
          onClick={() => setFilter(Status.COMPLETED)}
          color="success"
        />
        <Chip
          label={Status.PENDING}
          variant="outlined"
          onClick={() => setFilter(Status.PENDING)}
          color="warning"
        />
        <Chip label="ALL" variant="outlined" onClick={() => setFilter(null)} />
      </Box>
      <TodoList tasks={filteredTasks} />
    </Box>
  );
}
