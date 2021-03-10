import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import {
    Modal,
    ModalHeader,
    ModalBody,
    // Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';


import RecruiterLandingPage from './RecruiterLanding';


export default function CreateJob( ) {

    const [recruiter_id,setRecruterId] = useState('');
    const [job_title,setTitle] = useState('');
    const [maxApp,setMaxApp] = useState('');
    const [maxPos,setMaxPos] = useState('');
    const [salary,setSalary] = useState('');
    const [duration,setDuration] = useState('');
    const [job_type,setJobType] = useState('');
    const [skillSet,setSkillSet] = useState('');
    const [deadline,setDeadline] = useState('');

    const [isError,setErrorPopup] = useState(false);
    const [useFilter,setFilter] = useState(false);

    // useEffect(() => {
    //   },[useFilter])

    const handleSubmit = (e) => {

        // get recruiter details
        const id = window.localStorage.getItem('Id'); // this is recruiter's id
        console.log(id)
        console.log(Number(salary))
        
        // create job
        const max_applicants = maxApp;
        const max_positions = maxPos;
        const deadline_date = deadline;
        const required_skillset = skillSet;

        if(Number(salary) < 1 )
        {   
            setErrorPopup(true);
            setFilter(!useFilter);
        }

        else if( Number(max_positions) > Number(max_applicants) )
        {
            console.log("bad")
            setErrorPopup(true);
            setFilter(!useFilter);
        }
        
        else 
        {
            const body = {job_title, id, max_applicants, max_positions, deadline_date, required_skillset, job_type, duration, salary }

            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }
        
            axios.post('http://localhost:4000/api/recruiter/createjob', body, config)
            .then(res => {
                console.log("successfully created job")
            })
            .catch(err=>
                console.log(err)
            )
        }

    }

    const handleErrorPopup = (e) => {
       
        // e.preventDefault();
        console.log("ok button")
        setErrorPopup(!isError);
        setFilter(!useFilter);
    }

    console.log(isError);

    return (

            <div>

            <RecruiterLandingPage />

            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control type="name" value={job_title} onChange={event => setTitle(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Max Num. of Applicant</Form.Label>
                    <Form.Control type="number" value={maxApp} onChange={event => setMaxApp(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Max Num. of Positions</Form.Label>
                    <Form.Control type="number" value={maxPos} onChange={event => setMaxPos(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Salary</Form.Label>
                    <Form.Control type="number" value={salary} onChange={event => setSalary(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control type="number" value={duration} onChange={event => setDuration(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Job Type (Full Time, Part Time, At Home)</Form.Label>
                    <Form.Control type="text" value={job_type} onChange={event => setJobType(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Required Skill Set</Form.Label>
                    <Form.Control type="text" value={skillSet} onChange={event => setSkillSet(event.target.value)}/>
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Application Deadline</Form.Label>
                    <Form.Control type="date" value={deadline} onChange={event => setDeadline(event.target.value)}/>
                </Form.Group>
                <Button className="btn btn-primary btn-large centerButton" 
                type="submit">Create Job</Button>
            </Form>

            {isError ? 

                <Modal
                isOpen={true}
                >
                <ModalHeader>Error</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleErrorPopup}>
                        <FormGroup>
                            <Label>Possible Errors: Max Applicants cannot be less than Max Positions. Salary must be a positive integer value.</Label>
                            
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

            :null}


            
        </div>
    )

}
