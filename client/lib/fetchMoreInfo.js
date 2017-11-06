export const getIdentity = function () {
  const token = localStorage.getItem('auth-token');
  if (token) {
    return this.$http.post('/users/me', {}, {
      headers: {
        'x-auth': token
      }
    }).then(res => {
      const user = res.body;
      this.$store.commit('loggedIn');
      this.$store.commit('gotUser', user);
      this.$store.commit('gotToken', token);
    })
  } else {
    return Promise.reject(new Error('No Auth Token'));
  }
};

export const getBooks = function () {
  this.$http.get('/books').then(res => {
    this.$store.commit('resetBooks', res.body);
  }).catch(e => console.log("weird error", e));
};

export const getTradeRequestsByMe = function () {
  this.$http.get('/tradeRequests/byMe', {
    headers: {
      'x-auth': this.token
    }
  }).then(res => {
    this.$store.commit('gotTradeRequestsByMe', res.body);
  }).catch(e => console.log(e));
};

export const getTradeRequestsForMe = function () {
  this.$http.get('/tradeRequests/forMe', {
    headers: {
      'x-auth': this.token
    }
  }).then(res => {
    this.$store.commit('gotTradeRequestsForMe', res.body);
  }).catch(e => console.log(e));
};

export const signup = function (email, password) {
  return this.$http.post('/users', {email, password})
    .then(res => {
      let token = res.headers.get('x-auth');
      let user = res.body;
      this.$store.commit('loggedIn');
      this.$store.commit('gotUser', user);
      this.$store.commit('gotToken', token);
    })
    .catch(e => {
      console.log(e.body.errors);
      throw e;
    });
};

export const login = function (email, password) {
  return this.$http.post('/users/login', {email, password})
    .then(res => {
      let token = res.headers.get('x-auth');
      let user = res.body;
      this.$store.commit('loggedIn');
      this.$store.commit('gotUser', user);
      this.$store.commit('gotToken', token);
      localStorage.setItem('auth-token', token);
    })
    .catch(e => {
      console.log(e.body.errors);
      throw e;
    });
};
