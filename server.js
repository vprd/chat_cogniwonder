const express = require('express');
const app = express();
const compression = require('compression');

//app.listen will not work when using in socket.io
const cookieParser = require('cookie-parser');

const http = require('http').createServer(app);
const io = require('socket.io')(http);
// express middlewares
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

app.use(compression());
app.use(cors({
    // origin: "http://localhost:3000",
    origin: "*",
    credentials: true,
}));
app.use(cookieParser());
// api and other routes

const PORT = process.env.PORT || 8000;

const api = require('./src/routes/api')(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api route
app.use('/api', api);

// serve static files for react client
app.use(express.static(path.resolve(__dirname + '/client/build'), { maxAge: 31557600 }));

app.get('/*', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

http.listen(PORT, () => console.log('server started on:' + PORT));