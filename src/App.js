import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NavbarLog from './components/NavbarLog';
import Post from './components/Post';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import NewPost from './components/NewPost' ;
import SignIn2 from './components/auth/SignIn2';
import PrivateRoute from './components/utils/PrivateRoute'
import PublicRoute from './components/utils/PublicRoute'
import { getToken } from './components/utils/Common'
import Profile from './components/Profile'
import MyPosts from './components/MyPosts'
import EditPost from './components/EditPost'
import HomeTest from './components/HomeTest';

class App extends Component {
  state = {
    userAuthenticated : false
  };

  checkIfAuthenticated = () => {

    if ( getToken ){
      this.setState({
        userAuthenticated : true
      });
    }

  }


  render () {

    return (
    <BrowserRouter>
      <div className="App"> 
    <Navbar className="nav" checkIfAuthenticated={this.checkIfAuthenticated}/>
      <Switch>
        <PrivateRoute exact path ='/'  component={ Home } />
        <PrivateRoute exact path ='/myPosts'  component={ MyPosts } />
        <PrivateRoute path='/editPost/:post_id' component={ EditPost } />
        <Route path="/signin"  render={(props) => <SignIn2 {...props} checkIfAuthenticated = {this.checkIfAuthenticated}/>}/>
        <Route path='/signup'    component={SignUp}/>
        <PrivateRoute path='/posts/:post_id' component={ Post } />
        <Route path='/profile'    component ={ Profile } />
        <PrivateRoute path='/newpost'  component={NewPost}/>
      </Switch>
      </div>
    </BrowserRouter> );
  
} 

}

export default App;
