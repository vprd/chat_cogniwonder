const app = require('express')();
const server = require('http').createServer(app);

const bodyParser = require('body-parser');
const path = require('path');

const api = require('./src/routes/api')(server);

const PORT = process.env.PORT || 8000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);


//serve static
app.use(express.static(path.resolve(__dirname + '/client/build')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
});

server.listen(PORT, () => console.log('server started'));
