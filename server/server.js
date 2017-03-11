require('./config/config');
require('./db/mongoose');

const port = process.env.PORT;

const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/users', (req, res) => {
  let user = new User(req.body);
  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(user);
    })
    .catch(e=> {
      console.log(e);
      res.status(400).send(e);
    });
});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
