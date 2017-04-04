const User = require('../models/user');
const request = require('supertest');
const googleBooksAPI = require('google-books-search-2');

const options = {
  key: process.env.GOOGLE_API_KEY,
  limit: 30
};

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

const authorizeUser = (req) => {
  return new Promise((resolve, reject) => {
    if (req.session && req.session.identity) {
      let identity = req.session.identity;
      User.findByToken(identity.token)
        .then(user => {
          resolve(user);
        })
        .catch(e => {
          req.session.identity = null;
          reject("Not Authorized");
        });
    } else {
      reject("Not Authorized");
    }
  });
};

const addNonAPIRoutes = app => {
  app.get('/identity', handleIdentityIfFound, (req, res) => {
    authorizeUser(req)
      .then(user => {
        res.header('x-auth', req.session.identity.token).status(200).send(user);
      })
      .catch(() => {
        res.sendStatus(404);
      });
  });

  app.post('/signup', handleIdentityIfFound, (req, res) => {
    request(app)
      .post('/users')
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

  app.post('/logout', (req, res) => {
    authorizeUser(req).then(() => {
      request(app)
        .delete('/users/me/token')
        .set('x-auth', req.session.identity.token)
        .send()
        .end((err, apiRes) => {
          if (err) {
            return res.status(err.statusCode).send({error: err.error});
          }
          req.session.identity = null;
          req.session.destroy();
          res.status(200).send();
        });
    }).catch(e => {
      console.log(e);
      res.status(403).send();
    });
  });

  app.post('/searchBook', (req, res) => {
    authorizeUser(req)
      .then(() => {
        let title = req.body.title;
        return googleBooksAPI.search(title, options);
      })
      .then(googleResults => {
        let sendableResults =
          googleResults
            .filter(isBookDescriptionTruthy)
            .map(pullOfRequiredInfoFromBookResult);
        res.send(sendableResults);
      })
      .catch(e => {
        console.error(e);
        res.sendStatus(403);
      });
  });
};

const isBookDescriptionTruthy = book => {
  return !!book.description;
};

const pullOfRequiredInfoFromBookResult = book => {
  let {title, description, thumbnail} = book;
  return {
    title,
    description,
    thumbnailURL: thumbnail
  }
};

module.exports = addNonAPIRoutes;
