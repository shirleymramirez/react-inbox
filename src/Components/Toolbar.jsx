import React from 'react';

const Toolbar = ({ readMessages, unreadMessages, selectedAll, deleteMessage, applyLabels, removeLabels, messages, toggleCompose }) => {
    // Users should always see the number of unread messages
    const unReadMessagesCount = messages.filter(message=> !message.read).length;
    const selectedCount = messages.filter(message=>message.selected).length;

    let selectAllClass;

    // Users should see the state of the select all button change as messages are selected
    switch (selectedCount) {
        case 0:
            // no messages are checked
            selectAllClass = 'fa-square-o'
            break;
        case messages.length:
            // all messages are checked
            selectAllClass = 'fa-check-square-o';
            break;
        default:
            // some messsages are checked
            selectAllClass = 'fa-minus-square-o';
    }

    return(
        <div className="row toolbar">
            <div className="col-md-12">
                <p className="pull-right">
                    <span className="badge badge">{unReadMessagesCount}</span>
                    unread messages
                    </p>
                <a className="btn btn-danger">
                    <i className="fa fa-plus" onClick={toggleCompose}/>
                </a>

                <button 
                    className="btn btn-default" 
                    onClick={selectedAll}
                    // Users should not be able to click on toolbar items when no messages are selected
                    disabled={selectedCount === 0}>
                    <i className={`fa ${selectAllClass}`}></i>
                </button>

                <button 
                    className="btn btn-default" 
                    onClick={readMessages}
                    disabled={selectedCount === 0}>
                    Mark As Read
                    </button>

                <button 
                    className="btn btn-default" 
                    onClick={unreadMessages}
                    disabled={selectedCount === 0}
                    >
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

                <button 
                    className="btn btn-default" 
                    onClick={deleteMessage}
                    disabled={selectedCount === 0}>
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
        </div>
    )

}

export default Toolbar;