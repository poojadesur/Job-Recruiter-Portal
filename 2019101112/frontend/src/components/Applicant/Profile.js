import React, { Component, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import ApplicantLandingPage from './Landing';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));


export default function ApplicantProfile() {

    // const Name = window.localStorage.getItem('Namestate');
    const id = window.localStorage.getItem('Id');
    const [Name, setName ] = useState('');
    const [email,setEmail] = useState('');
    const [education,setEducation] = useState([]);
    const [skills,setSkills] = useState([]);

    const [updatedPassword,setUpdatedPassword] = useState('');
    const [updatedEmail,setUpdatedEmail] = useState('');
    const [updatedEducation,setUpdatedEducation] = useState('');
    const [updatedInstitution,setUpdatedInstitution] = useState('');
    const [updatedName,setUpdatedName] = useState('');
    const [updatedSkills,setUpdatedSkills] = useState('');
    const [updatedStartYear,setUpdatedStartYear] = useState('');
    const [updatedEndYear,setUpdatedEndYear] = useState('');


    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    // const body = JSON.stringify({id})
    useEffect(() => {
        axios.get(`http://localhost:4000/api/applicant/profile/${id}`)
        .then(res => {
            // console.log(res)
            // console.log(res.data)
            // console.log(res.data.email)
            console.log("got profile")
            console.log(res.data.num_applications)
            // console.log(email)
            setName(res.data.name)
            setEmail(res.data.email);
            setEducation(res.data.education);
            setSkills(res.data.skills);
        })
        .catch( res => {
            // console.log(res.msg.msg);
            // console.log(res.data.msg);
            console.log("failed to get profile")
          })
      },[updatedName,updatedEmail,updatedInstitution,updatedPassword,updatedSkills])
    
    const classes = useStyles();

    const handleSubmit = (event) => {
    
        event.preventDefault();
    
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        
        const educationPacket = {"institution":updatedInstitution,"start_year":updatedStartYear,"end_year":updatedEndYear}

        setUpdatedEducation(educationPacket);
        
        const body = JSON.stringify({updatedName,updatedEmail,updatedPassword,updatedEmail,updatedEducation, updatedSkills})
    
        axios.post(`http://localhost:4000/api/applicant/updateprofile/${id}`, body, config)
          .then(res => {
              console.log("updated successfully");
              console.log(res.data);
              setUpdatedEducation('');
              setUpdatedInstitution('');
              setUpdatedStartYear('');
              setUpdatedEndYear('');
              setUpdatedEmail('');
              setUpdatedName('');
              setUpdatedPassword('');
              setUpdatedSkills('');
          })
          .catch( res => {
            // console.log(res.msg.msg);
            // console.log(res.msg);
            console.log("failed to update")
          })
      }

    return (
        <div>

            <ApplicantLandingPage />

            <h3>Welcome to your profile!</h3>

            <Grid container spacing={5}>
                <Grid item xs={12} md={6}>
                <Typography variant="h6" className={classes.title}>
                    Your Profile
                </Typography>
                <div className={classes.demo}>
                    <List>
                        <ListItem>
                        <ListItemText
                            primary="Name"
                            secondary={Name}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText
                            primary="Email"
                            secondary={email}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText/>
                            <div>
                            Skills
                            <ul>{skills.map(skill => <li key={skill}> {skill} </li>)}</ul>
                            </div>
                        </ListItem>
                        <ListItem>
                            
                        <ListItemText>
                        <div>
                            Skills
                            <ul>{skills.map(skill => <li key={skill}> {skill} </li>)}</ul>
                        </div>
                        </ListItemText>
                        </ListItem>
                    </List>
                </div>
                </Grid>
            </Grid>

            <Typography variant="h6" className={classes.title}>
                    Update your profile:
            </Typography>

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label column sm={2}>Updated Name</Form.Label>
                    <Form.Control type="name" value={updatedName} onChange={event => setUpdatedName(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Updated Email address</Form.Label>
                    <Form.Control type="email" value={updatedEmail} placeholder="name@example.com" onChange={event => setUpdatedEmail(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Updated Password</Form.Label>
                    <Form.Control type="password" value={updatedPassword} onChange={event => setUpdatedPassword(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Educational Institution</Form.Label>
                    <Form.Control type="education" value={updatedInstitution} onChange={event => setUpdatedInstitution(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Education Institution Start Year</Form.Label>
                    <Form.Control size="sm" type="number" value={updatedStartYear} onChange={event => setUpdatedStartYear(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Education Institution End Year</Form.Label>
                    <Form.Control size="sm" type="number" value={updatedEndYear} onChange={event => setUpdatedEndYear(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Add to your Skills</Form.Label>
                    <Form.Control type="education" value={updatedSkills} onChange={event => setUpdatedSkills(event.target.value)}/>
                </Form.Group>
                <Button className="btn btn-primary btn-large centerButton" 
                type="submit">Submit</Button>
            </Form>



        </div>
    )

}