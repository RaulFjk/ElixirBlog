import React, { Component } from "react";
import { Link} from "react-router-dom";
import Avatar from "../avatar.jpg";
import BlogPost from '../blogPost.jpg'
import axios from "axios";
import Pagination from './Pagination'

class Home extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10
  };

  componentDidMount() {
   

    axios.get("https://myblog-pm.gigalixirapp.com/get_posts").then((res) => {
      this.setState({
        // posts: res.data
        posts: res.data.posts
      });
    });

    // axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
    //   this.setState({
    //     // posts: res.data
    //     posts: res.data
    //   });
    // });

    
  }

  paginate =  pageNumber => {

    this.setState({
      currentPage : pageNumber
    });

  }


  render() {

    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.posts.slice(indexOfFirstPost, indexOfLastPost);

    const postList = this.state.posts.length ? (
      currentPosts.map((post) => {
        return (
          <div className="row">
        
          <div className="card large" key={post.post_id}>
            <div className="row valign-wrapper">
                <img src={Avatar} className="circle" alt="Avatar" />
                <span>
                    <p>Posted by rduma</p>
                    <p className="grey-text">3rd September</p>
                </span>
            </div>
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator"  src={BlogPost}/>
            </div>
            <div className="card-content">
              <Link to={"/posts/" + post.post_id}>
                <span className="card-title">{post.title}</span>
              </Link>
              <p>{post.body}</p>
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
        <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.posts.length} paginate={this.paginate} />
      </div>
    );
  }
}

export default (Home);
