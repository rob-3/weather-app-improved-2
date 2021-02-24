import "./App.css";
import {
  Button,
  TextField,
  Box,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const searchURL = "https://www.metaweather.com/api/location/search/?query=";
const weatherURL = "https://www.metaweather.com/api/location/";

function toFarenheit(celcius) {
  return Math.round(celcius * (9 / 5) + 32);
}

function App() {
  const [text, setText] = useState("");
  const [weatherObj, setWeather] = useState("");

  async function fetchCityData() {
    const data = await fetch(searchURL + text).then((blob) => blob.json());
    const city = data[0];
    const woeid = city.woeid;
    const weatherData = await fetch(weatherURL + woeid).then((blob) =>
      blob.json()
    );
    const weather = weatherData.consolidated_weather[0].weather_state_name;
    const high = toFarenheit(weatherData.consolidated_weather[0].max_temp);
    const low = toFarenheit(weatherData.consolidated_weather[0].min_temp);
    setWeather({ weather, high, low });
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
        <CardContent>
          <Typography>{weatherObj.weather}</Typography>
          <Typography>High: {weatherObj.high}°F</Typography>
          <Typography>Low: {weatherObj.low}°F</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
