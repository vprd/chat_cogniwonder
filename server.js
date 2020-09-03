Function.prototype.clone = function () {
    var that = this;
    var temp = function () {
        return that.apply(this, arguments);
    };
    for (var key in this) {
        if (this.hasOwnProperty(key)) {
            temp[key] = this[key];
        }
    }
    return temp;
};
const log = console.log.clone()
let logger = false

const express = require('express');
const app = express();
const compression = require('compression');


//app.listen will not work when using in socket.io
const cookieParser = require('cookie-parser');

const server = require('http').createServer(app);

const io = require('socket.io')(server);
const debug = io.of('/debug');

debug.on('connection', (socket) => {
    logger = true
    socket.on('disconnect', () => logger = false)

    // test log
    setTimeout(() => console.log('hey from server'))
})

console.log = (...args) => {
    if (logger) {
        debug.emit('debug', args);
        log(...args)
    }
}


// express middlewares
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const allowedOrigins = require('./allowedOrigins.json');

app.use(cors());
// api and other routes
app.use(cookieParser());
app.use(compression());

const PORT = process.env.PORT || 8000;

const api = require('./src/routes/api')(io);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// api route
app.use('/api', api);

// serve static files for react client
const root = path.join(__dirname, 'client', 'build')
app.use('/assets/chat', express.static((root), { maxAge: 31557600 }));

app.get('/*', (req, res) => {
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile('index.html', { root });
});

server.listen(PORT, () => log('server started on:' + PORT));

// misc
// git add . && git commit -m update && git push && git push heroku master