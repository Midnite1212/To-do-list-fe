import { Typography, Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../Tasks/type";

type TaskCardProps = {
  task: Task;
};

const TaskCard: React.FC<TaskCardProps> = (props) => {
  const [done, setDone] = useState(false);
  const { task } = props;
  const updateStatus = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/${task.id}`, {
        title: task.title,
        description: task.description,
        date: task.date,
        sequence: task.sequence,
        status: TaskStatus.OPEN,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: "20px" }}>
        <Grid container>
          <Grid item xs={1}>
            <Button
              onClick={() => {
                setDone(!done);
                updateStatus();
              }}
            >
              aa
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={done ? { textDecoration: "line-through" } : {}}>
              {task.title}
            </Typography>
            <Typography sx={done ? { textDecoration: "line-through" } : {}}>
              {task.description}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            set
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TaskCard;
