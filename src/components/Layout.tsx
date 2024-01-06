import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <Container className="mt-20">
      <Typography variant="h3" component="h1" gutterBottom>
        TODO List App
      </Typography>
      <Outlet />
    </Container>
  );
}
