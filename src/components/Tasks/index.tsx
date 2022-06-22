import { Grid, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import TaskCard from "../Task-Card.tsx";
import { SortBy, TaskProps } from "./type";
import React, { useEffect, useState } from 'react';
import axios from "axios";


const Tasks = (props: TaskProps) => {
  const currentPath = window.location.pathname;
  const [sortIndex, setSortIndex] = useState<number>(0);

  const handleSort = () => {
    let currIndex: number = JSON.parse(JSON.stringify(sortIndex));
    currIndex = currIndex + 1;
    setSortIndex(currIndex);
    if (sortIndex >= 2) {
      setSortIndex(0);
    }

  }
  useEffect(() => sortTask(sortIndex), [sortIndex])

  const sortTask = (index: number) => {
    const sortedTask = [...props.tasks]
    console.log(index)
    if (index === 0) {
      sortedTask.sort((a, b) => a.sequence - b.sequence)
      props.setTasks(sortedTask)
    } else if (index === 1) {
      sortedTask.sort((a, b) => a.title.localeCompare(b.title))
      props.setTasks(sortedTask)
    } else if (index === 2) {
      sortedTask.sort((a, b) => {
        const aDate = new Date(a.date).getTime()
        const bDate = new Date(b.date).getTime()
        return aDate - bDate
      })
      props.setTasks(sortedTask)
    }
  }

  const handleDeleteAll = async () => {
    for (let i = 0; i < props.tasks.length; i++) {
      try {
        await axios.delete(`${process.env.REACT_APP_URL}/${props.tasks[i].id}`);
      } catch (error) {
        console.log(error);
      }
    }
    props.setTasks([])
  }

  return (
    <>
      <Container sx={{height:"60vh"}}>
        <Grid container sx={{ marginTop: "30px", marginBottom: "30px", display: "flex", alignItems: "center" }}>
          <Grid item xs={1}>
            <Button onClick={handleSort}><img src={process.env.PUBLIC_URL + 'Images/SortIcon.svg'} alt="Sort" /></Button>
          </Grid>
          <Grid item xs={7}>
            <Typography style={{ fontSize: "1.5rem" }}>{SortBy[sortIndex]}</Typography>
          </Grid>
          <Grid item xs={3} >
            <Typography style={{ fontSize: "1.5rem" }}>{props.tasks.length} Tasks</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleDeleteAll}>
              Reset
            </Button>
          </Grid>
        </Grid>
        <Grid container style={{ overflowY: "scroll", maxHeight: "55vh" }}>

          {props.tasks.map((t, i) => {
            return <Grid key={i} item xs={11}> <TaskCard task={t} index={i} allTask={props.tasks} setTask={props.setTasks} /></Grid>;
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Tasks;
