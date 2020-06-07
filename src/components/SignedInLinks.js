import React from "react";
import {  NavLink, Redirect, withRouter } from "react-router-dom";
import { getUser, removeUserSession } from './utils/Common'
import axios from 'axios'


const SignedInLinks = (props) => {


const user = getUser();

//Handles log out function and removes UserSession
const handleLogOut = () => {
  var apiBaseUrl = "https://myblog-um.gigalixirapp.com/logout";
  var payload={
    username: user,
}
  axios.post(apiBaseUrl, payload)
  .then(function (response) {
  removeUserSession();
  props.checkIfAuthenticated();

  props.history.push('/signin');
  });

}

  return (
    <ul className="right">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/myPosts">My Posts</NavLink>
      </li>
      <li>
        <NavLink to="/profile">Profile</NavLink>
      </li>
      <li>
        <NavLink to="/newPost">New Post</NavLink>
      </li>
      <li>
        <a onClick={handleLogOut}>Log Out</a>
      </li>
    </ul>
  );
};

export default withRouter(SignedInLinks);
