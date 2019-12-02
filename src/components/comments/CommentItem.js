import React from 'react';
import UserDisplay from '../userDisplay/UserDisplay.js';

export default props => {
    return (
        <div className="commentItem">
            <UserDisplay  display="small" data={{ 
                avatar: props.data.avatar, 
                displayName: props.data.displayName, 
                joined: props.data.joined 
            }} id={props.data.userExternalID}/>
            <div className="messageData">
                <div className="messageContent">{props.data.message}</div>
                <div className="messageMetaData">
                    <div className="messagePosted">{props.data.added}</div>
                    <div className="messageEdited">{props.data.edited||'NA'}</div>
                </div>
            </div>
        </div>
    );
}