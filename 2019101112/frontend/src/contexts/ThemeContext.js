import React, { createContext, Component} from 'react';

// create a context for us

export const ThemeContext = createContext();

// create class component that will have some state which will be the data we want to share btw different compnon

export default class ThemeContextProvider extends Component {
    state = {
        isLightTheme: true,
        light: { syntax: '#555', ui: '#ddd', bg: "#eee" },
        dark: { syntax: '#ddd', ui: '#333', bg: '#555'}
    }
    render() {
        return ( 
            //provider wraps components so data can be used, value is the data thats being sent
            <ThemeContext.Provider value={{...this.state}}>
                {this.props.children}
            </ThemeContext.Provider>
        );
    }
}