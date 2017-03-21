require('./config/config');
require('./db/mongoose');

const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  console.log("Running In Development");
  require('./tools/setupDev')(app);
} else if (process.env.NODE_ENV === "production") {
  console.log("Running In Production");
}

require('./routes/userRoutes')(app);
require('./routes/bookRoutes')(app);
require('./routes/tradeRequestRoutes')(app);

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;

