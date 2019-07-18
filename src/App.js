import React from 'react';
import Toolbar from './Components/Toolbar';
import Messages from './Components/Messages'
import { BrowserRouter as Router } from "react-router-dom";


class App extends React.Component {
  state ={
    messages: []
  }

  async componentDidMount() {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`);
    const json = await response.json();
    this.setState({
      messages:json.map(message=> {
        return {
          ...message
        }
      })
    })
  }

  render(){
    return (
      <Router>
        <Toolbar />
        <Messages />
      </Router>

    )
  }
}

export default App;
