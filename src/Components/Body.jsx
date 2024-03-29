import React from 'react';

function Body ({ body }) {
    return (
        <div className="row message-body">
            <div className="col-xs-11 col-xs-offset-1">
                {body}
            </div>
        </div>
    )
}

export default Body;