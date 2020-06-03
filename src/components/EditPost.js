import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';


class EditPost extends Component {
    state = {
        post: null,
        title: '',
        content: '',
        postUpdated: false
    }

    componentDidMount() { 
        let id = this.props.match.params.post_id;
    
        
        axios.get("https://myblog-pm.gigalixirapp.com/get_post_by_id", {
            params: {
             id: id
            } 
            }).then((res) => {
          this.setState({
        
            post: res.data.post
          });
        });
    
        
    }

    handleChange = (e) =>{
        this.setState({
            [e.target.id] : e.target.value
        });
     }

    handleClick = (e) => {
        e.preventDefault();
            var apiBaseUrl = "https://myblog-pm.gigalixirapp.com/update_post";

            if( this.state.title === '' && this.state.content === ''){
                var payload={
                "title":this.state.post.title,
                "content": this.state.post.content,
                "author": this.state.post.author, 
                "id": this.state.post.post_id
                };
            }

            if( this.state.content === ''){
                var payload={
                    "title":this.state.title,
                    "content": this.state.post.content,
                    "author": this.state.post.author, 
                    "id": this.state.post.post_id
                    };
        }

            if( this.state.title === ''){
                var payload={
                    "title":this.state.post.title,
                    "content": this.state.content,
                    "author": this.state.post.author, 
                    "id": this.state.post.post_id
                    };
        }
            
            var self = this;
          
            axios.put("https://myblog-pm.gigalixirapp.com/update_post", payload)
            .then((response) => {
                console.log(response);
                self.props.history.push('/myPosts/');
            }).catch(function (error) {
                console.log(error);
                });
     }
    


    render() {

        if(this.state.post === null){
            return <div className="center"> Loading </div>
        }
        return (
          <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                    <h5 className="grey-text text-darken-3">Edit Post</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" className="validate" onChange={this.handleChange} defaultValue={this.state.post.title}/>
                    </div>
                    <div className="input-field" >
                        <label htmlFor="content">Content</label>
                        <textarea  id="content" className="materialize-textarea"  onChange={this.handleChange} defaultValue={this.state.post.content}></textarea>
                    </div>
                    <div >
                        <button className="btn pink lighten-1 z-depth-0" onClick={(e) => {this.handleClick(e)}}>Update Post</button>
                    </div>
                </form> 
                
            </div>
        )
    }
}

export default EditPost