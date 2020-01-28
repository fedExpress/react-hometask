const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const {getItems, getItem} = require('./routes/index');

const app = express();
const port = process.env.PORT || 5000;

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'YourRootPassword',
    database: 'items'
});
mc.connect();
global.mc = mc;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.get('/api/items', getItems);
app.get('/api/item', getItem);


app.listen(port, () => console.log(`Listening on port ${port}`));