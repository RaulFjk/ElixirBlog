import React, { Component } from 'react';
import PostImage from '../NewYork.jpg'
import axios from 'axios';
 

// Class based Components will automatically get the props in them
class Post extends Component {

    state = {
        post: null,
        posted_at: ''

    }

componentDidMount() {
    // let id = this.props.match.params.post_id;
    // // When de Component is mounted, we set the state id equal to the id we grabbed
    // // from the props
    // axios.get('https://jsonplaceholder.typicode.com/posts/' + id) 
    // .then(res => {
    //     this.setState({
    //         post: res.data
    //     })
    // })

    this.getPost();

}

getPost = async () => {
    let id = this.props.match.params.post_id;
    axios.get("https://myblog-pm.gigalixirapp.com/get_post_by_id", {
        params: {
         id: id
        } 
        }).then((res) => {
        const cts = res.data.post.inserted_at;
        const cdate = (new Date(cts)).toUTCString();
      this.setState({
        post: res.data.post,
        posted_at: cdate
      });
    });

};


    render() {

        const post = this.state.post ? (
            
            <div className="post postStyle">
                <div className="row">
                    <h4 class="center-align">{ this.state.post.title }</h4>
                </div>
                <div className="row">
                    <div className="container">
                        <span> <p>Posted by {this.state.post.author}</p>
                        <p className="grey-text">{this.state.posted_at}</p>
                        </span>
                    </div>
                </div>
                <div className="row">
                    <p className="flow-text">{ this.state.post.content }</p>
                </div>
            </div>
        ) : (
            <div className="center">Loading post...</div>
        )


        return (
            <div className="container">{ post }</div>
        )
    }
}

export default Post