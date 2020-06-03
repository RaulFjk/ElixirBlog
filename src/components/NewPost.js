import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';

 class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: ' ',
        postCreated: false

    }

    handleChange = (e) =>{
       this.setState({
           [e.target.id] : e.target.value
       });
    }
    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state);

        // https://myblog-pm.gigalixirapp.com/create_post?title=post1&content=post1 content&author=boss
    }

    handleClick= (e) =>{
            var apiBaseUrl = "https://myblog-pm.gigalixirapp.com";
            
            var self = this;
            var payload={
                "title":this.state.title,
                "content": this.state.content,
                "author": "rduma", 
            }
            axios.post(apiBaseUrl+'/create_post', payload)
           .then(function (response) {
             console.log(response);
             self.setState({
                postCreated: true
             });
           })
           .catch(function (error) {
             console.log(error);
            });
          

        // https://myblog-pm.gigalixirapp.com/create_post?title=post1&content=post1 content&author=boss
    }


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
                        <button className="btn pink lighten-1 z-depth-0" onClick={this.handleClick}>Post</button>
                    </div>
                </form> 
                
            </div>
        )
    }
}

export default NewPost
