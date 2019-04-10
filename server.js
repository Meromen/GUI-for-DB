const express        = require('express');
const bodyParser     = require('body-parser');
const path           = require('path');
const app            = express();
const cors           = require('cors');
const sqlite3        = require('sqlite3').verbose();
const port           = 8000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./app/routes/bdtest')(app, sqlite3)

app.use(cors());

// Server setup
app.listen(port, () => {
    console.log(`My port is ${port}` )
})

app.use(express.static('client'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/dbClient', 'index.html'));
});