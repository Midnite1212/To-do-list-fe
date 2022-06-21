import { Typography, Button, Grid, Menu, MenuItem, Modal } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import UpdateTask from "../UpdateTask";
import { Task, TaskStatus } from "../Tasks/type";
import { TaskCardProps } from "./types";
import { styles } from "./styles";

const TaskCard = (props: TaskCardProps) => {
  const [done, setDone] = useState(props.task.status !== TaskStatus.DONE);
  const { task } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const updateStatus = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/${task.id}`, {
        title: task.title,
        description: task.description,
        date: task.date,
        sequence: task.sequence,
        status: done ? TaskStatus.OPEN : TaskStatus.DONE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (update: Task) => {
    handleClose();
  };

  const handleDelete = async (id: string) => {
    handleClose();
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/${task.id}`);
    } catch (error) {
      console.log(error);
    }
    const currTasks: Task[] = props.allTask.filter(a => a.id !== id);
    props.setTask(currTasks)
  };

  const handleDone = () => {
    setDone(!done)
    updateStatus()
    const updateAllTask = [...props.allTask];
    updateAllTask[props.index].status = done ? TaskStatus.DONE : TaskStatus.OPEN
    props.setTask(updateAllTask);
    console.log(updateAllTask)
  }

  return (
    <>
      <Box className={styles.Task_Card}>
        <Grid container>
          <Grid item xs={1}>
            <Button
              onClick={() => {
                handleDone()
              }}
            >
              [x]
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Typography
              sx={
                task.status === "DONE"
                  ? { textDecoration: "line-through", color: "white" }
                  : { color: "white" }
              }
            >
              {task.title}
            </Typography>
            <Typography
              sx={
                task.status === "DONE"
                  ? { textDecoration: "line-through", color: "white" }
                  : { color: "white" }
              }
            >
              {task.description}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button
              id="basic-button"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <img
                src={process.env.PUBLIC_URL + "Images/dots.svg"}
                alt="Settings"
              />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>
                <Button onClick={handleClick}>
                  <Modal
                    open={false}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <UpdateTask task={task} />
                  </Modal>
                  Edit
                </Button>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDelete(task.id!);
                }}
              >
                Delete
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {task.status === "DONE" ? "Mark as Undone" : "Mark as Done"}
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TaskCard;
