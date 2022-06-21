import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TaskCard from "../Task-Card.tsx";
import { Task, TaskProps } from "./type";
import React, { SetStateAction } from 'react';


const Tasks = (props: TaskProps) => {
  const currentPath = window.location.pathname;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Sort</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{props.tasks.length} Tasks</Typography>
          </Grid>
        </Grid>
        <Grid container style={{ overflowY: "scroll" }}>
          {props.tasks.map((t, i) => {
            return <Grid item xs={11}> <TaskCard task={t} index={i} allTask={props.tasks} setTask={props.setTasks} /></Grid>;
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Tasks;
