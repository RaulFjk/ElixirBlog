import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { getUser, getToken, removeUserSession } from './utils/Common'

 class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: getUser(),
        postCreated: false

    }

    // This function updates the state of the componet by observing every change in the input fields
    handleChange = (e) =>{
       this.setState({
           [e.target.id] : e.target.value
       });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
       
    }
// Creates new post
    handleClick= (e) =>{
            var apiBaseUrl = "https://myblog-pm.gigalixirapp.com";
            let token = getToken();
            var self = this;
            var payload={
                title: this.state.title,
                content: this.state.content,
                author: this.state.author, 
            }
            
            let config = { headers: {"Authorization" : `Bearer ${token}`} };
            axios.post(apiBaseUrl+'/create_post',payload ,config )
           .then(function (response) {
             self.setState({
                postCreated: true
             });
           }).catch(error => {
            if (error.response.status === 401) {
              removeUserSession();
              this.props.history.push('/signin');
             }
             else{
                alert("Something went wrong!");
             }
          });
          

       
    }

// If post created user will be redirected to home page
    render() {
        if( this.state.postCreated === true ){
            return <Redirect to='/' />
        }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">New Post</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" className="validate" onChange={this.handleChange}/>
                    </div>
                    <div className="input-field" >
                        <label htmlFor="content">Content</label>
                        <textarea  id="content" className="materialize-textarea"  onChange={this.handleChange}></textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn red darken-3 lighten-1 z-depth-0" onClick={this.handleClick}>Post</button>
                    </div>
                </form> 
                
            </div>
        )
    }
}

export default NewPost
