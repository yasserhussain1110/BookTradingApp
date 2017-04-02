require('./config/config');
require('./db/mongoose');

const express = require('express');
const app = express();

const port = process.env.PORT;


app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
