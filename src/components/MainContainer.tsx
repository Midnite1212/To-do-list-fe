//import styles
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
//import component
import NavBar from "./NavBar";
import axios from "axios";
import { Task, TaskStatus } from "./Tasks/type";
import { Routes, Route } from "react-router-dom";
import Tasks from "./Tasks";
import Progress from "./Progress";
import { useEffect, useState } from "react";

const MainContainer: React.FC = () => {
  const [taskData, setTaskData] = useState([] as Task[]);

  const getData = async () => {
    try {
      const { data, status } = await axios.get(`${process.env.REACT_APP_URL}`);
      setTaskData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Container sx={{ height: "100vh" }}>
        <Grid container spacing={0}>
          <Grid item xs={9}>
            <Grid container height="100vh">
              <Grid item xs={12}>
                <NavBar allTasks={taskData} setTask={setTaskData} />
              </Grid>
              <Grid item xs={12}>
                <Routes>
                  <Route path="/daily" element={<Tasks tasks={taskData} setTasks={setTaskData} />} />
                  <Route
                    path="/weekly"
                    element={<Typography>test</Typography>}
                  />
                  <Route
                    path="*/monthly"
                    element={<Typography>test</Typography>}
                  />
                  <Route path="*" element={<Tasks tasks={taskData} setTasks={setTaskData} />} />
                </Routes>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Progress data={taskData} setData={setTaskData} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default MainContainer;
