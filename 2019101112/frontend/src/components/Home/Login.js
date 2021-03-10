import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {AuthContext} from "../../contexts/AuthContext";
import HomeNavbar from './HomeNavBar';

export default function Login() {
  
  const [isRecruiter,setRecruiter] = useState(false);
  const [isApplicant,setApplicant] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setAuthenticated] = useState('');
  const [Namestate, setName] = useState('');
  const [idstate, setIdState] = useState('');

  useEffect(() => {
    window.localStorage.setItem('isAuthenticated', isAuthenticated);
    window.localStorage.setItem('Namestate', isAuthenticated ? Namestate : '');
    window.localStorage.setItem('idstate', isAuthenticated ? idstate : '');
  },[isAuthenticated])


  return (

    <AuthContext.Consumer>{(context) => {
          
      const {isAuth, Name, id, toggleAuth, setUserName, setToken, setId } = context;
      console.log(isAuth);
  
      if(isAuthenticated && isApplicant)
      {
        console.log(isAuth);
        console.log(Name);
        window.location.replace("http://localhost:3000/applicantlanding");

      }

      if(isAuthenticated && isRecruiter)
      {
        console.log(isAuth);
        console.log(Name);

        window.location.replace("http://localhost:3000/recruiterlanding");
      }

      const handleSubmit = (event) => {
    
          event.preventDefault();

          console.log("called submit")
      
          const config = {
              headers: {
                  'Content-Type':'application/json'
              }
          }
      
          const body = JSON.stringify({email,password})

          console.log(body)
      
          axios.post('http://localhost:4000/api/auth/applicant/login', body, config)
            .then(res => {
                // console.log(res.data)
                console.log(res.data.token)
                console.log("success applicant login")
                setApplicant(true);
                setEmail('');
                setPassword('');
                toggleAuth();
                setUserName(res.data.user.name);
                setToken(res.data.token);
                setAuthenticated(true);
                setName(res.data.user.name);
                setId(res.data.user.id);
                setIdState(res.data.user.id);
                console.log(res.data.user.name)
                console.log(id)
                window.localStorage.setItem('Id',res.data.user.id);
                window.localStorage.setItem('Namestate', isAuthenticated ? Namestate : '');


            })
            .catch( res => {
              // console.log(res.msg.msg);
              // console.log(res.msg);
              console.log("failed to login as applicant")
            })
      
          axios.post('http://localhost:4000/api/auth/recruiter/login', body, config)
            .then(res => {
                // console.log(res.data)
                // console.log(res.data.token)
                console.log("success recruiter login")
                setRecruiter(true);
                setEmail('');
                setPassword('');
                toggleAuth();
                setUserName(res.data.user.name);
                setToken(res.data.token);
                setAuthenticated(true);
                setName(res.data.user.name);
                setId(res.data.user.id);
                setIdState(res.data.user.id);
                console.log(res.data.user.name)
                console.log(id)
                window.localStorage.setItem('Id',res.data.user.id);
                window.localStorage.setItem('Namestate', isAuthenticated ? Namestate : '');

            })
            .catch( res => {
              // console.log(res.msg.msg);
              // console.log(res.data.msg);
              console.log("failed to login as recruiter")
            })

        }
          
          return(

              <div>
                <HomeNavbar/>
                Hello user! Use the common login portal to login to your account as either an applicant or a recruiter!
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} placeholder="name@example.com" onChange={event => setEmail(event.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={event => setPassword(event.target.value)}/>
                    </Form.Group>
                    <Button className="btn btn-primary btn-large centerButton" 
                    type="submit">Submit</Button>
                </Form>
              </div>

           )
           
    }}</AuthContext.Consumer>
      
  );
}


