import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import cors from 'cors'

 class SignUp extends Component {
    state = {
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        registerState: false

    }

   

    handleChange = (e) =>{
       this.setState({
           [e.target.id] : e.target.value
       });
    }
    handleSubmit = (event) =>{
            var apiBaseUrl = "https://myblog-um.gigalixirapp.com";
            //To be done:check for empty values before hitting submit
            var self = this;
            var payload={
                "password":this.state.password,
                "username": this.state.username,
                "email_address":this.state.email,
                "first_name": this.state.firstName,
                "last_name":this.state.lastName
                
                
            }
            axios.post(apiBaseUrl+'/signup', payload)
           .then(function (response) {
               console.log("registration successfull");
               self.setState({
                registerState : true
            });

             
           })
           .catch(function (error) {
             console.log(error);
           });
          
        


        event.preventDefault();
       
    }

    render() {
        
        if (this.state.registerState === true) {
                return <Redirect to='/signin' />;
            }

        return (
            
            <div className="container">
                <form onSubmit={this.handleSubmit} autoComplete="off" className="white">
                    <h5 className="grey-text text-darken-3">Sign Up</h5>

                    <div className="input-field">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" autoComplete="new-password" onChange={this.handleChange}/>
                    </div>

                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="validate" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" autoComplete="new-password" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" id="firstName" className="validate" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" id="lastName" className="validate" onChange={this.handleChange}/>
                    </div>
                    
                    <div className="input-field">
                        <button className="btn red darken-3 waves-effect waves-light">Signup</button>
                    </div>
                </form> 
                
            </div>
        )
    }
}

export default SignUp
