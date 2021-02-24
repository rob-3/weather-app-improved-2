import "./App.css";
import { Button, TextField, Box } from "@material-ui/core";
import { useState } from "react";

const searchURL = "https://www.metaweather.com/api/location/search/?query=";
const weatherURL = "https://www.metaweather.com/api/location/";

function App() {
  const [text, setText] = useState("");

  async function fetchCityData() {
    const data = await fetch(searchURL + text).then((blob) => blob.json());
    const city = data[0];
    const woeid = city.woeid;
    const weatherData = await fetch(weatherURL + woeid).then((blob) =>
      blob.json()
    );
    console.log(weatherData);
  }

  return (
    <Box m={5}>
      <TextField
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <Button variant="contained" color="primary" onClick={fetchCityData}>
        Click me!
      </Button>
    </Box>
  );
}

export default App;
