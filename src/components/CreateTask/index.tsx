import { Container, Box } from "@mui/system";
import {
  Typography,
  TextField,
  Button,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import { TaskStatus } from "../Tasks/type";
import React, { useState } from "react";
import axios from "axios";
import { CreateTaskProps } from "./types";

const defaultValues = {
  title: "",
  description: "",
  sequence: 0,
  date: "",
  progress: TaskStatus.OPEN,
};

const CreateTask = (props: CreateTaskProps) => {
  const [formValues, setFormValues] = useState(defaultValues);

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
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
        <Container>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Create Task
            </Typography>
            <TextField
              id="name-input"
              name="title"
              label="Title"
              type="text"
              value={formValues.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
            <TextField
              id="description-input"
              name="description"
              label="Description"
              type="text"
              value={formValues.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
            <TextField
              id="sequence-input"
              name="sequence"
              label="Sequence"
              type="number"
              value={formValues.sequence}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
            <TextField
              id="date-input"
              name="date"
              label="Date (YYYY-MM-DD)"
              type="text"
              value={formValues.date}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(e)
              }
            />
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
            <Button type="submit">Submit</Button>
          </Box>
        </Container>
      </form>
    </>
  );
};

export default CreateTask;
