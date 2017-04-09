import cluster from 'cluster';
import os from 'os';

function createWorker () {
  const worker = cluster.fork();

  // worker management master-level
  worker.on('message', function masterMsg (message) {
    switch (message.type) {
      case 'error':
        console.log(`Killing worker ${message.from} due to an error`);
        worker.disconnect();
        setTimeout(() => worker && worker.kill('SIGKILL'), 5000);
        break;
      default:
        console.log(`Master received message ${message.type} from worker ${message.from}`);
    }
  });

  return worker;
}

// add node cluster multithreading when supported (no windows support)
if (cluster.isMaster) {
  const numCores = os.platform() !== 'win32' ? os.cpus().length : 1;

  console.log(`Master cluster setting up ${numCores} workers`);
  for (let i = 0; i < numCores; i++) {
    createWorker();
  }

  cluster.on(
    'online',
    worker => console.log(`Worker ${worker.process.pid} is online`)
  );

  // reconnect if needed
  cluster.on('exit', function onExit (worker, code, signal) {
    console.log(`Worker ${worker.process.pid} died. Code: ${code}, and signal: ${signal} Restarting in 1s...`);
    setTimeout(createWorker, 1000);
  });
} else {
  // require pipe server
  require('./server');

  // worker management worker-level
  process.on('message', function workerMsg (message) {
    switch (message.type) {
      default:
        console.log(`Worker ${process.pid} received message ${message.type}`);
    }
  });

  process.on('error', function onError () {
    console.log(`Worker ${process.pid} experienced an error`);
    process.send({ type: 'error', from: process.pid });
  });

  const ignore = () => 'Ignoring direct signals to worker';
  process.on('SIGTERM', ignore);
  process.on('SIGINT', ignore);
}
