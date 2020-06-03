import React, { Component, useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import { setUserSession } from '../utils/Common'

import axios from 'axios';

class SignIn2 extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            loginStatus: false,
            error: ''
    
        }
  }
    // state = {
    //     username: '',
    //     password: '',
    //     loginStatus: false,
    //     error: ''

    // }

    


    handleChange = (e) =>{
       this.setState({
           [e.target.id] : e.target.value
       });
    }
    handleSubmit = (e) =>{
        e.preventDefault();

        axios.post('https://myblog-um.gigalixirapp.com/login',{
            username: this.state.username, password: this.state.password
    }).then(response => {
        setUserSession(response.data, this.state.username);
        this.props.checkIfAuthenticated();
         console.log(response.data);
         this.setState({
                 loginStatus : true
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
     
        
    // axios.post('https://myblog-um.gigalixirapp.com/login',{
    //     headers: {
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //     withCredentials: true,
    //     params: {
    //      username: this.state.email, password: this.state.password },
    // }).then(response => {
    //     setUserSession(response.data, this.state.email);
    //     // this.props.history.push('/');
    // //    this.setState({
    // //      loginStatus : true
    // //     });
    //      console.log(response.data);
    //      this.setState({
    //              loginStatus : true
    //             });
        
    //  }).catch(error => {
    //   if (error.response.status === 401) {
    //     this.setState({
    //         error : error.response.data.message
    //    });}
    //   else {
    //     this.setState({
    //         error : 'Something went wrong. Please try again later.'
    //    });
    //   }
    // });
     
    }




    render() {
        if (this.state.loginStatus ) {
            return <Redirect to='/' />;
        }
        return (
            <div className="row">
                <div className="col s12 m4 offset-m4">
                    <div className="card">
                        <div className="card-action transparent red darken-3 white-text">
                            <h3>Welcome</h3>
                        </div>

                        <div className="card-content">
                            <div className="input-field">
                                <label htmlFor="username" >Username</label>
                                <input type="text" id="username"  onChange={this.handleChange}/>
                            </div><br/>

                            <div className="input-field">
                                <label htmlFor="password " >Password</label>
                                <input type="password" id="password" onChange={this.handleChange}/>
                            </div><br/>

                            <div className="form-field">
                            <button className="btn pink lighten-1 z-depth-0" onClick={this.handleSubmit}>Login</button>
                            </div><br/>

                            <div className="form-field">
                                <NavLink to="/signup">Don't have an account?</NavLink>
                            </div><br/>

                        </div>


                    </div>

                </div>               
            </div>
        )
    }
}

export default SignIn2
