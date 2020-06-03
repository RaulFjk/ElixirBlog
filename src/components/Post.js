import React, { Component } from 'react';
import axios from 'axios';
 

// Class based Components will automatically get the props in them
class Post extends Component {

    state = {
        post: null
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
      this.setState({
    
        post: res.data.post
      });
    });

};


    render() {

        const post = this.state.post ? (
            <div className="post">
                <h4 className="center">{ this.state.post.title }</h4>
                <p className="flow-text">{ this.state.post.content }</p>
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