import React, { Component, createContext } from 'react';

export const AuthContext = createContext();

export default class AuthContextProvider extends Component {
    state = { 
        isAuth: false,
        Name: '',
        token:'',
        id:''
    }

    toggleAuth = () => {
        this.setState({isAuth: true})
    }

    setUserName = (name) => {
        this.setState({Name: name})
    }

    setId = (id) => {
        this.setState({id: id})
    }

    setToken = (token) => {
        this.setState({token: token})
    }

    render() {
        return (
            <AuthContext.Provider value={{...this.state, toggleAuth:this.toggleAuth, setUserName:this.setUserName, setToken:this.setToken, setId:this.setId}}>
                {this.props.children}
            </AuthContext.Provider>
         );
    }
}