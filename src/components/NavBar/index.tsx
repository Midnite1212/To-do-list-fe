import { Button, Grid, Typography, Modal } from "@mui/material";
import { NavBarProps } from "./type";
import CreateTask from "../CreateTask";
import React from "react";

const NavBar = (props: NavBarProps) => {
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
        sx={{ alignItems: "center", display: "flex", justifyContent:"center", color:"white" }}
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
        Day {i + 1}
      </Grid>
    );
  }

  return (
    <>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
        height="60%"
      >
        <Grid item xs={1}>
          {/* Menu */}
        </Grid>
        <Grid item xs={9} style={{display:"flex", alignItems:"center", justifyContent:"center", fontSize:"2rem", fontWeight:"bold"}}>
          To Do List
        </Grid>
        <Grid item xs={2}>
          <Button onClick={handleOpen} style={{ marginTop: "20px" }}>
            <img
              width="75%"
              src={process.env.PUBLIC_URL + 'Images/AddIcon.svg'}
              alt="Add Icon" />
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <>
              <CreateTask allTasks={props.allTasks} setTask={props.setTask} handleClose={handleClose} />
            </>
          </Modal>
        </Grid>
        {/*Loop through the daily/weekly/... 7 times */}
        {dateNav}
      </Grid>
    </>
  );
};

export default NavBar;
