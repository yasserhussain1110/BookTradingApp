const express = require('express');
const app = express();
require('./config/config');



const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
