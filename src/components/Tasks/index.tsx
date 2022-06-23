import { Grid, Typography, Button, Box, Modal } from "@mui/material";
import { Container } from "@mui/system";
import TaskCard from "../Task-Card.tsx";
import { SortBy, TaskProps } from "./type";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { styles } from "./styles";


const Tasks = (props: TaskProps) => {
  //const currentPath = window.location.pathname;
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {tasks, setTasks} = props
  const sortedTask = [...tasks]

  function handleSort () {
    let currIndex: number = JSON.parse(JSON.stringify(sortIndex));
    currIndex = currIndex + 1;
    setSortIndex(currIndex);
    if (sortIndex >= 2) {
      setSortIndex(0);
    }
  }

  const sortTask = (index: number) => {
    if (index === 0) {
      sortedTask.sort((a, b) => a.sequence - b.sequence)
      setTasks(sortedTask)
    } else if (index === 1) {
      sortedTask.sort((a, b) => a.title.localeCompare(b.title))
      setTasks(sortedTask)
    } else if (index === 2) {
      sortedTask.sort((a, b) => {
        const aDate = new Date(a.date).getTime()
        const bDate = new Date(b.date).getTime()
        return aDate - bDate
      })
      
      setTasks(sortedTask)
    }
  }

  useEffect(() => {
    
    sortTask(sortIndex)
  }, [sortIndex])

  const handleDeleteAll = async () => {
    for (let i = 0; i < props.tasks.length; i++) {
      try {
        await axios.delete(`${process.env.REACT_APP_URL}/${props.tasks[i].id}`);
      } catch (error) {
        console.log(error);
      }
    }
    props.setTasks([])
    handleClose()
  }

  return (
    <>
      <Container sx={{ height: "60vh" }}>
        <Grid container sx={{ marginTop: "30px", marginBottom: "30px", display: "flex", alignItems: "center" }}>
          <Grid item xs={1.5}>
            <Button onClick={handleSort}><img src={process.env.PUBLIC_URL + 'Images/SortIcon.svg'} alt="Sort" /></Button>
          </Grid>
          <Grid item xs={6.5}>
            <Typography style={{ fontSize: "1.5rem" }}>{SortBy[sortIndex]}</Typography>
          </Grid>
          <Grid item xs={3} >
            <Typography style={{ fontSize: "1.5rem" }}>{props.tasks.length} Tasks</Typography>
          </Grid>
          <Grid item xs={1}>
            <Button onClick={handleOpen}>
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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Box className={styles.Modal_Container}>
            <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: "30px", alignSelf: "center" }}>
              Delete All Task
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Button onClick={handleDeleteAll}>
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={handleClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  );
};

export default Tasks;
