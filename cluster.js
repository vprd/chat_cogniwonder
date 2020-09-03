var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Code to run if we're in a worker process
} else {
    require('./server')
}