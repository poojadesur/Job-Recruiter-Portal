import React, { useState, useEffect } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import HomeNavbar from './HomeNavBar';

import Divider from '@material-ui/core/Divider';


export default function Register() {

  const [isRecruiter, setRecruiter] = useState(false);
  const [isApplicant, setApplicant] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [Namestate, setNamestate] = useState('');
  const [idstate, setIdState] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');
  const [education, setEducation] = useState('');


  useEffect(() => {
    window.localStorage.setItem('isAuthenticated', isAuthenticated);
    window.localStorage.setItem('Namestate', isAuthenticated ? Namestate : '');
    window.localStorage.setItem('Id', isAuthenticated ? idstate : '');
    if(isAuthenticated && isApplicant)
    {
      // console.log(isAuth);
      // console.log(Name);
      console.log("hello")
      window.location.replace("http://localhost:3000/applicantlanding");

    }

    if(isAuthenticated && isRecruiter)
    {
      // console.log(isAuth);
      // console.log(Name);
      console.log("hello")
      window.location.replace("http://localhost:3000/recruiterlanding");
    }
  },)

  const handleSelect = (event) => {
    if(event === 'recruiter'){
      setApplicant(false)
      setRecruiter(true)
    }
    if(event === 'applicant'){
      setApplicant(true)
      setRecruiter(false)
    }
  };  


  const handleSubmitRec = (event) => {
                
    event.preventDefault();

    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const contact_number = number;
    const body = JSON.stringify({ name, email, contact_number, bio, password, repassword})

    axios.post('http://localhost:4000/api/auth/recruiter/register', body, config)
    .then(res => {
        // console.log(res.data)
        // console.log(res.data.token)
        console.log("success")
        setName('');
        setEmail('');
        setNumber('');
        setBio('');
        setPassword('');
        setRepassword('');
        setEducation('');
        // setUserName(res.data.user.name);
        // setToken(res.data.token);

        setAuthenticated(true);
        setNamestate(res.data.user.name);
        setIdState(res.data.user.id);
    })
    .catch(res => {
      console.log("error")
    })
}

const handleSubmitApp = (event) => {
    
    event.preventDefault();

    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    }
    const contact_number = number;
    const body = JSON.stringify({ name, email, contact_number, bio, password, repassword})
    axios.post('http://localhost:4000/api/auth/applicant/register', body, config)
    .then(res => {
        console.log("success")
        setName('');
        setEmail('');
        setNumber('');
        setBio('');
        setPassword('');
        setRepassword('');
        setEducation('');
        // setUserName(res.data.user.name);
        // setToken(res.data.token);

        setAuthenticated(true);
        setNamestate(res.data.user.name);
        setIdState(res.data.user.id);

    })
    .catch(res => {
      console.log("error")
    })
    
}



          
  return (

        <div>
        <HomeNavbar />
        Welcome to the Registration Page! Make an Account as an Applicant or Recruiter to avail the portal's features.

        <DropdownButton id="dropdown-basic-button" title="How will you be using the Portal?" onSelect={handleSelect}>
        <Dropdown.Item eventKey="recruiter">Recruiter</Dropdown.Item>
        <Dropdown.Item eventKey="applicant">Applicant</Dropdown.Item>
        </DropdownButton>

        {isRecruiter ? 

          <div>
          Recruiter Registration Form :
          <Divider/>
          <Form onSubmit={handleSubmitRec}>
              <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="name" value={name} onChange={event => setName(event.target.value)}/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={email} placeholder="name@example.com" onChange={event => setEmail(event.target.value)}/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={event => setPassword(event.target.value)}/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Enter Same Password Again:</Form.Label>
                  <Form.Control type="password" value={repassword} onChange={event => setRepassword(event.target.value)}/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control type="tel" value={number} onChange={event => setNumber(event.target.value)}/>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Enter a Bio (max 250 words)</Form.Label>
                  <Form.Control as="textarea" rows={3} value={bio} onChange={event => setBio(event.target.value)}/>
              </Form.Group>
              <Button className="btn btn-primary btn-large centerButton" 
              type="submit">Submit</Button>
          </Form>
          </div>

        :null}

        {isApplicant ? 

          <div>
                                Applicant Registration Form :
              <Form onSubmit={handleSubmitApp}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="name" value={name} onChange={event => setName(event.target.value)}/>
                </Form.Group>
                {/* <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>test</Form.Label>
                    <Form.Control type="name" value={name} onChange={toggleAuth}/>
                </Form.Group> */}
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} placeholder="name@example.com" onChange={event => setEmail(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Enter Same Password Again:</Form.Label>
                    <Form.Control type="password" value={repassword} onChange={event => setRepassword(event.target.value)}/>
                </Form.Group>
                {/* <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Education</Form.Label>
                    <Form.Control type="text" value={education} onChange={event => setEducation(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Enter Some of your Skills</Form.Label>
                    <Form.Control as="textarea" rows={3} value={bio} onChange={event => setBio(event.target.value)}/>
                </Form.Group> */}
                <Button className="btn btn-primary btn-large centerButton" 
                type="submit">Submit</Button>
            </Form>
                You'll be able to edit your profile later on!
          </div>
        
        :null}

      </div>
  )
}

