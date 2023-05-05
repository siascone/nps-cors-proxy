const express = require("express");
const cors = require("cors");
const axios = require("axios");

if (process.env.NODE_ENV === "development") {
    console.log('in development mode')
    require("dotenv").config();
}

const app = express();

app.use(cors());

app.get("/", (req, res) => {
    // api url format domain + path + ? + api_key=key + 
    if (req.query.api_path) {
        let api_key = `?api_key=${process.env.API_KEY}`
        let api_path = req.query.api_path
        console.log(api_path)
        let url = "https://developer.nps.gov/api/v1/"
        let fetchUrl = `${url}${api_path}${api_key}`
        console.log(fetchUrl)
        axios.get(fetchUrl)
            .then(resBody => res.send(resBody.data));
    } else {
        res.send("Hello World!");
    }
});

app.listen(5001, () => {
    console.log("Listening on PORT: 5001")
})