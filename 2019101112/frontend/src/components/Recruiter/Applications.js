import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import RecruiterLandingPage from './RecruiterLanding';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

export default function Applications() {

    const [useFilter,setFilter] = useState(false);
    const [isAscending,setAscending] = useState(true);
    const [apps,setApps] = useState(false);
    const [sortedapps,setSortedApps] = useState(false);

    useEffect(() => {
        const job_id = window.localStorage.getItem('job_id');
        axios.get(`http://localhost:4000/api/recruiter/${job_id}`)
        .then(res => {
            console.log("rendering")
            setApps(res.data);
        })
        .catch(function(error) {
            console.log(error);
        })
    },[useFilter,isAscending])

    useEffect(() => {
        const job_id = window.localStorage.getItem('job_id');
        axios.get(`http://localhost:4000/api/recruiter/${job_id}`)
        .then(res => {
            console.log("rendering only first time")
            setApps(res.data);
            setSortedApps(res.data);
        })
        .catch(function(error) {
            console.log(error);
        })
    },[])

    function sortAscending() {
        setAscending(true);
     //    setSortedJobs(sorted_jobs.sort( (job1,job2) => (job1. > job2.salary) ? 1 : -1))
        setFilter(!useFilter)
    }
    
    function sortDescending() {
         setAscending(false);
         // setSortedJobs(sortedJobs.sort( (job1,job2) => (job1.salary < job2.salary) ? 1 : -1))
         setFilter(!useFilter)
     }
    
     const sortName = async (e) => {
        
        console.log("sorting Name")
        console.log(isAscending)

        if(isAscending)
        {
         setSortedApps(sortedapps.sort( (app1,app2) => (app1.applicant_name < app2.applicant_name) ? 1 : -1))

         setFilter(!useFilter)
        }
        else{
         setSortedApps(sortedapps.sort( (app1,app2) => (app1.applicant_name > app2.applicant_name) ? 1 : -1))
         setFilter(!useFilter)
        }
     }
    
     const sortApplicationDate = (e) => {
        
         console.log("sorting Date")
        console.log(isAscending)

        if(isAscending)
        {
         setSortedApps(sortedapps.sort( (app1,app2) => (app1.apply_date > app2.apply_date) ? 1 : -1))
         setFilter(!useFilter)
        }
        else{
         setSortedApps(sortedapps.sort( (app1,app2) => (app1.apply_date < app2.apply_date) ? 1 : -1))
         setFilter(!useFilter)

        }
     }
    
    
     function handleAccept(application_id) {
        
        const job_id = window.localStorage.getItem('job_id');
        const recruiter_id = window.localStorage.getItem('Id');

        const body = JSON.stringify({application_id, job_id, recruiter_id });
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        axios.post('http://localhost:4000/api/recruiter/acceptApp', body, config)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.token)
            console.log("successfully accepted")
        })
        .catch(
            console.log("failed accepting")
        )

        setFilter(!useFilter);

     }

     function handleReject(application_id) {

        const job_id = window.localStorage.getItem('job_id');
        const recruiter_id = window.localStorage.getItem('Id');

        const body = JSON.stringify({application_id, job_id, recruiter_id });
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        axios.post('http://localhost:4000/api/recruiter/rejectApp', body, config)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.token)
            console.log("successfully rejected")
        })
        .catch(
            console.log("failed rejection")
        )
                
        setFilter(!useFilter);
         
    }

    function handleShortlist(application_id) {

        const body = JSON.stringify({application_id });
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }

        axios.post('http://localhost:4000/api/recruiter/shortlistApp', body, config)
        .then(res => {
            // console.log(res.data)
            // console.log(res.data.token)
            console.log("successfully shortlisted")
        })
        .catch(
            console.log("failed shortlisting")
        )

        setFilter(!useFilter);
         
    }


     return (
        <div>
        
        < RecruiterLandingPage/>

        Here are the applicatioons.

        <Grid container>

                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>

        </Grid>

        <Grid container>


        <Grid item xs={12} md={3} lg={3}>
                    
            <div>
            <Button variant="contained" color="primary" onClick={sortAscending}>Ascending</Button>
            <Button variant="contained" color="primary" onClick={sortDescending}>Descending</Button>
            </div>

            <List component="nav" aria-label="mailbox folders">
                
                <ListItem button divider type="submit">
                        <Button className="btn btn-primary btn-large centerButton" 
                    type="submit"
                    onClick={sortName}>Name</Button>
                </ListItem>
                <Divider />
                <ListItem button divider type="submit">
                    <Button className="btn btn-primary btn-large centerButton" 
                    type="submit"
                    onClick={sortApplicationDate}>Date of Application</Button>
                </ListItem>
            
            </List>

        </Grid>


        <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="medium">
                            <TableHead >
                                <TableRow style={{fontWeight:'bold'}}>
                                <TableCell>Applicant Name</TableCell>
                                <TableCell>Applicant Skills</TableCell>
                                <TableCell>Date of Application</TableCell>
                                <TableCell>SOP</TableCell>
                                <TableCell>Stage of Application</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(sortedapps).map((app,ind) => (

                                            <TableRow key={ind}>

                                            <TableCell>{app.applicant_name}</TableCell>
                                            <TableCell>
                                            <div>
                                                <ul>{Array.from(app.applicant_skills).map(skill => <li key={skill}> {skill} </li>)}</ul>
                                            </div>
                                            </TableCell>
                                            <TableCell>{app.apply_date}</TableCell>
                                            {/* <TableCell>{app.applicant_education}</TableCell> */}
                                            <TableCell>{app.SOP}</TableCell>
                                            {/* <TableCell> {app.applicant_rating}</TableCell> */}
                                            <TableCell>{app.status}</TableCell>
                                            
                                            {app.Applied ? 

                                            <TableCell>
                                                <Button variant="contained" color="primary" onClick={() => handleShortlist(app._id)}>
                                                Shortlist</Button>
                                            </TableCell>
                                            : null
                                            }

                                            {app.Applied ? 
                                                <TableCell>
                                                <Button variant="contained" color="primary" onClick={() => handleReject(app._id)}>
                                                Reject</Button>
                                                </TableCell>
                                            : null
                                            }

                                            {app.Shortlisted ? 

                                            <TableCell>
                                                <Button variant="contained" color="primary" onClick={() => handleAccept(app._id)}>
                                                Accept</Button>
                                            </TableCell>
                                            : null
                                            }

                                            {app.Shortlisted ? 
                                                <TableCell>
                                                <Button variant="contained" color="primary" onClick={() => handleReject(app._id)}>
                                                Reject</Button>
                                                </TableCell>
                                            : null
                                            }

                                    </TableRow>

                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
            </Grid>
        </Grid>

        </div>
     )


}

