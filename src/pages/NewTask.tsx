import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "./Dashboard";

export default function NewTask() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      title: string;
      description: string;
    };

    const cleanTitle = data.title.trim();
    const cleanDescription = data.description.trim();
    if (!cleanTitle || !cleanDescription) {
      setError("Please fill all the required fields");
      return;
    }

    const currentTasks = localStorage.getItem("tasks");
    if (currentTasks) {
      const tasks = JSON.parse(currentTasks);
      tasks.push({
        id: tasks.length + 1,
        title: data.title,
        description: data.description,
        status: Status.PENDING,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      localStorage.setItem(
        "tasks",
        JSON.stringify([
          {
            id: 1,
            title: data.title,
            description: data.description,
            status: Status.PENDING,
          },
        ])
      );
    }
    navigate("/");
  };

  return (
    <Box component="main" className="flex flex-col gap-y-5 items-center">
      <Typography variant="h4">New Task</Typography>
      <Box
        maxWidth="sm"
        className="w-7/12"
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6" gutterBottom>
          Title*
        </Typography>
        <TextField
          id="title"
          name="title"
          variant="outlined"
          className="mb-5"
        />
        <Typography variant="h6" gutterBottom>
          Description*
        </Typography>
        <TextField
          id="description"
          name="description"
          multiline
          rows={10}
          variant="outlined"
          fullWidth
        />
        {error && (
          <Typography className="text-red-500 font-semibold">
            {error}
          </Typography>
        )}
        <Button
          variant="contained"
          size="large"
          className="mt-5"
          type="submit"
          color="info"
          fullWidth
        >
          Create
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
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
