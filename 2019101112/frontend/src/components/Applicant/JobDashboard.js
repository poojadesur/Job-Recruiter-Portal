import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import ApplicantLandingPage from './Landing';

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
// import Form from 'react-bootstrap/Form';

import {
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';


export default function JobDashboard() {

    const [jobs,setJobs] = useState('');
    const [sortedJobs,setSortedJobs] = useState('');
    // const [sortJobs, setsortJobs] = useState(false);
    const [useFilter,setFilter] = useState(false);
    const [min,setMin] = useState('');
    const [max,setMax] = useState('');
    const [isApplying,setApply] = useState(false);
    const [isError,setErrorPopup] = useState(false);
    const [sop,setSOP] = useState('');
    const [num_app,setNumApp] = useState('');

    //default filer is descending
    const [isAscending,setAscending] = useState(false);
    const [jobTypestate, setJobType] = useState({
        fulltime: true,
        parttime: true,
        home: true,
      });

    useEffect(() => {
        axios.get('http://localhost:4000/api/jobs')
        .then(res => {
            console.log("rendering")
            setJobs(res.data);
            // setSortedJobs(res.data);
        })
        .catch(function(error) {
            console.log(error);
        })
        console.log("Applying?")
        console.log(isApplying)
        console.log("Error?")
        console.log(isError)
        setApply(false)
      },[useFilter,isAscending])

    useEffect(() => {
    axios.get('http://localhost:4000/api/jobs')
    .then(res => {
        // console.log("rendering only first time")
        setJobs(res.data);
        setSortedJobs(res.data);
    })
    .catch(function(error) {
        console.log(error);
    })
    },[])

    const sortSalary = (e) => {
        e.preventDefault();

        console.log("sorting in terms of salary")
        console.log(min)
        console.log(max)
        console.log(isAscending)

        setSortedJobs(jobs.filter( (job) => {
            if(job.salary > min && job.salary < max) return job
        } ))

       setMax('');
       setMin('');

        setFilter(!useFilter)

    }

   function sortAscending() {
       setAscending(true);
       setSortedJobs(sortedJobs.sort( (job1,job2) => (job1.salary > job2.salary) ? 1 : -1))
       setFilter(!useFilter)
   }

   function sortDescending() {
        setAscending(false);
        setSortedJobs(sortedJobs.sort( (job1,job2) => (job1.salary < job2.salary) ? 1 : -1))
        setFilter(!useFilter)
    }

    const handleJobType = async (e) => {
        console.log("filtering by job type")
        await setJobType({...jobTypestate, [e.target.name]: e.target.checked});
        console.log(jobTypestate)
        console.log(e);
        setSortedJobs(jobs.filter( (job) => {
            if( jobTypestate.fulltime)
            {
                if(job.job_type === "F") return job
            }
            if( jobTypestate.parttime)
            {
                if(job.job_type === "P") return job
            }
            if( jobTypestate.home)
            {
                if(job.job_type === "H") return job
            }
        } ))

        setFilter(!useFilter)
    }

    const handleSelectJobDuration = (e) => {
        console.log("filtering duration wise")
        console.log(e)
        if(e === "0"){
            setSortedJobs(jobs.filter( (job) => {
                    return job
            } ))
        setFilter(!useFilter)
        }
        if(e === "1"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 1) return job
            } ))
        setFilter(!useFilter)
        }
        if(e === "2"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 2) return job
            } ))
        setFilter(!useFilter)
        }
        if(e === "3"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 3) return job
            } ))
        setFilter(!useFilter)
            
        }
        if(e === "4"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 4) return job
            } ))
        setFilter(!useFilter)
            
        }
        if(e === "5"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 5) return job
            } ))
        setFilter(!useFilter)
            
        }
        if(e === "6"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 6) return job
            } ))
        setFilter(!useFilter)  
        }
        if(e === "7"){
            setSortedJobs(jobs.filter( (job) => {
                if(job.duration < 7) return job
            } ))
        setFilter(!useFilter)
        }
    }

    const handleSubmitApp = (e) => {

        e.preventDefault();

        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        const title = window.localStorage.getItem('job_title');
        const job_id = window.localStorage.getItem('job_id');
        const id = window.localStorage.getItem('Id');
        const SOP = sop;
        // setModal(false);
        setApply(false);

        axios.get(`http://localhost:4000/api/applicant/profile/${id}`)
        .then(res => {
            console.log(res.data.name)
            console.log(res.data.num_applications)
            setNumApp(res.data.num_applications);
        })
        .catch(
            console.log("failed profile details")
        )
        
        console.log("number of applications")
        console.log(num_app)
        
        if (num_app < 9)
        {
            //apply
            const body = JSON.stringify({ job_id, title, SOP})

            axios.post(`http://localhost:4000/api/applicant/apply/${id}`, body, config)
            .then(res => {
                // console.log(res.data)
                // console.log(res.data.token)
                console.log("successfully applied")
            })
            .catch(
                console.log("failed application")
            )
        }
        else
        {
            setErrorPopup(true);
        }

        setFilter(!useFilter);

    }

    const handleErrorPopup = e => {
       
        // e.preventDefault();
        console.log("ok button")
        setErrorPopup(!isError);
        setFilter(!useFilter);
    }

    return (
        <div>

            <ApplicantLandingPage/>

            <Grid container>

                <Grid item xs={12} md={3} lg={3}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem text>
                            <h3>Filters</h3>
                        </ListItem>
                    </List>
                </Grid>
                
                <Grid item xs={12} md={9} lg={9}>
                    <List component="nav" aria-label="mailbox folders">
                        <TextField 
                        id="standard-basic" 
                        label="Search" 
                        fullWidth={true}   
                        InputProps={{
                            endAdornment: (
                                <InputAdornment>
                                    <IconButton>
                                        <SearchIcon />
                                    </IconButton>
                                </InputAdornment>
                            )}}
                        />
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
                        <ListItem>
                            <form button type="submit" onSubmit={sortSalary}>
                                <label>Salary (in Rs.)</label>
                                <TextField id="standard-basic" label="Min" fullWidth={true} onChange={event => setMin(event.target.value)} />
                                <TextField id="standard-basic" label="Max" fullWidth={true} onChange={event => setMax(event.target.value)}/>
                                <Button className="btn btn-primary btn-large centerButton" 
                                type="submit"></Button>
                            </form>                                                                
                        </ListItem>
                        <Divider />
                        <ListItem button divider type="submit">
                        <FormControlLabel
                            control={<Checkbox checked={jobTypestate.fulltime} onChange={handleJobType} name="fulltime" color="primary"/>}
                            label="Full time"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={jobTypestate.parttime} onChange={handleJobType} name="parttime" color="primary"/>}
                            label="Part Time"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={jobTypestate.home} onChange={handleJobType} name="home" color="primary"/>}
                            label="At home"
                        />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <DropdownButton id="dropdown-basic-button" title="Duration" onSelect={handleSelectJobDuration}>
                            <Dropdown.Item eventKey="0"> Any Duration</Dropdown.Item>
                            <Dropdown.Item eventKey="1"> Less than 1 Month</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Less than 2 Months</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Less than 3 Months</Dropdown.Item>
                            <Dropdown.Item eventKey="4">Less than 4 Months</Dropdown.Item>
                            <Dropdown.Item eventKey="5">Less than 5 Months</Dropdown.Item>
                            <Dropdown.Item eventKey="6">Less than 6 Months</Dropdown.Item>
                            <Dropdown.Item eventKey="7">Less than 7 Months</Dropdown.Item>
                            </DropdownButton>
                        </ListItem>
                    </List>
                </Grid>

                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="medium">
                            <TableHead >
                                <TableRow style={{fontWeight:'bold'}}>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Name of Recruiter</TableCell>
                                        <TableCell>Email of Recruiter</TableCell>
                                        <TableCell> Duration in Months</TableCell>
                                        <TableCell> Salary</TableCell>
                                        <TableCell> Job Type </TableCell>
                                        <TableCell>Deadline of Application</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Array.from(sortedJobs).map((job,ind) => (
                                    <TableRow key={ind}>
                                        <TableCell>{job.job_title}</TableCell>
                                        <TableCell>{job.recruiter_name}</TableCell>
                                        <TableCell>{job.recruiter_email}</TableCell>
                                        <TableCell>{job.duration}</TableCell>
                                        <TableCell>{job.salary}</TableCell>
                                        <TableCell> { 
                                            <div>
                                            {job.job_type == "F" ? "Full-Time" : null}
                                            {job.job_type == "P" ? "Part-Time" : null}
                                            {job.job_type == "H" ? "From Home" : null}

                                            </div>

                                        }</TableCell>
                                        <TableCell>{job.deadline_date}</TableCell>
                                        {job.full ? 
                                        <TableCell>
                                            <Button variant="contained" color="secondary" 
                                            >Full</Button>
                                        </TableCell>
                                        : null }
                                        {!job.full ? 
                                        <TableCell>
                                            <Button variant="contained" color="primary" onClick={ event => {
                                                window.localStorage.setItem('job_id',job._id);
                                                window.localStorage.setItem('job_title',job.job_title);
                                                //  window.location.replace("http://localhost:3000/apply");
                                                setApply(true);
                                                //  setFilter(!useFilter);
                                            }
                                            }>Apply</Button>
                                           
                                        </TableCell>
                                        : null }
                                    </TableRow>
                                   
                            ))}
                            </TableBody>
                        </Table>
                        { isApplying ?    

                            <Modal
                                isOpen={true}
                                // toggle={this.toggle}
                            >
                                <ModalHeader>Application</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={handleSubmitApp}>
                                        <FormGroup>
                                            <Label for="sop">Statement of Purpose</Label>
                                            <Input
                                                type="text"
                                                name="sop"
                                                id="sop"
                                                className="mb-3"
                                                onChange={event => setSOP(event.target.value)}
                                            />
                                            <Button
                                                color="dark"
                                                style={{marginTop: '2rem'}}
                                                block
                                                type="submit"
                                            >
                                            Submit
                                            </Button>
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                            </Modal>

                        : null }

                        { isError ?    

                            <Modal
                                isOpen={true}
                            >
                                <ModalHeader>Error</ModalHeader>
                                <ModalBody>
                                    <Form onSubmit={handleErrorPopup}>
                                        <FormGroup>
                                            <Label>You already have 10 open applications. Wait to be accepted/rejected to continue applying.</Label>
                                            
                                            <Button
                                                color="dark"
                                                style={{marginTop: '2rem'}}
                                                block
                                                type="submit"
                                            >
                                            Ok
                                            </Button>
                                        </FormGroup>
                                   </Form>
                                </ModalBody>
                            </Modal>

                        : null }

                    </Paper>               
                </Grid>    
            </Grid>            


        </div>

    )
    
}
