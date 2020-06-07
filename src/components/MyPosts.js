import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom"; 
import Avatar from "../avatar.jpg";
import BlogPost from '../blogPost.jpg';
import axios from "axios";
import Pagination from "./Pagination";
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' 
import { getUser, getToken,removeUserSession } from './utils/Common'

class MyPosts extends Component {
  state = {
    posts: [],
    currentPage: 1,
    postsPerPage: 10,
    editMode: false,
    deleteMode: false
  };

  componentDidMount() {
    const author = getUser();
    let token = getToken();
    axios.get("https://myblog-pm.gigalixirapp.com/get_posts_by_author",{
      headers: {"Authorization" : `Bearer ${token}`},
      params: {
        author: author
       } 
}).then((res) => {
      this.setState({
        posts: res.data.posts,
      });
    }).catch(error => {
      if (error.response.status === 401) {
        removeUserSession();
        this.props.history.push('/signin');
       }
    });


  }

    // This function takes care that no more than 12 posts are being displayed on one page
  paginate = (pageNumber) => {
    this.setState({
      currentPage: pageNumber,
    });
  };


  //Redirects user to edit page of the chosen post
  handleOnEdit = (post_id) => {
 

    this.props.history.push('/editPost/' + post_id);
    // this.setState({
    //     editMode: true,
    //   });
  }

  //Handles delete function when user clicks the delete Button
handleOnDelete = (post_id) => {
  const author = getUser();
  let token = getToken();
  confirmAlert({
    title: 'Please confirm',
    message: 'Are you sure you want to delete this post?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => {
          console.log('serus da');
          axios.delete("https://myblog-pm.gigalixirapp.com/delete_post", {
            headers: {"Authorization" : `Bearer ${token}`},
            params: {
             id: post_id
            } 
            }).then((res) => {
              axios.get("https://myblog-pm.gigalixirapp.com/get_posts_by_author",{
                headers: {"Authorization" : `Bearer ${token}`},
                params: {
                  author: author
                 } 
          }).then((res) => {
                this.setState({
                  // posts: res.data
                  posts: res.data.posts
                });}).catch(error => {
                  if (error.response.status === 401) {
                    removeUserSession();
                    this.props.history.push('/signin');
                   }
                });
              console.log(this.state);
        }).catch(error => {
          if (error.response.status === 401) {
            removeUserSession();
            this.props.history.push('/signin');
           }
        });
      
      
      }
      },
      {
        label: 'No',
        onClick: () => {console.log('serus nu')}
      }
    ]
  })
}

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
    const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
    const currentPosts = this.state.posts.slice(
      indexOfFirstPost,
      indexOfLastPost
    );


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
                  <span className="card-title" >{post.title}</span>
                </Link>
                <p>{post.body}</p>
              </div>
              <div className="card-action">

              <div className="row ">
              <div className="container">
              <span> <p>Posted by {post.author}</p>
                <p className="grey-text">{cdate}</p>
                </span>
            </div>
            </div>
                  <div className="row">
                <button className="btn red darken-3 waves-effect waves-light"  onClick={() => this.handleOnEdit(post.post_id)}>Edit Post</button>
            
                <button className="btn red darken-3 waves-effect waves-light" onClick={() => this.handleOnDelete(post.post_id)}>Delete Post</button></div>
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
        <h4 className="center">My Posts</h4>
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
