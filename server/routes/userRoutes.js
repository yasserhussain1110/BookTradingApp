const User = require('../models/user');
const auth = require('../middleware/auth');

const addUserRoutes = app => {
  app.post('/users', (req, res) => {
    let user = new User(req.body);
    user.save()
      .then(() => {
        return user.generateAuthToken();
      })
      .then(token => {
        res.header('x-auth', token).status(201).send(user);
      })
      .catch(e => {
        res.status(400).send(e);
      });
  });

  app.post('/users/me', auth, (req, res) => {
    res.send(req.user);
  });

  app.post('/users/login', (req, res) => {
    let {email, password} = req.body;

    User.findByCreds(email, password)
      .then(user => {
        return user.generateAuthToken().then(token => {
          res.header('x-auth', token).send(user);
        });
      })
      .catch(e => {
        console.log(e);
        res.status(400).send();
      });
  });
};

module.exports = addUserRoutes;
