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

type CustomCardProps = Task;

export default function CustomCard({
  id,
  title,
  description,
  status,
}: CustomCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col">
      <CardMedia component="div" image={TodoImg} className="pt-40" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2" noWrap>
          {title}
        </Typography>
        <Typography variant="body2" noWrap>
          {description}
        </Typography>
        <Chip
          label={status.toUpperCase()}
          color={`${
            status.toUpperCase() === Status.COMPLETED ? "success" : "warning"
          }`}
          className="mt-4"
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
      </CardActions>
    </Card>
  );
}
