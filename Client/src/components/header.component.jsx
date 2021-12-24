import { Box } from "@mui/material";
import React from "react";

const style = {
  height: "70px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "25px",
  backgroundColor: "black",
  color: "white",
};

export default function Header() {
  return (
    <Box sx={style}>
      <h1>SVPlants</h1>
    </Box>
  );
}
