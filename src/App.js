import React, { Component } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Default from './components/Default'
import Cart from './components/Cart'
import Modal from './components/Modal'
import Login from './components/Login'
import Logout from './components/Logout'
import checkout from './components/checkout'
import Fulfill from './Fulfill'
import Callback from './Callback/Callback'
import PrivateRoute from './PrivateRoute'
import AuthContext from './AuthContext';

class App extends Component {
  static contextType = AuthContext;

  constructor(props){
    super(props);
    this.state = {};
    this.handleAuthentication= this.handleAuthentication.bind(this);
  }

  handleAuthentication(nextState, replace) {
    let context = this.context;
    if (/access_token|id_token|error/.test(nextState.location.hash)) {
      this.props.auth.handleAuthentication((idToken, accessToken, profile) => {
        this.setState({loggedIn: true, username: profile.name, token: accessToken});
        context.setUser(profile, idToken, accessToken);
      });
    }
  }

  // goTo(route) {
  //   this.props.history.replace(`/${route}`)
  // }

  // componentWillMount(){
  //   var access_token = localStorage.getItem('access_token');
  //   var id_token = localStorage.getItem('id_token');
  //   var username = localStorage.getItem('username');
  //   if(access_token != null && id_token != null && username != null){
  //       this.setState({loggedIn: true, username: username, token: access_token}); 
  //   }
  //   else{
  //       this.setState({loggedIn: false}); 
  //   } 
  // }

  render() {    
    return (
      <React.Fragment>
        <Navbar auth={this.props.auth} username={this.state.username} />
        <Switch>
          <PrivateRoute path="/" component={ProductList} auth={this.props.auth} exact />
          <PrivateRoute path="/details" component={Details} auth={this.props.auth}/>
          <PrivateRoute path="/cart" component={Cart} auth={this.props.auth}/>
          <PrivateRoute path="/Login" component={Login} auth={this.props.auth}/>
          <Route path="/Logout" component={Logout}/>
          <PrivateRoute path="/checkout" component={checkout} auth={this.props.auth}/>
          <PrivateRoute path="/Fulfill" component={Fulfill} auth={this.props.auth}/>
          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    )
  }
}

export default App;

// export default React.forwardRef((props, ref) => (
//   <AuthConsumer>
//     {value => <App {...props} context={value} ref={ref} />}
//   </AuthConsumer>
// ));