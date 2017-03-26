require('./config/config');
require('./db/mongoose');

const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const LokiStore = require('connect-loki')(session);
const app = express();


app.use(session({
  secret: 'abracadabra',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 15 * 24 * 60 * 60 * 1000  /* equivalent to 15 days */
  },
  store: new LokiStore({
    autosave: false
  })
}));

app.use(bodyParser.json());

/* Set up API / Other Backend Routes */
require('./routes/userRoutes')(app);
require('./routes/bookRoutes')(app);
require('./routes/tradeRequestRoutes')(app);
require('./routes/nonAPIRoutes')(app);


/* Set up development server if required */
if (process.env.NODE_ENV === "development") {
  console.log("Running In Development");
  require('./tools/setupDev')(app);
}
/* Or serve static assets in production */
else if (process.env.NODE_ENV === "production") {
  console.log("Running In Production");
}

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});

module.exports = app;

