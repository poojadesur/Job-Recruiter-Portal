import React , {Component} from 'react'
import {BrowserRouter as Router, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// import { Container } from 'reactstrap';
// import { Provider } from 'react-redux';
// import store from './store';

import Home from './components/Home/Home';
import Register from './components/Home/Register';
import Login from './components/Home/Login';
import RecruiterLandingPage from './components/Recruiter/RecruiterLanding';
import ThemeToggle from './components/ThemeToggle';
import SongList from './components/SongList';

import ApplicantLandingPage from './components/Applicant/Landing';
import ApplicantProfile from './components/Applicant/Profile';
import JobDashboard from './components/Applicant/JobDashboard';

import RecruiterProfile from './components/Recruiter/RecProfile';
import CreateJob from './components/Recruiter/CreateJob';
import RecruiterJobs from './components/Recruiter/RecruiterJobs';
import Applications from './components/Recruiter/Applications';
import Employees from './components/Recruiter/Employees';


import ThemeContextProvider, { ThemeContext } from './contexts/ThemeContext';
import ApplicantContextProvider, { ApplicantContext } from './contexts/ApplicantContext';
import AuthContextProvider, { AuthContext } from './contexts/AuthContext';
import MyApplications from './components/Applicant/MyApplications';


export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
        
        <AuthContextProvider>
            
            <ThemeContextProvider>
              <Route component= {Home} exact path = '/'/>

            <Route component= {Register} exact path = '/register'/>
            <Route component= {Login} exact path = '/login'/>
            
            {/* <ApplicantContextProvider> */}
              <Route component={ApplicantLandingPage} exact path = '/applicantlanding' />
              <Route component={ApplicantProfile} exact path = '/applicantprofile' />
              <Route component={JobDashboard} exact path = '/applicantDashboard' />
              <Route component={MyApplications} exact path = '/applicantApplications' />

            {/* </ApplicantContextProvider> */}

            <Route component={RecruiterLandingPage} exact path = '/recruiterlanding' />
            <Route component={RecruiterProfile} exact path = '/recruiterProfile' />
            <Route component={CreateJob} exact path = '/recruiterCreate' />
            <Route component={RecruiterJobs} exact path = '/recruiterJobs' />
            <Route component={Applications} exact path = '/applications' />
            <Route component={Employees} exact path = '/recruiterEmployees' />





            {/* <Route component={ApplicantProfile} exact path = '/applicantprofile' />
            <Route component={ApplicantProfile} exact path = '/applicantprofile' /> */}

            </ThemeContextProvider>
        </AuthContextProvider>


        <Route component = {SongList} exact path = '/songlist' />

        </div>
      </Router> 
    );
  }
}

