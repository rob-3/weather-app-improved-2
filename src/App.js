import "./App.css";
import { Button, TextField, Box } from "@material-ui/core";
import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  return (
    <Box m={5}>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Button variant="contained" color="primary">
        Click me!
      </Button>
    </Box>
  );
}

export default App;
