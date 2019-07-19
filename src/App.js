import React from 'react';
import Toolbar from './Components/Toolbar';
import Messages from './Components/Messages'
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  state ={
    messages: [],
    allSelected: true
  }

  componentDidMount() {
    this.getAllMessages();
  }

  getAllMessages = async () => {
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

  checkMessage = (id) => {
    const newMessages = this.state.messages.map(message=> {
      // If the message is selected, it should have the selected style and the box should be checked
      if(message.id === id) message.selected ? message.selected=false : message.selected=true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }
  
  starMessage = async (message) => {
    // If the message is starred, then the star should be filled in, otherwise it should be empty
    const response = await fetch('http://localhost:8082/api/messages', {
      method: "PATCH",
      body: JSON.stringify({
        messagesIds: [message.id],
        command: 'star',
        star: message.starred
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if(response) this.getAllMessages();
  }


  render(){
    return (
      <Router>
        <Toolbar 
          allSelected={this.state.allSelected}
          selectionButton={this.selectionButton}
          markAsRead={this.markAsRead}
          markAsUnread={this.markAsUnread}
          applyLevel={this.applyLevel}
          removeLevel={this.removeLevel}
          trashButton={this.trashButton}
          plusButton={this.plusButton}
        />
        <Messages 
          messages={this.state.messages}
          checkMessage={this.checkMessage}
          starMessage={this.starMessage}
        />
      </Router>

    )
  }
}

export default App;
