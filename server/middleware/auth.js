const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (req, res, next) => {
  let token = req.get('x-auth');
  User.findByToken(token).then(user => {
    if (!user) {
      return Promise.reject("No such user");
    }

    req.user = user;
    req.token = token;
    next();
  }).catch(e => {
    res.status(401).send();
  });
};

module.exports = auth;
