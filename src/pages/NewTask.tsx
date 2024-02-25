import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Status } from "./Dashboard";
import DisplayError from "../components/DisplayError";
import { Error } from "./UpdateTask";
import { v4 as uuidv4 } from 'uuid';
import { useAppContext } from "../components/store/AppContext";

export default function NewTask() {
  const navigate = useNavigate();
  const [error, setError] = React.useState<Error>();
  const { addTask } = useAppContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as {
      title: string;
      description: string;
    };

    const cleanTitle = data.title.trim();
    const cleanDescription = data.description.trim();

    if (!cleanTitle && !cleanDescription) {
      setError(Error.ALL);
      return;
    }

    if (!cleanTitle) {
      setError(Error.MISSING_TITLE);
      return;
    }

    if (!cleanDescription) {
      setError(Error.MISSING_DESCRIPTION);
      return;
    }

    addTask({
      id: uuidv4(),
      title: cleanTitle,
      description: cleanDescription,
      status: Status.BACKLOG,
    })


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
          error={
            error && (error === Error.MISSING_TITLE || error === Error.ALL)
          }
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
          error={
            error &&
            (error === Error.MISSING_DESCRIPTION || error === Error.ALL)
          }
        />
        <DisplayError error={error} />
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
