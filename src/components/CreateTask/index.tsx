import { Container, Box } from "@mui/system";
import {
  Typography,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
  Grid,
} from "@mui/material";
import { TaskStatus } from "../Tasks/type";
import React, { useState } from "react";
import axios from "axios";
import { CreateTaskProps } from "./types";

const currTime = new Date().toISOString().split('T')[0];
const defaultValues = {
  title: "",
  description: "",
  sequence: 0,
  date: currTime,
  progress: TaskStatus.OPEN,
};

const CreateTask = (props: CreateTaskProps) => {
  const [error, setError] = useState({error: false, touched: false})
  const [formValues, setFormValues] = useState(defaultValues);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    if(formValues.title === "")
      setError({error:true, touched:error.touched})
    else
      setError({error:false, touched:error.touched})
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
      await axios.post(`${process.env.REACT_APP_URL}`, {
        title: title,
        description: description,
        sequence: sequence,
        date: new Date(date),
        status: progress,
      });
    } catch (error) {
      console.log(error);
    }
    const addTask = JSON.parse(JSON.stringify(props.allTasks));
    addTask.push({
      title: title,
      description: description,
      sequence: sequence,
      date: new Date(date),
      status: progress,
    })
    props.setTask(addTask)
    props.handleClose();
  };
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#EDEFEC",
    border: "2px solid #000",
    borderRadius: "37px",
    boxShadow: 24,
    p: 8,
  };
  return (
    <>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Container>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: "30px" }}>
              Create Task
            </Typography>
            <Grid container rowSpacing={5}>
              <Grid item xs={12}>
                <TextField
                  id="name-input"
                  name="title"
                  label="Title"
                  type="text"
                  onBlur={() => {formValues.title === "" ? setError({error: true, touched:true}) : setError({error: false, touched:true})}}
                  error={error.error}
                  helperText={error.error ? "Title cannot be empty" : null}
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
                <Button disabled={error.error || !error.touched} style={{ fontSize: "1.5rem" }} type="submit">Submit</Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </form>
    </>
  );
};

export default CreateTask;
