import React from "react";
import {  NavLink, Redirect, withRouter } from "react-router-dom";
import { getUser, removeUserSession } from './utils/Common'


const SignedInLinks = (props) => {


const user = getUser();

const handleLogOut = () => {
  removeUserSession();
  props.checkIfAuthenticated();

  props.history.push('/signin');
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
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          RD
        </NavLink>
      </li>
    </ul>
  );
};

export default withRouter(SignedInLinks);
