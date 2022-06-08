//import styles
import { Container } from "@mui/system";
import { Grid, Typography } from "@mui/material";
//import component
import NavBar from "./NavBar";

const MainContainer: React.FC = () => {
  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <NavBar />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Typography> test </Typography>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default MainContainer;
