import { Typography, Button, Grid, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import UpdateTask from "../UpdateTask";
import { TaskStatus } from "../Tasks/type";
import { TaskCardProps } from "./types";
import { styles } from "./styles";
import DeleteTask from "../DeleteTask";

const TaskCard = (props: TaskCardProps) => {
  const [done, setDone] = useState(props.task.status !== TaskStatus.DONE);
  const [inProgress, setInProgress] = useState(props.task.status === TaskStatus.IN_PROGRESS)
  const { task } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setOpenMenu(true)
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setOpenMenu(false)
  };

  const handleOpenPopup = () => {
    setOpenPopup(true)
  };
  const handleClosePopup = () => {
    setOpenPopup(false)
  };
  const handleOpenDelete = () => {
    setOpenDelete(true)
  };
  const handleCloseDelete = () => {
    setOpenDelete(false)
  };
  const updateStatus = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/${task.id}`, {
        title: task.title,
        description: task.description,
        date: task.date,
        sequence: task.sequence,
        status: done ? TaskStatus.DONE : TaskStatus.OPEN,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDone = () => {
    setDone(!done)
    updateStatus()
    const updateAllTask = [...props.allTask];
    updateAllTask[props.index].status = done ? TaskStatus.DONE : TaskStatus.OPEN
    props.setTask(updateAllTask);
  }

  const handleInProgress = () => {
    handleCloseMenu();
    setInProgress(!inProgress);
    const updateAllTask = [...props.allTask];
    updateAllTask[props.index].status = inProgress ? TaskStatus.DONE : TaskStatus.IN_PROGRESS
    props.setTask(updateAllTask);
  }

  return (
    <>
      <Grid container className={styles.Task_Card} style={props.task.status === "DONE" ? { background: "#B2EFE7" } : (props.task.status === "OPEN" ? { background: "#0F7E9B" } : { background: "#92D7EF" })}  >
        <Grid item xs={1.5} style={{ display: "flex", alignItems: "center" }}>
          <Button
            onClick={() => {
              handleDone()
            }}
          >
            {!done ? <img src={process.env.PUBLIC_URL + 'Images/CheckedBox.svg'} alt="Check" /> : <img src={process.env.PUBLIC_URL + 'Images/EmptyBox.svg'} alt="Box" />}
          </Button>
        </Grid>
        <Grid item xs={9.5} style={{ display: "flex" }}>
          <Grid container>
            <Grid item xs={12} style={{alignItems:"center", display:"flex"}}>
              <Typography
                sx={
                  task.status === "DONE"
                    ? { textDecoration: "line-through", color: "white" }
                    : { color: "white" }
                }
                style={{ fontSize: "1.7rem", lineHeight: 1.2 }}
              >
                {task.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
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
          </Grid>
        </Grid>
        <Grid item xs={1} style={{ display: "flex", alignItems: "center" }}>
          <Button
            id="basic-button"
            aria-controls={openPopup ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={openPopup ? 'true' : undefined}
            onClick={(e) => handleOpenMenu(e)}
          >
            <img
              src={process.env.PUBLIC_URL + "Images/dots.svg"}
              alt="Settings"
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleCloseMenu}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem
              onClick={() => {
                handleCloseMenu()
                handleOpenPopup()
              }}
            >
              Edit
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleCloseMenu();
                handleOpenDelete();
              }}
            >
              Delete
            </MenuItem>
            <MenuItem onClick={handleInProgress}>
              {task.status === TaskStatus.IN_PROGRESS ? "Mark as Done" : "Mark as In Progress"}
            </MenuItem>
          </Menu>
          {/* Popup */}
          <UpdateTask
            isOpen={openPopup}
            onClose={handleClosePopup}
            task={task}
            index={props.index}
            allTasks={props.allTask}
            setTask={props.setTask}
          />
          <DeleteTask
            isOpen={openDelete}
            onClose={handleCloseDelete}
            task={task}
            index={props.index}
            allTasks={props.allTask}
            setTask={props.setTask}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TaskCard;
