const User = require('../models/user');
const request = require('supertest');

const handleIdentityIfFound = (req, res, next) => {
  if (req.session && req.session.identity) {
    let identity = req.session.identity;
    User.findByToken(identity.token)
      .then(user => {
        res.header('x-auth', identity.token).status(200).send(user);
      })
      .catch(e => {
        req.session.identity = null;
        next();
      });
  } else {
    next();
  }
};

const addNonAPIRoutes = app => {
  app.get('/identity', handleIdentityIfFound, (req, res) => {
    res.sendStatus(404);
  });

  app.post('/login', handleIdentityIfFound, (req, res) => {
    request(app)
      .post('/users/login')
      .send(req.body)
      .end((err, apiRes) => {
        if (err) {
          return res.status(err.statusCode).send({error: err.error});
        }
        let user = apiRes.body;
        let token = apiRes.headers['x-auth'];
        let identity = {
          _id: user._id,
          token
        };
        req.session.identity = identity;
        res.status(apiRes.statusCode).header('x-auth', token).send(apiRes.body);
      });
  });
};

module.exports = addNonAPIRoutes;
