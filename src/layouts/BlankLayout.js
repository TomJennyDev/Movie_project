import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";

const styledContainer = {
  background:
    "url(https://assets.nflxext.com/ffe/siteui/vlv3/0bd3a69d-6790-4edc-9818-1c8c558946c2/1f1ab65c-af21-49aa-a928-9ef1faf4fe94/VN-en-20220329-popsignuptwoweeks-perspective_alpha_website_small.jpg)",
  backgroundPosition: "top center",
  backgroundSize: "cover",
  position: "relative",
  zIndex: 9999,
};

function BlankLayout() {
  return (
    <Stack
      sx={styledContainer}
      minHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          content: "''",
          background:
            "linear-gradient(to top, rgba(0,0,0), rgba(0,0,0,0.5) , transparent)",
          width: 1,
          height: 1,
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      ></Box>
      <Logo sx={{ width: 70, height: 70, zIndex: 999 }} />
      <Outlet />
    </Stack>
  );
}

export default BlankLayout;
