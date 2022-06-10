import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { Task } from "../Tasks/type";

type Props = {
  data: Task[];
};

const Progress: React.FC<Props> = ({ data }) => {
  var open = 0;
  var inProgress = 0;
  var done = 0;

  data.map((task) => {
    if (task.status === "OPEN") open++;
    else if (task.status === "DONE") done++;
    else inProgress++;
    return true;
  });

  return (
    <>
      <Box>
        <Grid container direction="column" height="100vh">
          <Grid item xs={4}>
            <Typography>Open ({open})</Typography>
            {data.map((task, i) => {
              if (task.status === "OPEN") {
                return <Typography key={i}> {task.title}</Typography>;
              } else if (open === 0)
                return <Typography key={i}>No Tasks </Typography>;
              else return null;
            })}
          </Grid>
          <Grid item xs={4}>
            <Typography>In Progress ({inProgress})</Typography>
            {data.map((task, i) => {
              if (task.status === "IN_PROGRESS") {
                return <Typography key={i}> {task.title}</Typography>;
              } else if (open === 0)
                return <Typography key={i}>No Tasks </Typography>;
              else return null;
            })}
          </Grid>
          <Grid item xs={4}>
            <Typography>Done ({done})</Typography>
            {data.map((task, i) => {
              if (task.status === "DONE") {
                return <Typography key={i}> {task.title}</Typography>;
              } else if (open === 0)
                return <Typography key={i}>No Tasks </Typography>;
              else return null;
            })}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Progress;
