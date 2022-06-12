import { Typography, Button, Grid, Menu, MenuItem, Modal } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import UpdateTask from "../UpdateTask";
import { Task, TaskStatus } from "../Tasks/type";

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const [done, setDone] = useState(false);
  const { task } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [parentAnchorE1, setParentAnchorE1] = useState<null | HTMLElement>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setParentAnchorE1(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setParentAnchorE1(null);
    setAnchorEl(null);
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

  const handleUpdate = async (update: Task) => {
    handleClose();
  };

  const handleDelete = async (id: string) => {
    handleClose();
    console.log(task.id);
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/${task.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    updateStatus();
  }, [done]);

  return (
    <>
      <Box
        sx={{
          marginBottom: "20px",
          backgroundColor: "#89A0FF",
          height: "12vh",
          borderRadius: "20px",
        }}
      >
        <Grid container>
          <Grid item xs={1}>
            <Button
              onClick={() => {
                setDone(!done);
              }}
            >
              aa
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
              aria-controls={Boolean(parentAnchorE1) ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={Boolean(parentAnchorE1) ? "true" : undefined}
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
              open={Boolean(parentAnchorE1)}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem>
                <Button onClick={handleClick}>
                  <Modal
                    open={Boolean(anchorEl)}
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
                  handleDelete(task.id);
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
