import "./App.css";
import { Button, TextField, Box } from "@material-ui/core";

function App() {
  return (
    <Box m={5}>
      <TextField />
      <Button variant="contained" color="primary">
        Click me!
      </Button>
    </Box>
  );
}

export default App;
