import React from 'react';

const Toolbar = ({ readMessages, unreadMessages, selectedAll, deleteMessage, applyLabels, removeLabels, messages }) => {
    const unReadMessagesCount = messages.filter(message=> !message.read).length;
    return(
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unReadMessagesCount}</span>
                    unread messages
                    </p>

                <button className="btn btn-default" onClick={selectedAll}>
                    <i className="fa fa-check-square-o"></i>
                </button>

                <button className="btn btn-default" onClick={readMessages}>
                    Mark As Read
                    </button>

                <button className="btn btn-default" onClick={unreadMessages}>
                    Mark As Unread
                     </button>

                <select className="form-control label-select" onChange={applyLabels}> 
                    <option>Apply label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <select className="form-control label-select" onChange={removeLabels}>
                    <option>Remove label</option>
                    <option value="dev">dev</option>
                    <option value="personal">personal</option>
                    <option value="gschool">gschool</option>
                </select>

                <button className="btn btn-default" onClick={deleteMessage}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )

}

export default Toolbar;