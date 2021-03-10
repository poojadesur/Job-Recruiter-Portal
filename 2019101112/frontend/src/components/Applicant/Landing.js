import React, { Component } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { AuthContext } from '../../contexts/AuthContext';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


export default function ApplicantLandingPage() {
    // static contextType = ThemeContext;

        const handleLogout = (e) => {
            window.localStorage.setItem('Id','');
            window.localStorage.setItem('Namestate','');
            window.localStorage.setItem('job_id','');
            window.localStorage.setItem('job_title','');
            window.localStorage.setItem('isAuthenticated',false);
            window.localStorage.setItem('token','');
            window.localStorage.setItem('idstate','');
        }

        return ( 
            <AuthContext.Consumer>{(authContext) => (
                <ThemeContext.Consumer>{(themeContext) => {
                    // const { isAuth, toggleAuth } = authContext;
                    const { isLightTheme, light, dark } = themeContext;
                    const theme = isLightTheme ? light : dark;
                    const isAuth = window.localStorage.getItem('isAuthenticated');
                    const Name = window.localStorage.getItem('Namestate');
                    
                    // console.log("hellooo")
                    // console.log(isAuth)
                    // console.log(Name)
                    return(
                        <nav style={{background: theme.ui, color: theme.syntax}}>
                            <h1>The Job</h1>
                            <h4>{themeContext.theme} 
                            {isAuth ? "Welcome ": null}
                            {isAuth ? Name : null}
                            </h4>

                            <ul>
                            <li style={{background: theme.ui }}>
                                <Link to="/applicantlanding" className="nav-link">Home</Link>
                            </li>
                            <li style={{background: theme.ui }}>
                                <Link to="/applicantProfile" className="nav-link">Profile</Link>
                            </li>
                            <li style={{background: theme.ui }}>
                                <Link to="/applicantDashboard" className="nav-link">Job Dashboard</Link>
                            </li>
                            <li style={{background: theme.ui }}>
                                <Link to="/applicantApplications" className="nav-link">My Applications</Link>
                            </li>
                            {isAuth ? 
                            <li style={{background: theme.ui }}>
                                <Link to="/" className="nav-link" onClick={handleLogout}>Logout</Link>
                            </li>
                            : null }
                            </ul>

                        </nav>
                    )
                }}</ThemeContext.Consumer>
            )}</AuthContext.Consumer>
        )
}
