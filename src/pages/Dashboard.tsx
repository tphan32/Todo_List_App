import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TodoList from "../components/TodoList";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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
  // How to update the tasks state when a task is removed
  // https://stackoverflow.com/questions/72419273/does-parent-component-re-renders-when-changes-occur-in-child-components
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setTasks(JSON.parse(data));
    }
  }, []);

  return (
    <Box component="main" className="flex flex-col gap-y-10">
      <Button variant="outlined" size="large" onClick={() => navigate("/new")}>
        Add Task
      </Button>
      <TodoList tasks={tasks} />
    </Box>
  );
}
