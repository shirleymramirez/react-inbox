import React from 'react';
import Message from '../Components/Message';

function Messages ({ messages }) {
    console.log(messages)
    return (
        <div>
         {messages.map(message=> 
            <Message key={message.id} 
                subject={message.subject}
                labels={message.labels}
                read={message.read}
                starred={message.starred}
                body={message.body}
            />)}
        </div>
    )
}

export default Messages;