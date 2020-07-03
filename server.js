const express = require('express');
const app = express();
//app.listen will not work when using in socket.io
const server = require('http').createServer(app);

// express middlewares
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
app.use(cors());

// api and other routes
const api = require('./src/routes/api')(server);//the http server instnace is passed to api for socket.io

const hostname = '127.0.0.1';
const PORT = 3000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api route
app.use('/api', api);

// serve static files for react client
app.use(express.static(path.resolve(__dirname + '/client/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

server.listen(PORT, hostname, () => console.log('server started on:' + PORT));