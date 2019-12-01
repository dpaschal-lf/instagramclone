import React from 'react';

export default props => {
    console.log(props.data)
    return (
        <div className="commentItem">
            <div className="userData">
                <div className="avatar" style={{backgroundImage: `url(${props.data.avatar})`}}></div>
                <div className="userName">{props.data.displayName}</div>
            </div>
            <div className="messageData">
                <div className="messageContent">{props.data.message}</div>
                <div className="messageMetaData">
                    <div className="messagePosted">{props.data.added}</div>
                    <div className="messageEdited">{props.data.edited}</div>
                </div>
            </div>
        </div>
    );
}