//Import styles
import { Tabs } from "@mui/material";
//Import components
import MainContainer from "./components/MainContainer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    // <Tabs sx={{ flexGrow: 1, h: "100vh", display: "flex" }}>
    <BrowserRouter>
      <MainContainer />
    </BrowserRouter>
    // </Tabs>
  );
}

export default App;
