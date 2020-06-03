import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom"; 
import Avatar from "../avatar.jpg";
import BlogPost from "../blog-header.jpg";
import axios from "axios";
import Pagination from "./Pagination";

class MyPosts extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
    editMode: false,
    deleteMode: false
  };

  componentDidMount() {
    axios.get("https://myblog-pm.gigalixirapp.com/get_posts").then((res) => {
      this.setState({
        // posts: res.data
        posts: res.data.posts,
      });
    });

    // axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
    //   this.setState({
    //     // posts: res.data
    //     posts: res.data
    //   });
    // });
  }

  paginate = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };

  handleOnEdit = (post_id) => {
 

    this.props.history.push('/editPost/' + post_id);
    // this.setState({
    //     editMode: true,
    //   });
  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

// If edit Mode on then Redirect to Edit Page

    // if ( this.state.editMode === true){
    //     console.log(this);
    //     return <Redirect to='editPost'  />;
    // }


    const postList = this.state.posts.length ? (
      currentPosts.map((post) => {
        return (
          <div className="card z-depth-0">
            <div className="card medium" key={post.post_id}>
              <div className="row valign-wrapper">
                <img src={Avatar} className="circle" alt="Avatar" />
                <span>
                  <p>Posted by rduma</p>
                  <p className="grey-text">3rd September</p>
                </span>
              </div> 
                 <div className="card-content">
                <Link to={"/posts/" + post.post_id}>
                  <span className="card-title">{post.title}</span>
                </Link>
                <p>{post.body}</p>
                <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
              </div>
              <div className="card-action">
                  <div className="row">
                <button className="btn pink lighten-1 z-depth-0" onClick={() => this.handleOnEdit(post.post_id)}>Edit Post</button>
            
                <button className="btn pink lighten-1 z-depth-0">Delete Post</button></div>
            </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="center">No posts yet</div>
    );
    return (
      <div className="container home">
        <h4 className="center">Home</h4>
        {postList}
        <Pagination
          postsPerPage={this.state.postsPerPage}
          totalPosts={this.state.posts.length}
          paginate={this.paginate}
        />
      </div>
    );
  }
}

export default withRouter( MyPosts );
