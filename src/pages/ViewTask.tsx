import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Status } from "./Dashboard";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppContext } from "../components/store/AppContext";
import ConfirmModal from "../components/ConfirmModal";

export default function ViewTask() {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const { findTask, updateTaskStatus, removeTask } = useAppContext();
  const task = findTask(params.id!);

  if (!task) {
    return <Typography>Task not found</Typography>;
  }
  const [status, setStatus] = useState<Status>(task.status);

  const handleComplete = () => {
    setStatus(Status.COMPLETED);
    updateTaskStatus(task.id, Status.COMPLETED);
  };

  const handleHold = () => {
    setStatus(Status.IN_PROGRESS);
    updateTaskStatus(task.id, Status.IN_PROGRESS);
  };

  const handleDelete = () => {
    removeTask(task.id);
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
        <ConfirmModal modalType="delete" confirm={handleDelete} />
        {status.toUpperCase() === Status.IN_PROGRESS && (
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
