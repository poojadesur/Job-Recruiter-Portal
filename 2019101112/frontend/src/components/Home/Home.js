import React, {Component} from 'react';
import {Container , Button} from '@material-ui/core';

import HomeNavbar from './HomeNavBar';

export default class Home extends Component {
    
    render() {
        return (
            <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                class: "align-items-center"
              }}>   
                <Container >
                    <h1 style={{marginLeft:'2.5rem' , position:'relative' , top:'3rem' , fontSize:'3rem'}}></h1>
                    <HomeNavbar />
                </Container>
           </div>
        )
    }
}