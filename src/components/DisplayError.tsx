import React from "react";
import { Error } from "../pages/UpdateTask";
import Typography from "@mui/material/Typography";

export default function DisplayError({ error }: { error?: Error }) {
  if (error === Error.ALL) {
    return (
      <Typography className="text-red-500 font-semibold">
        Please fill the title and description
      </Typography>
    );
  }

  if (error === Error.MISSING_TITLE) {
    return (
      <Typography className="text-red-500 font-semibold">
        Please fill the title
      </Typography>
    );
  }

  if (error === Error.MISSING_DESCRIPTION) {
    return (
      <Typography className="text-red-500 font-semibold">
        Please fill the description
      </Typography>
    );
  }
  return null;
}
