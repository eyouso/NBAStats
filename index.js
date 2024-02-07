import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://www.balldontlie.io/api/v1/";

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });