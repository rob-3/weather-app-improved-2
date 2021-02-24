import "./App.css";
import { Button, TextField, Box, Card, CardContent } from "@material-ui/core";
import { useState } from "react";

const searchURL = "https://www.metaweather.com/api/location/search/?query=";
const weatherURL = "https://www.metaweather.com/api/location/";

function App() {
  const [text, setText] = useState("");
  const [weather, setWeather] = useState("");

  async function fetchCityData() {
    const data = await fetch(searchURL + text).then((blob) => blob.json());
    const city = data[0];
    const woeid = city.woeid;
    const weatherData = await fetch(weatherURL + woeid).then((blob) =>
      blob.json()
    );
    const weather = weatherData.consolidated_weather[0].weather_state_name;
    setWeather(weather);
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
      <Card>
        <CardContent>{weather}</CardContent>
      </Card>
    </Box>
  );
}

export default App;
