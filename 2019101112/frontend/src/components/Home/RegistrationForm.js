import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { AuthContext } from '../../contexts/AuthContext';

import Divider from '@material-ui/core/Divider';


export default function RegistrationForm( { isRecruiter,isApplicant} ) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [bio, setBio] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [education, setEducation] = useState('');
    const [idstate, setId] = useState('');


    const [isAuthenticated, setAuthenticated] = useState(false);
    const [Namestate, setNamestate] = useState('');


    useEffect(() => {
        window.localStorage.setItem('isAuthenticated', isAuthenticated);
        window.localStorage.setItem('Namestate', isAuthenticated ? Namestate : '');
        window.localStorage.setItem('Id', isAuthenticated ? idstate : '');
      },[isAuthenticated])

    return(

        <AuthContext.Consumer>{(context) => {
          
            const {isAuth, setToken, toggleAuth, setUserName } = context;

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
                    toggleAuth();
                    setUserName(res.data.user.name);
                    setToken(res.data.token);

                    setAuthenticated(true);
                    setNamestate(res.data.user.name);
                    setId(res.data.user.id);
                    

                })
            }

            const handleSubmitApp = isAuth => (event) => {
                
                console.log(isAuth)
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
                    toggleAuth();
                    setUserName(res.data.user.name);
                    setToken(res.data.token);

                    setAuthenticated(true);
                    setNamestate(res.data.user.name);
                    setId(res.data.user.id);

                })
                
                console.log(isAuth)

            }
            
            if(isRecruiter){

            return(
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
                                    <Form.Control type="text" value={number} onChange={event => setNumber(event.target.value)}/>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Enter a Bio (max 250 words)</Form.Label>
                                    <Form.Control as="textarea" rows={3} value={bio} onChange={event => setBio(event.target.value)}/>
                                </Form.Group>
                                <Button className="btn btn-primary btn-large centerButton" 
                                type="submit">Submit</Button>
                            </Form>

                            {/* {isAuth ? "YESSS" : "NOOO "} */}
                        </div>
            
            )}

            if(isApplicant)
            {
                return(
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
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Education</Form.Label>
                                <Form.Control type="text" value={education} onChange={event => setEducation(event.target.value)}/>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Enter Some of your Skills</Form.Label>
                                <Form.Control as="textarea" rows={3} value={bio} onChange={event => setBio(event.target.value)}/>
                            </Form.Group>
                            <Button className="btn btn-primary btn-large centerButton" 
                            type="submit">Submit</Button>
                        </Form>

                        </div>
            )}

            else{
                return(
                    <div>
                    </div>
                )
            }

    }}</AuthContext.Consumer>
    
    )

}