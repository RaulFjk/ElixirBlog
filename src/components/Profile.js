import React, { Component } from "react";
import axios from 'axios'
import { getUser } from './utils/Common'
import avatar from '../profile.png'
import CircularProgress from '@material-ui/core/CircularProgress';

class Profile extends Component {
    state = {
        username: getUser(),
        email:'',
        firstName:'',
        lastName:''
    }

componentDidMount() {

    axios.get('https://myblog-prm.gigalixirapp.com/get_profile_by_username',{
        params: {
         username: this.state.username},
    }).then(response => {
        console.log(response);
        this.setState({
                 username: response.data.profile.username,
                 email : response.data.profile.email_address,
                 firstName: response.data.profile.first_name,
                 lastName : response.data.profile.last_name
                });
        
     }).catch(error => {
      if (error.response.status === 401) {
        this.setState({
            error : error.response.data.message
       });}
      else {
        this.setState({
            error : 'Something went wrong. Please try again later.'
       });
      }
    });


}
    
  render() {

    if (this.state.firstName){

    return (
      <div className="container">
        <div className="center">
            <img className="circle" height="200px" width="200px" src={avatar}/>
        </div>
        <form className="col s12">
          <div className="row">
            <div>
              <label htmlFor="first_name">First Name</label>
              <input disabled id="first_name" type="text" value={this.state.firstName} className="validate" />

            </div>
            </div>
            <div className="row">
            <div >
              <label htmlFor="last_name">Last Name</label>
              <input disabled id="last_name" type="text" value={this.state.lastName} className="validate" />
              
            </div>
          </div>

          <div className="row">
            <div > 
              <label htmlFor="email">Email</label>
              <input disabled id="email" type="text" value={this.state.email} autoComplete="new-password" className="validate" />
            </div>
          </div>
        </form>
      </div>
    );
  }

  return <div className="center"><CircularProgress disableShrink /></div>;

  }
}
export default Profile;
