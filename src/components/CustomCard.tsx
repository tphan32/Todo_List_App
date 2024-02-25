import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import React from "react";
import TodoImg from "../assets/todo.jpg";
import Chip from "@mui/material/Chip";
import { Status, Task } from "../pages/Dashboard";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppContext } from "./store/AppContext";

type CustomCardProps = Task;

export default function CustomCard({
  id,
  title,
  description,
  status,
}: CustomCardProps) {
  const navigate = useNavigate();
  const { removeTask, updateTaskStatus } = useAppContext();
  const isTaskCompleted = status === Status.COMPLETED;

  const handleComplete = (id: string) => {
    if (isTaskCompleted) {
      updateTaskStatus(id, Status.PENDING);
    } else {
      updateTaskStatus(id, Status.COMPLETED);
    }
  };

  return (
    <Card className="flex flex-col">
      <CardMedia component="div" image={TodoImg} className="pt-40" />
      <CardContent className="flex flex-col gap-y-3">
        <Typography variant="h5" component="h2" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" noWrap>
          {description}
        </Typography>
        <Typography variant="subtitle2" noWrap>
          Status:
        </Typography>
        <Chip
          label={status.toUpperCase()}
          color={`${
            status.toUpperCase() === Status.COMPLETED ? "success" : "warning"
          }`}
          size="medium"
        />
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => {
            navigate(`view/${id}`);
          }}
        >
          View
        </Button>
        <Button
          size="small"
          onClick={() => {
            navigate(`update/${id}`);
          }}
        >
          Edit
        </Button>
        <IconButton
          aria-label="complete"
          onClick={() => {
            handleComplete(id);
          }}
        >
          {isTaskCompleted ? <ClearIcon /> : <DoneIcon />}
        </IconButton>
        <IconButton aria-label="delete" onClick={() => removeTask(id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
