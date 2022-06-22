import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { TaskStatus } from "../Tasks/type";
import { styles } from "./styles";
import { ProgressProps } from "./type";


const Progress = (props: ProgressProps) => {
  const openTask = props.data.filter(a => a.status === TaskStatus.OPEN);
  const inProgressTask = props.data.filter(a => a.status === TaskStatus.IN_PROGRESS);
  const doneTask = props.data.filter(a => a.status === TaskStatus.DONE);

  return (
    <>
      <Box>
        <Grid container direction="column" height="100vh">
          <Grid item xs={4} className={styles.Progress_Grid}>
            <Typography className={styles.Progress_Title} style={{fontSize:"2rem"}}>
              Open ({openTask.length})
            </Typography>
            {openTask.length === 0 ? <Typography>No Tasks </Typography> : null}
            {openTask.map((task, i) => {
              return <Typography key={i}> {task.title}</Typography>;
            })}
          </Grid>

          <Grid item xs={4} className={styles.Progress_Grid}>
            <Typography className={styles.Progress_Title} style={{fontSize:"2rem"}}>
              In Progress ({inProgressTask.length})
            </Typography>
            {inProgressTask.length === 0 ? <Typography>No Tasks </Typography> : null}
            {inProgressTask.map((task, i) => {
              return <Typography key={i}> {task.title}</Typography>;
            })}
          </Grid>

          <Grid item xs={4} className={styles.Progress_Grid}>
            <Typography className={styles.Progress_Title} style={{fontSize:"2rem"}}>
              Done ({doneTask.length})
            </Typography>
            {doneTask.length === 0 ? <Typography>No Tasks </Typography> : null}
            {doneTask.map((task, i) => {
              return <Typography key={i}> {task.title}</Typography>;
            })}
          </Grid>

        </Grid>
      </Box>
    </>
  );
};

export default Progress;
