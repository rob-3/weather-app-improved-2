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
    const high = weatherData.consolidated_weather[0].max_temp;
    const low = weatherData.consolidated_weather[0].min_temp;
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
          <Typography>{weatherObj.high}</Typography>
          <Typography>{weatherObj.low}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default App;
