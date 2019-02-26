const express = require('express');
const apiRouter = require('./routes/api');

const app = express();

app.use('/api', apiRouter);

module.exports = app;

/*

 ---- TODO ----

 3. how to use migrations properly for testing??
 4. error handling

*/
