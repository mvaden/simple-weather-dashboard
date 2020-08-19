if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} 

const API_KEY = process.env.API_KEY;
const express = require('express');
const app = express();
const axios = require('axios');
const port = 3100 || process.env.PORT;

app.use(express.json());
app.use(express.static('public'));

app.post('/weather', (req, res) => {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${req.body.latitude},${req.body.longitude}`;
    axios({
        url: url,
        responseType: 'json',
    })
    .then(data => res.json(data.data.current))
    .catch(err => console.error(err));
});

app.listen(port, () => {
    console.log(`Server is running on Port ${port}.`);
});

