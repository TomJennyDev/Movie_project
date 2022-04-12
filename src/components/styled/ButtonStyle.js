import { Button } from "@mui/material";
import React from "react";

function ButtonStyle({ children, sx, ...props }) {
  const { variant } = props;
  const Contained = (theme) => ({
    ...sx,

    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      boxShadow: `0 0 20px ${theme.palette.primary.main}`,
      color: theme.palette.common.white,
    },
  });
  const Outlined = (theme) => ({
    ...sx,

    border: `1px solid ${theme.palette.common.white}`,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      boxShadow: `0 0 10px ${theme.palette.primary.main}`,
    },
  });

  return (
    <Button {...props} sx={variant === "outlined" ? Outlined : Contained}>
      {children}
    </Button>
  );
}

export default ButtonStyle;
