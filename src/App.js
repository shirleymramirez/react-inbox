import React from 'react';
import Toolbar from './Components/Toolbar';
import Messages from './Components/Messages'
import { BrowserRouter as Router } from "react-router-dom";


class App extends React.Component {
  state ={
    messages: [],
    allSelected: true
  }

  async componentDidMount() {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/messages`);
    const response = await fetch('http://localhost:8082/api/messages');
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
    console.log(this.state.messages);
    return (
      <Router>
        <Toolbar 
          allSelected={this.state.allSelected}
          checkBox={this.checkbox}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          applyLevel={this.applyLevel}
          removeLevel={this.removeLevel}
          trashButton={this.trashButton}
          plusButton={this.plusButton}
        />
        <Messages 
          messages={this.state.messages}
        />
      </Router>

    )
  }
}

export default App;
