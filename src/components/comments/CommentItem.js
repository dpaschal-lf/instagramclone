import React from 'react';
import UserDisplay from '../userDisplay/UserDisplay.js';

class CommentItem extends React.Component{
    constructor(props){
        super(props);
        this.updateField = this.updateField.bind( this );
        this.save = this.save.bind( this );
        this.cancel = this.cancel.bind( this );
        this.beginEdit = this.beginEdit.bind( this );
        this.state = {
            mode: 'display',
            fields: {
                message: props.data.message
            },
        }
    }
    beginEdit(){
        this.setState({
            mode: 'edit'
        });
    }
    updateField( e ){
        const element = e.target;
        const name = element.getAttribute('name');
        const value = element.value;
        const newFields = {...this.state.fields};
        newFields[name] = value;
        this.setState({
            fields: newFields
        });
    }
    save(){
        const data = {...this.state.fields};
        data.commentID = this.props.data.externalID;
        fetch('/api/commentedit.php',{
            method: 'put',
            body: JSON.stringify( data ),
            headers: {
                'auth-token': localStorage.authToken
            }                
        }).then ( ()=>{
            this.props.updateCallback();
            this.setState({
                mode: 'display'
            })
        })
    }
    cancel(){
        this.setState({
            fields: {
                message: this.props.data.message
            },
            mode: 'display'
        })
    }
    render(){
        if( this.state.mode === 'display'){
            return (
                <div className="commentItem">
                    <UserDisplay  display="small" data={{ 
                        avatar: this.props.data.avatar, 
                        displayName: this.props.data.displayName, 
                        joined: this.props.data.joined 
                    }} id={this.props.data.userExternalID}/>
                    <div className="messageData">
                        <div className="messageContent" >{this.state.fields.message}</div>
                        <button onClick={this.beginEdit}>edit</button>
                        <div className="messageMetaData">
                            <div className="messagePosted">{this.props.data.added}</div>
                            <div className="messageEdited">{this.props.data.edited||'NA'}</div>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="commentItem">
                    <UserDisplay  display="small" data={{ 
                        avatar: this.props.data.avatar, 
                        displayName: this.props.data.displayName, 
                        joined: this.props.data.joined 
                    }} id={this.props.data.userExternalID}/>
                    <div className="messageData">
                        <textarea className="messageContent" name="message" onChange={this.updateField} defaultValue={this.state.fields.message}>
                        </textarea>
                        <div className="actionContainer">
                            <button onClick={this.save}>Save</button>
                            <button onClick={this.cancel}>Cancel</button>
                        </div>
                        <div className="messageMetaData">
                            <div className="messagePosted">{this.props.data.added}</div>
                            <div className="messageEdited">{this.props.data.edited||'NA'}</div>
                        </div>
                    </div>
                </div>                
            );
        }
    }
}

export default CommentItem;

