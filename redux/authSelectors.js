const getUsers = state => state.auth.users;
const getLoggedUserId = state => state.auth;
const getLoggedUser = state => getUsers(state)[getLoggedUserId(state)];
