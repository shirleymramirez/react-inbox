import React from 'react';
import Body from './Body';

function Message({ id, subject, read, selected, checkMessage, starred, starMessage, labels, body  }) {
    console.log(labels)
    const isSelected = selected ? 'selected' : ''
    return (
        <div>
            {/* If the message is read, it should have the read style
            If the message is unread, it should have the unread
            If the message is selected, it should have the selected style and the box should be checked */}
            <div className={`row message ${read ? 'read' : 'unread'} ${selected ? 'selected' : ''}`}>
                <div className="col-xs-1">
                    <div className="row">
                        <div className="col-xs-2">
                            <input type="checkbox" onClick={()=>checkMessage(id)} checked={`${selected ? 'checked' : ''}`}/>
                        </div>
                        <div className="col-xs-2">
                            {/* If the message is starred, then the star should be filled in, otherwise it should be empty */}
                            <i onClick={() => starMessage(id)} className={`star fa ${ starred ? 'fa-star': 'fa-star-o'}`}></i>
                        </div>
                    </div>
                </div>
                <div className="col-xs-11">
                    {/* If there are labels on a message, they should appear */}
                    {labels.map((label,i)=> <span key={i} className="label label-warning">{label}</span>)}
                    <a href="/">
                        {/* Then they should see a list of messages with their subjects */}
                        {subject}
                    </a>
                </div>
            </div>
            { isSelected ? <Body body={body}  /> : ''}
        </div>
    )
    
}

export default Message;