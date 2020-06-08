import React, { Component } from "react";
import axios from 'axios'
import { getUser, getToken, removeUserSession } from './utils/Common'
import avatar from '../profile.png'
import CircularProgress from '@material-ui/core/CircularProgress';

class Profile extends Component {
    state = {
        username: getUser(),
        email:'',
        firstName:'',
        lastName:'',
        editable: false
    }

componentDidMount() {
  let token = getToken();

    axios.get('https://myblog-prm.gigalixirapp.com/get_profile_by_username',{
      headers: {"Authorization" : `Bearer ${token}`},
        params: {
         username: this.state.username},
    }).then(response => {
       
        this.setState({
                 username: response.data.profile.username,
                 email : response.data.profile.email_address,
                 firstName: response.data.profile.first_name,
                 lastName : response.data.profile.last_name
                });
        
     }).catch(error => {
      if (error.response.status === 401) {
        removeUserSession();
        this.props.history.push('/signin');
       }
    });


}

// This function updates the state of the componet by observing every change in the input fields
handleChange = (e) =>{
  this.setState({
      [e.target.id] : e.target.value
  });
}

// Makes form editable if editable false and disables edit mode if clicked again
handleEditButton = () =>{
  if(this.state.editable){
  this.setState({
    editable: false
  });
}

if(this.state.editable === false){
  this.setState({
    editable: true
  });
}

}

//Updates Profile by clicking the update button
handleClick = (e) => {
  e.preventDefault();
      var apiBaseUrl = "https://myblog-prm.gigalixirapp.com/update_profile";
      let token = getToken();
      var self = this;

      var payload={
        username: this.state.username,
        email_address: this.state.email,
        first_name: this.state.firstName, 
        last_name: this.state.lastName
    }

      let config = { headers: {"Authorization" : `Bearer ${token}`} };
    
      axios.put(apiBaseUrl, payload, config)
      .then((response) => {
          this.setState({
            editable: false
          });
      }).catch(error => {
        if (error.response.status === 401) {
          removeUserSession();
          this.props.history.push('/signin');
         }
      });
}
    
  render() {

    if (this.state.firstName && this.state.editable === false){

    return (
      <div className="container">
        <div className="center">
            <img className="circle" height="200px" width="200px" src={avatar}/>
        </div>
        <form className="col s12 profileButton">
          <div className="row">
            <div className="container">
              <a className="btn-floating btn-large waves-effect waves-light red darken-3" onClick={this.handleEditButton}><i className="material-icons">edit</i></a>
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input disabled id="firstName" type="text" value={this.state.firstName}  />

            </div>
            </div>
            <div className="row">
            <div >
              <label htmlFor="lastName">Last Name</label>
              <input disabled id="lastName" type="text" value={this.state.lastName}  />
              
            </div>
          </div>

          <div className="row">
            <div > 
              <label htmlFor="email">Email</label>
              <input disabled id="email" type="text" value={this.state.email} autoComplete="new-password"  />
            </div>
          </div>
        </form>
      </div>
    );
  }

  if (this.state.firstName && this.state.editable){

    return (
      <div className="container">
        <div className="center">
            <img className="circle" height="200px" width="200px" src={avatar}/>
        </div>
        <form className="col s12 profileButton">
          <div className="row">
            <div className="container">
              <a className="btn-floating btn-large waves-effect waves-light red darken-3" onClick={this.handleEditButton}><i className="material-icons">edit</i></a>
            </div>
          </div>
          <div className="row">
            <div>
              <label htmlFor="firstName">First Name</label>
              <input  id="firstName" type="text" defaultValue={this.state.firstName} onChange={this.handleChange}  />

            </div>
            </div>
            <div className="row">
            <div >
              <label htmlFor="lastName">Last Name</label>
              <input id="lastName" type="text" defaultValue={this.state.lastName} onChange={this.handleChange}  />
              
            </div>
          </div>

          <div className="row">
            <div > 
              <label htmlFor="email">Email</label>
              <input  id="email" type="text" defaultValue={this.state.email} onChange={this.handleChange} autoComplete="new-password"  />
            </div>
          </div>
            <div >
              <button className="btn red darken-3 lighten-1 z-depth-0" onClick={(e) => {this.handleClick(e)}}>Update Profile</button>
            </div>
        </form>
      </div>
    );
  }

  return <div className="center"><CircularProgress disableShrink /></div>;

  }
}
export default Profile;
