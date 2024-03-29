import express from "express";
import axios from "axios";

// for future use
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://api.balldontlie.io/v1";
const API_KEY = "3ead9e65-a189-4b8c-9262-c31ffa2548db";
const config = {
  headers: { Authorization: API_KEY },
};

app.use(express.static("public"));

// for future use
app.use(bodyParser.urlencoded({ extended: true }));

function getRandomID() {
    return Math.floor(Math.random() * 3092);
}
function getSeason() {
    const date = new Date();
    const month = date.getMonth();
    if (month > 8) {
        return date.getFullYear();
    } else {
        return date.getFullYear() - 1;
    }
}

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.post("/get-player", async (req, res) => {
    const id = getRandomID();
    const season = getSeason();
    try {
        const result = await axios.get(API_URL + "/players/" + id, config);
        const stats = await axios.get(API_URL + "/season_averages/?season=" +  season + "&player_ids[]=" + id, config);
        res.render("index.ejs", { content: result.data, stats: stats.data});
    } catch (error) {
        res.render("index.ejs", { content: JSON.stringify(error.response.data) });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });