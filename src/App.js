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
  const [weeklyWeather, setWeeklyWeather] = useState([]);

  async function fetchCityData() {
    const data = await fetch(searchURL + text).then((blob) => blob.json());
    const city = data[0];
    const woeid = city.woeid;
    const weatherData = await fetch(weatherURL + woeid).then((blob) =>
      blob.json()
    );
    const weeklyWeatherData = weatherData.consolidated_weather.map((data) => {
      const weather = data.weather_state_name;
      const high = toFarenheit(data.max_temp);
      const low = toFarenheit(data.min_temp);
      return { weather, high, low };
    });
    setWeeklyWeather(weeklyWeatherData);
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
      <br />
      {weeklyWeather.map((weatherObj) => (
        <Box display="inline-block" m={1}>
          <Card elevation={3}>
            <CardContent>
              <Typography>{weatherObj.weather}</Typography>
              <Typography>High: {weatherObj.high}°F</Typography>
              <Typography>Low: {weatherObj.low}°F</Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
}

export default App;
