import { useState } from "react";
import { Button, Grid, Typography, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { Task } from "./type";
import CreateTask from "../CreateTask";
import React from "react";

const NavBar: React.FC = () => {
  const fullDate = new Date();
  const currentPath = window.location.pathname;
  const displayDate = fullDate;
  const dateNav = [];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  for (let i = 0; i < 7; i++) {
    dateNav.push(
      <Grid
        sx={{ alignItems: "flex-end", display: "flex" }}
        key={i}
        item
        xs={12 / 7}
      >
        {(() => {
          if (currentPath === "/daily") {
            displayDate.setDate(fullDate.getDate() - 1);
            return displayDate.toDateString();
          }
        })()}
      </Grid>
    );
  }

  return (
    <>
      <Grid
        container
        sx={{
          backgroundColor: "#B4C1F6",
          display: "flex",
          justifyContent: "space-between",
        }}
        height="100%"
      >
        <Grid item xs={10}></Grid>
        <Grid item xs={2}>
          <Button onClick={handleOpen}>+</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CreateTask />
          </Modal>
        </Grid>
        {/*Loop through the daily/weekly/... 7 times */}
        {dateNav}
      </Grid>
    </>
  );
};

export default NavBar;
