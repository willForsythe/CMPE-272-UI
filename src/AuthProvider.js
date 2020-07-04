import React from 'react';
import AuthContext from './AuthContext';

class AuthProvider extends React.Component {
    constructor(props){
      super(props);
      this.state = {  
        profile: null,
        idToken: null,
        accessToken: null
      };
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getUser = this.getUser.bind(this);
      this.setUser = this.setUser.bind(this);
      this.clear = this.clear.bind(this);
    }
  
    isAuthenticated(){
      return this.state.profile != null && this.state.idToken != null && this.state.accessToken != null;
    }

    getUser(){
      
      // if(!this.isAuthenticated()){
      //     return null;
      // }
      var returnObject = {
          profile: this.state.profile,
          idToken: this.state.idToken,
          accessToken: this.state.accessToken
      }
      console.log("GETTING USER", returnObject);
      return returnObject;
    }

    setUser(profile, idToken, accessToken){
        this.setState({profile: profile, idToken: idToken, accessToken: accessToken });
        console.log("SETTING USER", this.getUser());
    }
  
    clear(){
      this.setState({  
        profile: null,
        idToken: null,
        accessToken: null
      });
    }

    render() {
      return (
        <AuthContext.Provider
          value={{
            profile: this.state.profile,
            idToken: this.state.idToken,
            accessToken: this.state.accessToken,
            isAuthenticated: this.isAuthenticated,
            getUser: this.getUser,
            setUser: this.setUser,
            clear: this.clear
           }}
        >
          {this.props.children}
        </AuthContext.Provider>
      )
    }
  }
    export default AuthProvider;