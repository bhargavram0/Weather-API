const express = require("express")
const axios = require("axios")
const dotEnv = require('dotenv')

const app = express();
dotEnv.config()
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});



app.get("/weather", async (req, res) => {
  const city = req.query.city;
  const apiKey = "YOUR_APIKEY"; 
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  res.render("index", { weather, error });
});


PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
  console.log(`Server is running at ${PORT}`)
})

