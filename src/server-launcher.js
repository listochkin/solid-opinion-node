'use strict';

console.log('SERVER');

const appName = process.env.APP_NAME;
const port = process.env.PORT;
console.log('Config', appName, port);

const server = require(appName);

server.listen(port, () => {
  console.log('started ' + appName);
});

// todo: handle SIGTERM
