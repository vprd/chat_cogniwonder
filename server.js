const express = require('express');
const app = express();

//app.listen will not work when using in socket.io

const http = require('http').createServer(app);

// express middlewares
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

process.env.ENVIRONMENT === 'local' && app.use(cors());
// api and other routes
const api = require('./src/routes/api')(http);//the http server instnace is passed to api for socket.io

const PORT = process.env.PORT || 8000;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api route
app.use('/api', api);

// serve static files for react client
app.use(express.static(path.resolve(__dirname + '/client/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

setTimeout(()=>{
    http.listen(PORT, () => console.log('server started on:' + PORT));
})