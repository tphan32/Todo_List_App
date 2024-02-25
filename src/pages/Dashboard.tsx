import React, { useState } from "react";
import Button from "@mui/material/Button";
import TodoList from "../components/TodoList";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { Chip, Typography } from "@mui/material";
import { useAppContext } from "../components/store/AppContext";
import StatusChip from "../components/StatusChip";

export enum Status {
  BACKLOG = "BACKLOG",
  BLOCKING = "BLOCKING",
  IN_PROGRESS = "IN PROGRESS",
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
        <StatusChip status={Status.IN_PROGRESS} variant="outlined" onClick={() => setFilter(Status.IN_PROGRESS)}/>
        <StatusChip status={Status.BLOCKING} variant="outlined" onClick={() => setFilter(Status.BLOCKING)}/>
        <StatusChip status={Status.BACKLOG} variant="outlined" onClick={() => setFilter(Status.BACKLOG)}/>
        <StatusChip status={Status.COMPLETED} variant="outlined" onClick={() => setFilter(Status.COMPLETED)}/>
        <Chip label="ALL" variant="outlined" onClick={() => setFilter(null)} />
      </Box>
      <TodoList tasks={filteredTasks} />
    </Box>
  );
}
