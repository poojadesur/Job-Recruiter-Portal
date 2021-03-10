import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ApplicantLandingPage from './Landing';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';


export default function MyApplications() {

    const [apps,setApps] = useState('');

    useEffect(() => {
        const id = window.localStorage.getItem('Id');
        axios.get(`http://localhost:4000/api/applicant/viewApp/${id}`)
        .then(res => {
            console.log("success got applications")
            setApps(res.data);
        })
        .catch(function(error) {
            console.log(error);
        })
    },[])

    return (
        <div>
            <ApplicantLandingPage />

            <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="medium">
                            <TableHead >
                                <TableRow style={{fontWeight:'bold'}}>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Name of Recruiter</TableCell>
                                        {/* <TableCell>Email of Recruiter</TableCell> */}
                                        {/* <TableCell> Duration in Months</TableCell> */}
                                        <TableCell> Salary</TableCell>
                                        <TableCell> Status</TableCell>
                                        <TableCell> Date of Joining </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(apps).map((app,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{app.title}</TableCell>
                                        <TableCell>{app.recruiter_name}</TableCell>
                                        {/* <TableCell>{app.recruiter_email}</TableCell> */}
                                        {/* <TableCell>{app.duration}</TableCell> */}
                                        <TableCell>{app.salary}</TableCell>
                                        <TableCell> {app.status}</TableCell>
                                        <TableCell>{app.apply_date}</TableCell>
                                    </TableRow>
                                   
                            ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
        </div>
    )
}
