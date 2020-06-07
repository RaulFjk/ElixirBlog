import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';
import { getToken } from '../components/utils/Common';


// Check if user Authentificated or not in order to show the SignedInLinks or not
const Navbar = props => {

    if ( getToken() ) {
        return (
            <nav className="nav-wrapper red darken-3 "> 
                <div className="container">
                    <Link to='/' className="brand-logo">Elixir Blog</Link>
                    <SignedInLinks checkIfAuthenticated={props.checkIfAuthenticated} />
                </div>
            </nav>
            ); 
        }

        return (
            <nav className="nav-wrapper red darken-3 "> 
                <div className="container">
                    <Link to='/' className="brand-logo">Elixir Blog</Link>
                
                </div>
            </nav>
            ); 
        
}




export default Navbar;