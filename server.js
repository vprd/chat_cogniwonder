const express = require('express');
const app = express();
const path = require('path');
const http = require('http').createServer(app);
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//serve static
app.use(express.static(path.resolve(__dirname + '/client/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

http.listen(PORT, () => console.log('server started'));
