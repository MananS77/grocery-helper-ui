import React, { Component } from 'react';
import './App.css';
import GroceryHelperApp from "./component/GroceryHelperApp";

class App extends Component {
    render() {
        return (
            <div className="container">
                <GroceryHelperApp />
            </div>
        );
    }
}

export default App;
