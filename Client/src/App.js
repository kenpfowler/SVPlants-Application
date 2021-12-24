import PlantTable from "./components/plant-table.component";
import Header from "./components/header.component";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <Container maxWidth="lg" className={classes.root}>
        <Header />
        <PlantTable />
      </Container>
    </Provider>
  );
}

export default App;