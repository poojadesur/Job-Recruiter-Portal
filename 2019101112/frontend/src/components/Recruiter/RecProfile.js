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

import RecruiterLandingPage from './RecruiterLanding';

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


export default function RecruiterProfile() {

    // const Name = window.localStorage.getItem('Namestate');
    const id = window.localStorage.getItem('Id');
    const [Name, setName ] = useState('');
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');
    const [bio,setBio] = useState('');

    const [updatedPassword,setUpdatedPassword] = useState('');
    const [updatedEmail,setUpdatedEmail] = useState('');
    const [updatedNumber,setUpdatedNumber] = useState('');
    const [updatedName,setUpdatedName] = useState('');
    const [updatedBio,setUpdatedBio] = useState('');


    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }

    // const body = JSON.stringify({id})
    useEffect(() => {
        axios.get(`http://localhost:4000/api/recruiter/profile/${id}`)
        .then(res => {
            // console.log(res)
            // console.log(res.data)
            // console.log(res.data.email)
            console.log("got profile")
            // console.log(email)
            setName(res.data.name)
            setEmail(res.data.email);
            setNumber(res.data.contact_number);
            setBio(res.data.bio);
        })
        .catch( res => {
            // console.log(res.msg.msg);
            // console.log(res.data.msg);
            console.log("failed to get profile")
          })
      },[updatedName,updatedEmail,updatedNumber,updatedPassword,updatedBio])
    
    const classes = useStyles();

    const handleSubmit = (event) => {
        
        console.log("im tryna")
        event.preventDefault();
    
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }   

        const updatedContact_number = updatedNumber;
        const body = JSON.stringify({updatedName,updatedEmail,updatedPassword,updatedContact_number, updatedBio})
    
        axios.post(`http://localhost:4000/api/recruiter/updateprofile/${id}`, body, config)
          .then(res => {
              console.log("updated successfully");
              console.log(res.data);
              setUpdatedNumber('');
              setUpdatedEmail('');
              setUpdatedName('');
              setUpdatedPassword('');
              setUpdatedBio('');
          })
          .catch( res => {
            // console.log(res.msg.msg);
            // console.log(res.msg);
            console.log("failed to update")
          })
      }

    return (
        <div>

            <RecruiterLandingPage />

            Welcome to your profile!

            <Grid container spacing={2}>
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
                        <ListItemText
                            primary="Contact Number"
                            secondary={number}
                        />
                        </ListItem>
                        <ListItem>
                        <ListItemText
                            primary="Bio"
                            // {Array.from(skills).map((skill,ind => 
                            //     ))}
                            secondary={bio}
                        
                        />
                        </ListItem>
                    </List>
                </div>
                </Grid>
            </Grid>

            Update your Profile

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Updated Name</Form.Label>
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
                    <Form.Label>Updated Number</Form.Label>
                    <Form.Control type="number" value={updatedNumber} onChange={event => setUpdatedNumber(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Edit your Bio</Form.Label>
                    <Form.Control type="bio" value={updatedBio} onChange={event => setUpdatedBio(event.target.value)}/>
                </Form.Group>
                <Button className="btn btn-primary btn-large centerButton" 
                type="submit">Submit</Button>
            </Form>



        </div>
    )

}