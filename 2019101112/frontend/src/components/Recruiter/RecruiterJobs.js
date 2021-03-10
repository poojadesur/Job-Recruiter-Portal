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

// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";


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

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    },
    selectTableCell: {
      width: 60
    },
    tableCell: {
      width: 130,
      height: 40
    },
    input: {
      width: 130,
      height: 40
    }
  }));

  const createData = (id,job_title, posting_date, num_applicants, num_filled_positions, max_positions,max_applicants,deadline_date) => ({
    id,
    job_title,
    posting_date,
    num_applicants,
    num_filled_positions,
    max_positions,
    max_applicants,
    deadline_date,
    isEditMode: false
  });

  const CustomTableCell = ({ job, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = job;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={job[name]}
            name={name}
            onChange={e => onChange(e, job)}
            className={classes.input}
          />
        ) : (
          job[name]
        )}
      </TableCell>
    );
  };


export default function RecruiterJobs() {

    const [jobs,setJobs] = useState('');
    const [useFilter,setFilter] = useState(false);
    const [isAscending,setAscending] = useState(false);

    const classes = useStyles();
    const [previous, setPrevious] = useState({});

    useEffect(() => {
        const id = window.localStorage.getItem('Id');
        axios.get(`http://localhost:4000/api/recruiter/viewjobs/${id}`)
        .then(res => {
            console.log("rendering")
            const jobsarr = res.data
            setJobs(Array.from(jobsarr).map((job) => ( createData(job._id,job.job_title,job.posting_date,job.num_applicants,job.num_filled_positions,job.max_positions,job.max_applicants,job.deadline_date) )));
        })
        .catch(function(error) {
            console.log(error);
        })
    },[useFilter,isAscending])

    useEffect(() => {
        const id = window.localStorage.getItem('Id');
        axios.get(`http://localhost:4000/api/recruiter/viewjobs/${id}`)
        .then(res => {
            console.log("rendering only first time")
            const jobsarr = res.data
            setJobs(Array.from(jobsarr).map((job) => ( createData(job._id,job.job_title,job.posting_date,job.num_applicants,job.num_filled_positions,job.max_positions,job.max_applicants,job.deadline_date) )));
        })
        .catch(function(error) {
            console.log(error);
        })
    },[])

    function handleDeleteJob (job_id){

        axios.delete(`http://localhost:4000/api/jobs/${job_id}`)
        .then(res => {
            console.log("deleted job success")
        })
        .catch(function(error) {
            console.log(error);
            console.log("deleted job fail")
        })

        setFilter(!useFilter);

    }

    function goApplications (job_id){
        window.localStorage.setItem('job_id',job_id);
        console.log("going to applicant page");
        console.log(job_id);
        window.location.replace("http://localhost:3000/applications");

    }

    const onToggleEditMode = id => {
        setJobs(state => {
          return jobs.map(job => {
            if (job.id === id) {
              return { ...job, isEditMode: !job.isEditMode };
            }
            return job;
          });
        });
    };

    function editJob ( id ) {
        const recruiter_id = window.localStorage.getItem('Id');
        jobs.map( job => {

            if(job.id === id) {
                const max_applicants = job.max_applicants;
                const max_positions = job.max_positions;
                const deadline_date = job.deadline_date;
                const job_id = id;
                const body = { job_id, recruiter_id, max_applicants, max_positions, deadline_date}

                const config = {
                    headers: {
                        'Content-Type':'application/json'
                    }
                }   

                axios.post('http://localhost:4000/api/recruiter/editjob',body,config)
                    .then(res => {
                        console.log("updated job")
                        setFilter(!useFilter);
                    })
                    .catch( res => {
                        console.log("failed to update")
                    })
                
                onToggleEditMode(job_id)
            }})
    }

    const onChange = (e, job) => {
    if (!previous[job.id]) {
        setPrevious(state => ({ ...state, [job.id]: job }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = job;
    const newJobs = jobs.map(job => {
        if (job.id === id) {
        return { ...job, [name]: value };
        }
        return job;
    });
    setJobs(newJobs);
    };

    const onRevert = id => {
        const newJobs = jobs.map(job => {
          if (job.id === id) {
            return previous[id] ? previous[id] : job;
          }
          return job;
        });
        setJobs(newJobs);
        setPrevious(state => {
          delete state[id];
          return state;
        });
        onToggleEditMode(id);
      };


    return (

        <div>

            <RecruiterLandingPage/>
            
            <Grid container>
                <Grid item xs={12} md={9} lg={9}>
                    <Paper>
                        <Table size="medium">
                            <TableHead >
                                <TableRow style={{fontWeight:'bold'}}>
                                        <TableCell />
                                        <TableCell>Title</TableCell>
                                        <TableCell>Date of Posting Job</TableCell>
                                        <TableCell>Application Deadline</TableCell>
                                        <TableCell>Number of Applicants</TableCell>
                                        <TableCell>Maximum Number of Applicants</TableCell>
                                        <TableCell>Number of Positions Filled</TableCell>
                                        <TableCell>Maximum Number of Positions</TableCell>
                                        <TableCell />

                                </TableRow>
                            </TableHead>
                            <TableBody> 
                                {Array.from(jobs).map((job,ind) => (
                                    <TableRow key={ind} onRowClick={() => goApplications(job.id)}>
                                        <TableCell className={classes.selectTableCell}>
                                        {job.isEditMode ? (
                                            <>
                                            <IconButton
                                                aria-label="done"
                                                onClick={() => editJob(job.id)}
                                            >
                                                <DoneIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="revert"
                                                onClick={() => onRevert(job.id)}
                                            >
                                                <RevertIcon />
                                            </IconButton>
                                            </>
                                        ) 
                                        : (
                                            <IconButton
                                            aria-label="delete"
                                            onClick={() => onToggleEditMode(job.id)}
                                            >
                                            <EditIcon />
                                            </IconButton>
                                        )}
                                        </TableCell>
                                        <TableCell>{job.job_title}</TableCell>
                                        <TableCell>{job.posting_date}</TableCell>
                                        <CustomTableCell {...{ job, name: "deadline_date", onChange }} />
                                        <TableCell>{job.num_applicants}</TableCell>
                                        <CustomTableCell {...{ job, name: "max_applicants", onChange }} />
                                        <TableCell>{job.num_filled_positions}</TableCell>
                                        <CustomTableCell {...{ job, name: "max_positions", onChange }} />
                                        <TableCell>
                                            <Button
                                            onClick={() => goApplications(job.id)}
                                            color="secondary"
                                            >
                                            View Applications
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                            onClick={() => handleDeleteJob(job.id)}
                                            color="secondary"
                                            >
                                            Delete
                                            </Button>
                                        </TableCell>

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
