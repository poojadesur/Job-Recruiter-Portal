import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';

export default class HomeNavbar extends Component {
  
  render() {
    return (
      <AuthContext.Consumer>{(authContext) => (
        <ThemeContext.Consumer>{(themeContext) => {
          const { isAuthenticated, toggleAuth } = authContext;
          const { isLightTheme, light, dark } = themeContext;
          const theme = isLightTheme ? light : dark;
          return(
            <nav style={{background: theme.ui, color: theme.syntax}}>
                <h1>The Job</h1>
                <div>
                  {/* { isAuthenticated ? 'Logged in' : 'Login or Make an Account to Continue'} */}
                </div>
                <ul>
                  <li>
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="nav-link">Register</Link>
                  </li>
                </ul>
            </nav>
          )
        }}
        </ThemeContext.Consumer>
      )}
      </AuthContext.Consumer>
    );
  }
}


 