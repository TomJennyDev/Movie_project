import { CircularProgress, Stack } from "@mui/material";
import React from "react";

function LoadingScreen() {
  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        position: "relative",
      }}
    >
      <CircularProgress
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </Stack>
  );
}

export default LoadingScreen;
