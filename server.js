const express = require('express');
const app = express();

//app.listen will not work when using in socket.io

const http = require('http').createServer(app);
const io = require('socket.io')(http);
// express middlewares
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(cors());
// api and other routes

const PORT = process.env.PORT || 8000;

io.on('connection', socket => {
    console.log('a connection made');
    socket.emit('hey', 'hey');
});

const api = require('./src/routes/api')(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api route
app.use('/api', api);

// serve static files for react client
app.use(express.static(path.resolve(__dirname + '/client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

http.listen(PORT, () => console.log('server started on:' + PORT));
