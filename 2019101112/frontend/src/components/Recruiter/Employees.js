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

export default function Employees() {

    const [useFilter,setFilter] = useState(false);
    const [isAscending,setAscending] = useState(false);
    const [emps,setEmps] = useState('');
    //applicants
    const [apps,setApps] = useState([]);
    const [arr,setArr] = useState([]);
    var x;

    useEffect(() => {
        
        const recruiter_id = window.localStorage.getItem('Id');
        const body = JSON.stringify({recruiter_id });
        
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        axios.post('http://localhost:4000/api/recruiter/employees',body,config)
        .then(res => {
            console.log("rendering employees")
            // console.log(res.data.employees);
            setEmps(res.data.employees);
        })
        .catch(function(error) {
            console.log(error);
        })

        // console.log("employee details")
        
        for (x in emps) {
            // console.log(x)
            // console.log(emps[x]);
            const applicant_id = emps[x];

            axios.get(`http://localhost:4000/api/applicant/profile/${applicant_id}`)
            .then ( res => {
                // console.log("got employee details")
                setArr(oldArray => [...oldArray,res.data] );
                // console.log(res.data)
            })
            .catch(function(error) {
                console.log(error);
                console.log("failed to get employee details");
            })
        }

        setApps(arr);
        setArr('');

    },[useFilter,isAscending])

    // useEffect(() => {
    //     const recruiter_id = window.localStorage.getItem('Id');
    //     const body = JSON.stringify({recruiter_id });
        
    //     const config = {
    //         headers: {
    //             'Content-Type':'application/json'
    //         }
    //     }
    //     axios.post('http://localhost:4000/api/recruiter/employees',body,config)
    //     .then(res => {
    //         console.log("rendering only first time")
    //         setEmps(res.data.employees);
    //     })
    //     .catch(function(error) {
    //         console.log(error);
    //     })

    //     console.log("employee details")
    //     for (x in emps) {
    //         // console.log(x)
    //         // console.log(emps[x]);
    //         const applicant_id = emps[x];

    //         axios.get(`http://localhost:4000/api/applicant/profile/${applicant_id}`)
    //         .then ( res => {
    //             console.log("got employee details")
    //             setArr(oldArray => [...oldArray,res.data] );
    //             // console.log(res.data)
    //         })
    //         .catch(function(error) {
    //             console.log(error);
    //             console.log("failed to get employee details");
    //         })
    //     }

    //     setApps(arr);
    //     setArr('');
    // },[])

    function sortAscending() {
        setAscending(true);
        setFilter(!useFilter)
    }
    
    function sortDescending() {
         setAscending(false);
         // setSortedJobs(sortedJobs.sort( (job1,job2) => (job1.salary < job2.salary) ? 1 : -1))
         setFilter(!useFilter)
     }

     const sortName = async (e) => {

        if (isAscending)
        {
            setApps(apps.sort( (app1,app2) => (app1.name < app2.name) ? 1 : -1))
        }

        else{

            setApps(apps.sort( (app1,app2) => (app1.name > app2.name) ? 1 : -1))
        }

        setFilter(!useFilter)

     }

    const sortApplicationDate = (e) => {
        
        if (isAscending)
        {
            setApps(apps.sort( (app1,app2) => (app1.date_of_joining > app2.date_of_joining) ? 1 : -1))
        }

        else{

            setApps(apps.sort( (app1,app2) => (app1.date_of_joining < app2.date_of_joining) ? 1 : -1))
        }

        setFilter(!useFilter)

    }

    console.log(apps)

    return (

        <div>

        <RecruiterLandingPage />

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
                    onSubmit={sortName}>Name</Button>
                </ListItem>
                
                <Divider />
                <ListItem button divider type="submit">
                    <Button className="btn btn-primary btn-large centerButton" 
                    type="submit"
                    onSubmit={sortApplicationDate}>Date of Application</Button>
                </ListItem>
            
            </List>

        </Grid>


        <Grid item xs={12} md={9} lg={9}>
            <Paper>
                <Table size="medium">
                    <TableHead >
                        <TableRow style={{fontWeight:'bold'}}>
                        <TableCell>Applicant Name</TableCell>
                        <TableCell>Job Title</TableCell>
                        <TableCell>Date of Joining</TableCell>
                        {/* <TableCell>Job Type</TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.from(apps).map((app,ind) => (
                            <TableRow key={ind}>
                            <TableCell>{app.name}</TableCell>
                            <TableCell>{app.job_title}</TableCell>
                            <TableCell>{app.date_of_joining}</TableCell>
                            {/* <TableCell>{
                                
                                <div>
                                {app.job_type == "F" ? "Full-Time" : null}
                                {app.job_type == "P" ? "Part-Time" : null}
                                {app.job_type == "H" ? "From Home" : null}

                                </div>

                            }</TableCell> */}
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