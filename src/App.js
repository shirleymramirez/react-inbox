import React from 'react'
import Toolbar from './Components/Toolbar'
import Compose from './Components/Compose'
import Messages from './Components/Messages'
import { BrowserRouter as Router } from "react-router-dom"

class App extends React.Component {
  state ={
    messages: [],
    compose: false
  }

  componentDidMount() {
    this.getAllMessages();
  }

  getAllMessages = async () => {
    // const response = await fetch(`${process.env.REACT_APP_API_URL}/api/messages`);
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
    // If the message is selected, it should have the selected style and the box should be checked
    const newMessages = this.state.messages.map(message=> {
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

  readMessages = async () => {
    const messageIds = this.state.messages.filter(message => 
      message.selected === true).map(message=> message.id)

    const response = await fetch('http://localhost:8082/api/messages', {
      method: "PATCH",
      body: JSON.stringify({
        command: 'read',
        read: true,
        messageIds: messageIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) this.getAllMessages();
  }

  unreadMessages = async() => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await fetch('http://localhost:8082/api/messages', {
      method: "PATCH",
      body: JSON.stringify({
        command: 'read',
        read: false,
        messageIds: messageIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) this.getAllMessages();
  }

  selectedAll = () => {
    const allMessages = this.state.messages.every(message=>message.selected === true)
    const newMessages = this.state.messages.map(message=> {
      allMessages ? message.selected = false : message.selected = true
      return message
    })
    this.setState({
      messages: newMessages
    })
  }

  deleteMessage = async(id) => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await fetch('http://localhost:8082/api/messages', {
      method: "PATCH",
      body: JSON.stringify({
        command: 'delete',
        messageIds: messageIds
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) this.getAllMessages();
  }

  applyLabels = async (e) => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await fetch('http://localhost:8082/api/messages', {
      method: "PATCH",
      body: JSON.stringify({
        command: 'addLabel',
        messageIds: messageIds,
        label: e.target.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) this.getAllMessages();
  }

  removeLabels = async (e) => {
    const messageIds = this.state.messages.filter(message =>
      message.selected === true).map(message => message.id)

    const response = await fetch('http://localhost:8082/api/messages', {
      method: "PATCH",
      body: JSON.stringify({
        command: 'removeLabel',
        messageIds: messageIds,
        label: e.target.value
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) this.getAllMessages();
  }

  createMessage = async({body, subject}) => {
    const response = await fetch('http://localhost:8082/api/messages', {
      method: "POST",
      body:JSON.stringify({
        subject,
        body
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (response) this.getAllMessages();
    this.toggleCompose();
  }

  toggleCompose = () => {
    this.setState({
      compose: !this.state.compose
    })
  }


  render(){
    return (
      <Router>
        <Toolbar 
          readMessages={this.readMessages}
          unreadMessages={this.unreadMessages}
          selectedAll={this.selectedAll}
          deleteMessage={this.deleteMessage}
          applyLabels={this.applyLabels}
          removeLabels={this.removeLabels}
          messages={this.state.messages}
          toggleCompose={this.toggleCompose}
        />
        {this.state.compose ? <Compose createMessage={this.createMessage} /> : ''}
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
