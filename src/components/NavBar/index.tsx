import { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Task } from "./type";

const NavBar: React.FC = () => {
  const fullDate = new Date();
  const currentPath = window.location.pathname;
  const displayDate = fullDate;
  const dateNav = [];

  for (let i = 0; i < 7; i++) {
    dateNav.push(
      <Grid key={i} item xs={12 / 7}>
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
      <Grid container>
        <Grid item xs={12}>
          <Typography>Background</Typography>
        </Grid>
        {/*Loop through the daily/weekly/... 7 times */}
        {dateNav}
      </Grid>
    </>
  );
};

export default NavBar;
