export default {
  loggedIn(state)
  {
    state.isLoggedIn = true;
  },

  loggedOff(state)
  {
    state.isLoggedIn = false;
  },
  gotUser(state, user)
  {
    state.user = user;
  },
  gotToken(state, token) {
    state.token = token;
  },
};
