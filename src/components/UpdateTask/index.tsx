import { Container, Box } from "@mui/system";
import {
  Typography,
  TextField,
  Button,
  Modal,
  Select,
  SelectChangeEvent,
  MenuItem,
  Grid
} from "@mui/material";
import { TaskStatus } from "../Tasks/type";
import React, { useState } from "react";
import axios from "axios";
import { UpdateTaskProps } from "./types";
import { styles } from "./styles";

const UpdateTask = (props: UpdateTaskProps) => {
  const { task } = props;
  const defaultValues = {
    title: task.title,
    description: task.description,
    sequence: task.sequence,
    date: task.date,
    progress: task.status,
  };
  // const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState(defaultValues);

  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //figure out how to make this general
  const handleSelectChange = (e: SelectChangeEvent<TaskStatus>) => {
    const { value } = e.target as HTMLSelectElement;
    let status: TaskStatus;
    if (value === TaskStatus.OPEN) {
      status = TaskStatus.OPEN;
    } else if (value === TaskStatus.DONE) {
      status = TaskStatus.DONE;
    } else status = TaskStatus.IN_PROGRESS;
    setFormValues({
      ...formValues,
      progress: status,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { title, description, sequence, date, progress } = formValues;
    console.log(formValues);
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/${task.id}`, {
        title: title,
        description: description,
        sequence: sequence,
        date: new Date(date),
        status: progress,
      });
    } catch (error) {
      console.log(error);
    }
    const taskData = [...props.allTasks];
    taskData[props.index] = {
      title: title,
      description: description,
      sequence: sequence,
      date: new Date(date),
      status: progress,
    };
    props.setTask(taskData)
    props.onClose()
  };


  return (
    <>
      {/* <Button onClick={handleOpen}>Edit</Button> */}
      <Modal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
          <Container>
            <Box className={styles.Modal_COntainer}>
              <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: "20px", marginTop:"-20px", textAlign: "center" }}>
                Update Task
              </Typography>
              <Grid container rowSpacing={{base: 1, md: 3, lg: 3, xl:5}}>
                <Grid item xs={12}>
                  <TextField
                    id="name-input"
                    name="title"
                    label="Title"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.title}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="description-input"
                    name="description"
                    label="Description"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="sequence-input"
                    name="sequence"
                    label="Sequence"
                    type="number"
                    style={{ width: "100%" }}
                    value={formValues.sequence}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="date-input"
                    name="date"
                    label="Date (YYYY-MM-DD)"
                    type="text"
                    style={{ width: "100%" }}
                    value={formValues.date}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    id="progress-input"
                    name="progress"
                    label="Progress"
                    value={formValues.progress}
                    onChange={(e) => handleSelectChange(e)}
                  >
                    <MenuItem value={TaskStatus.OPEN}>Open</MenuItem>
                    <MenuItem value={TaskStatus.IN_PROGRESS}>In progress</MenuItem>
                    <MenuItem value={TaskStatus.DONE}>Done</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button style={{ fontSize: "1.5rem" }} type="submit">Submit</Button>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </form >
      </Modal >
    </>
  );
};

export default UpdateTask;
