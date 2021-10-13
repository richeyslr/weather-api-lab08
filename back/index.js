const express = require("express");
const app = express();
const axios = require("axios");
const port = 3003;
const cors = require("cors");

app.use(cors());


app.get("/weather", async (req, res) => {
  try {
    const url = `http://api.weatherbit.io/v2.0/current?lat=${req.params.lat}&lon=${req.params.lon}&key=166433982f014efbad3f5c2171d8641a`
    const result = await axios.get(url);
    res.send(result.data.data[0])
  } catch (error) {
    console.log(error);
  }
});

app.get("/movies", async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const url = `http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=166433982f014efbad3f5c2171d8641a`
    const result = await axios.get(url);
    res.send(result.data)
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});