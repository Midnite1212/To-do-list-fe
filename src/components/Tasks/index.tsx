import { Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import TaskCard from "../Task-Card.tsx";
import { Task } from "./type";

type Props = {
  tasks: Task[];
};

const Tasks: React.FC<Props> = ({ tasks }) => {
  const currentPath = window.location.pathname;

  return (
    <>
      <Container>
        <Grid container>
          <Grid item xs={6}>
            <Typography>Sort</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography>{tasks.length} Tasks</Typography>
          </Grid>
        </Grid>
        {tasks.map((t) => {
          return <TaskCard task={t} />;
        })}
      </Container>
    </>
  );
};

export default Tasks;
