const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

app.use('/api', apiRouter);

module.exports = app;

/*

 ---- TODO ----

 1. create controllers for article and topics get requests
 2. create tests for end points
 3. how to use migrations properly for testing??
 4. error handling

*/
