import auth0 from 'auth0-js';
import history from './History';
import { CONFIG } from './Constants';

export default class Auth {

  constructor(){
    this.login = this.login.bind(this);
    this.state = {};
  }
  
  auth0 = new auth0.WebAuth({
    domain: CONFIG.domain,
    clientID: CONFIG.clientId,
    redirectUri: CONFIG.callbackUrl,
    responseType: 'token id_token',
    scope: 'openid profile email',
    audience: CONFIG.audience
  });

  login() {
    this.auth0.authorize();
  }

  getAccessToken = (callback) => {
    return localStorage.getItem('access_token');
  }

  // parses the result after authentication from URL hash
  handleAuthentication = (callback) => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult, callback);
        history.replace('/');
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession = (authResult, callback) => {
    var app = this;
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.fetchProfile(authResult.accessToken, function(err, profile){
      if(err){
        alert('Error');
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      callback(authResult.idToken, authResult.accessToken, profile);
      localStorage.setItem('username', profile.name);
    })
    // navigate to the home route
    history.replace('/');
  }

  // removes user details from localStorage
  logout = (callback) => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('profile');
    // navigate to the home route
    document.location.href = 'https://'+CONFIG.domain+'/v2/logout?returnTo='+CONFIG.logoutUrl
    //history.replace('/');
  }

  fetchProfile = (accessToken, cb) => {
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      cb(err, profile);
    });
  }

  getProfile = () => {
    var profile = JSON.parse(localStorage.getItem('profile'));
    return profile;
  }

  // checks if the user is authenticated
  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}