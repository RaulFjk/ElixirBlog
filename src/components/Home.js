import React, { Component } from "react";
import { Link} from "react-router-dom";
import Avatar from "../avatar.jpg";
import BlogPost from '../blogPost.jpg'
import axios from "axios";
import Pagination from './Pagination'
import { getToken, removeUserSession } from './utils/Common'


class Home extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 12
  };

  componentDidMount() {
    let token = getToken();

    axios.get("https://myblog-pm.gigalixirapp.com/get_posts",{
      headers: {"Authorization" : `Bearer ${token}`},
    }).then((res) => {
      this.setState({
        posts: res.data.posts
      });
    }).catch(error => {
      if (error.response.status === 401) {
        removeUserSession();
        this.props.history.push('/signin');
       }
    });
    
  }

  // This function takes care that no more than 12 posts are being displayed on one page
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
    <div className="container">
      <div className="row">
        {
      currentPosts.map((post) => {
        const cts = post.inserted_at;
        const cdate = (new Date(cts)).toUTCString();
        return (

             <div className="col s4">
            <div className="card mystyle" key={post.post_id}>
          <div className="card-image">
            <img src={BlogPost}/>
          </div>
            <div className="card-content">
              <Link to={"/posts/" + post.post_id}>
                <span className="card-title">{post.title}</span>
              </Link>
              <p>{post.body}</p>
            </div>
            <div className="row ">
              <div className="container">
              <span> <p>Posted by {post.author}</p>
                <p className="grey-text">{cdate}</p>
                </span>
            </div>
            </div>
          </div>
          </div>
          
        );
      })
  }
</div>
  </div>) : (
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
