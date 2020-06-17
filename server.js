// require('express-async-errors')
const http = require('http');
const express = require('express');
const app = express();
const server = http.createServer(app);

const preMiddlewares = require('./src/middlewares/preMiddlewares');
const errorMiddlewares = require('./src/middlewares/errorMiddlewares');
const routes = require('./src/routes');
// const databaseConfig = require('./src/config');
const port = process.env.PORT;

// preMiddlewares(app);

// app.use('/api', routes())

app.use('/', (req, res) => {
  res.status(200).send("Fund my laptop is under construction");
})

errorMiddlewares(app)

server.listen(port, () => {
  console.log(`::: server listening on port ${port}. Open via http://localhost:${port}/`);

});

server.on('error', (error) => {
  console.log(`::> an error occiurred in our server: \n ${error}`);
});


module.exports = app