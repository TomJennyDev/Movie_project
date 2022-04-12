import { Breadcrumbs, Link, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

function BreadCrumsStyle({ title }) {
  return (
    <Breadcrumbs sx={{ mb: 4 }}>
      <Link underline="hover" color="inherit" component={RouterLink} to="/">
        Movies
      </Link>
      <Typography color="text.primary">{title}</Typography>
    </Breadcrumbs>
  );
}

export default BreadCrumsStyle;
