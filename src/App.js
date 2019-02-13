import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  componentDidMount() {
    axios.get('//localhost:8998/?fund=FBARFPB')
      .then(response => console.log(response));
  }

  render() {
    return (
      <div className="App">

      </div>
    );
  }
}

export default App;
