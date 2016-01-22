const pm2 = require('pm2');

const instances = process.env.WEB_CONCURRENCY || -1; // Set by Heroku or -1 to scale to max cpu core -1
const maxMemory = process.env.WEB_MEMORY || 512;    // " " "

pm2.connect(function() {
  // pm2.start();
  pm2.start([{
    script    : './src/server-launcher.js',
    name      : 'solid-opinion-auth',
    exec_mode : 'cluster',
    node_args : '--abort_on_uncaught_exception --perf_basic_prof',
    instances : 1,
    max_memory_restart : maxMemory + 'M',
    env: {
      'APP_NAME': './auth',
      'PORT': 3000
    },
  }, {
    script: './src/server-launcher.js',
    name: 'solid-opinion-crud',
    // exec_mode : 'cluster',
    // node_args : '--abort_on_uncaught_exception --perf_basic_prof',
    instances : instances,
    max_memory_restart : maxMemory + 'M',
    env: {
      'APP_NAME': './crud',
      'PORT': 5000
    },
  }], function(err) {
    if (err) return console.error('Error while launching applications', err.stack || err);
    console.log('PM2 and application has been succesfully started');

    // Display logs in standard output
    pm2.launchBus(function(err, bus) {
      console.log('[PM2] Log streaming started');

      bus.on('log:out', function(packet) {
       console.log('[App:%s] %s', packet.process.name, packet.data);
      });

      bus.on('log:err', function(packet) {
        console.error('[App:%s][Err] %s', packet.process.name, packet.data);
      });
    });

  });
});
