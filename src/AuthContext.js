import React from 'react';
export default React.createContext({
  profile: null,
  idToken: 'abcd',
  accessToken: 'efgh',
  isAuthenticated: () => {},
  getUser: () => {},
  setUser: () => {},
  clear: () => {}
});
