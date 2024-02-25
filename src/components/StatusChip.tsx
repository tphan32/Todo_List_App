import React from "react";
import { Status } from "../pages/Dashboard";
import Chip from "@mui/material/Chip/Chip";

interface StatusProps {
  status: Status;
  variant?: "outlined" | "filled";
  onClick?: () => void;
}

type Color = "default" | "error" | "warning" | "success";

export default function StatusChip(props: StatusProps) {
  const { status } = props;
  let color: Color = "default";
  if (status.toUpperCase() === Status.IN_PROGRESS) {
    color = "warning";
  } else if (status.toUpperCase() === Status.BACKLOG) {
    color = "default";
  } else if (status.toUpperCase() === Status.BLOCKING) {
    color = "error";
  } else if (status.toUpperCase() === Status.COMPLETED) {
    color = "success";
  }

  return (
    <Chip
      {...props}
      label={status.toUpperCase()}
      color={color}
      size="medium"
    />
  );
}
