import React, { createContext, Component} from 'react';

// create a context for us

export const ApplicantContext = createContext();

// create class component that will have some state which will be the data we want to share btw different compnon

export default class ApplicantContextProvider extends Component {
    state = {
        isLightTheme: true,
        light: { syntax: '#555', ui: '#ddd', bg: "#eee" },
        dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
    }
    toggleTheme = () => {
        this.setState({ isLightTheme: !this.state.isLightTheme });
    }
    render() {
        return ( 
            //provider wraps components so data can be used, value is the data thats being sent
            <ApplicantContext.Provider value={{...this.state,toggleTheme: this.toggleTheme}}>
                {this.props.children}
            </ApplicantContext.Provider>
        );
    }
}