import React from 'react';
import Message from '../Components/Message';

function Messages({ messages, checkMessage, starMessage }) {
    return (
        <div>
         {messages.map(message=> 
            <Message 
                key={message.id} 
                checkMessage={checkMessage}
                starMessage={starMessage}
                {...message}
            />)}
        </div>
    )
}

export default Messages;