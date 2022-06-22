import axios from "axios";
import { Task } from "../Tasks/type";
import { Grid, Modal, Typography, Button } from "@mui/material";
import { DeleteTaskProps } from "./types";
import { Box, Container } from "@mui/system";
import { styles } from "./styles";

const DeleteTask = (props: DeleteTaskProps) => {
  const handleDelete = async (id: string) => {
    props.onClose()
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/${props.task.id}`);
    } catch (error) {
      console.log(error);
    }
    const currTasks: Task[] = props.allTasks.filter(a => a.id !== id);
    props.setTask(currTasks)
  };

  return (
    <>
      <Modal
        open={props.isOpen}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container>
          <Box className={styles.Modal_Container}>
            <Typography id="modal-modal-title" variant="h4" component="h2" style={{ marginBottom: "30px", alignSelf:"center" }}>
              Delete Task
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Button onClick={() => handleDelete(props.task.id!)}>
                  Confirm
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button onClick={props.onClose}>
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Modal>
    </>
  )
}

export default DeleteTask;