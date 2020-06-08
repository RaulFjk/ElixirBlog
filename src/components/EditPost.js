import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { getToken, removeUserSession } from './utils/Common'


class EditPost extends Component {
    state = {
        post: null,
        title: '',
        content: '',
        postUpdated: false
    }

    componentDidMount() { 
        let id = this.props.match.params.post_id;
        let token = getToken();
        
        axios.get("https://myblog-pm.gigalixirapp.com/get_post_by_id", {
            headers: {"Authorization" : `Bearer ${token}`},
            params: {
             id: id
            } 
            }).then((res) => {
          this.setState({
        
            post: res.data.post
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
// Updates the post when user clicks the update button
    handleClick = (e) => {
        e.preventDefault();
            var apiBaseUrl = "https://myblog-pm.gigalixirapp.com/update_post";
            let token = getToken();

            if( this.state.title === '' && this.state.content === ''){
                var payload={
                title: this.state.post.title,
                content: this.state.post.content,
                author: this.state.post.author, 
                id: this.state.post.post_id
                };
            }
           if( this.state.title !== '' && this.state.content !== '' )
            {
                var payload={
                    title: this.state.title,
                    content: this.state.content,
                    author: this.state.post.author, 
                    id: this.state.post.post_id
                    };

            }

            if( this.state.content === ''){
                var payload={
                    title:this.state.title,
                    content: this.state.post.content,
                    author: this.state.post.author, 
                    id: this.state.post.post_id
                    };
        }

            if( this.state.title === ''){
                var payload={
                    title: this.state.post.title,
                    content: this.state.content,
                    author: this.state.post.author, 
                    id: this.state.post.post_id
                    };
        }
            
            var self = this;

            let config = { headers: {"Authorization" : `Bearer ${token}`} };
          
            axios.put(apiBaseUrl, payload, config)
            .then((response) => {
                self.props.history.push('/myPosts/');
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
    


    render() {

        if(this.state.post === null){
            return <div className="center"> Loading </div>
        }
        return (
          <div className="container textArea">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit Post</h5>
                    <div className='row'>
                    <div className="input-field col s12">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" className="validate" onChange={this.handleChange} defaultValue={this.state.post.title}/>
                    </div>
                    </div>
                    <div className="row">
                    <div className="input-field col s12">
                        <label htmlFor="content">Content</label> 
                        <textarea  id="content" className="materialize-textarea myTextArea"  onChange={this.handleChange} defaultValue={this.state.post.content}></textarea>
                    </div>    
                    </div>
                   
                    <div >
                        <button className="btn red darken-3 lighten-1 z-depth-0" onClick={(e) => {this.handleClick(e)}}>Update Post</button>
                    </div>
                </form> 
                
            </div>
        )
    }
}

export default EditPost