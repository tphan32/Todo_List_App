import Grid from "@mui/material/Grid";
import React from "react";
import CustomCard from "./CustomCard";
import { Task } from "../pages/Dashboard";
import { Typography } from "@mui/material";

type TodoListProps = {
  tasks: Task[];
};

export default function TodoList({ tasks }: TodoListProps) {
  if (tasks.length === 0) {
    return <Typography>You're free. You have nothing to do!</Typography>;
  }

  return (
    <Grid container spacing={4}>
      {tasks.map((task) => (
        <Grid item xs={12} sm={6} md={3} key={task.id}>
          <CustomCard
            id={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
          />
        </Grid>
      ))}
    </Grid>
  );
}
