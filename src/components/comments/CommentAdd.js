import React from 'react';
import UserDisplay from '../userDisplay/UserDisplay.js';

class CommentAdd extends React.Component{
    constructor(props){
        super(props);
        this.updateField = this.updateField.bind( this );
        this.postComment = this.postComment.bind( this );
        this.state = {
            fields: {}
        }
    }
    updateField(e){
        const element = e.target;
        const value = element.value;
        const name = element.getAttribute('name');
        const fieldCopy = {...this.state.fields};
        fieldCopy[name] = value;
        this.setState( {
            fields: fieldCopy
        });
    }
    postComment(){
        const data = {...this.state.fields};
        data.postID = this.props.postID;

        fetch('/api/commentadd.php', {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                authToken: this.props.token
            }                
        }).then( ()=>
            this.props.updateCallback()
        )
    }
    render(){
        return (
            <div className="commentItem">
                <div className="messageData">
                    <textarea name="commentMessage" onChange={this.updateField}>

                    </textarea>
                    <button type="button" onClick={this.postComment}>Comment</button>
                </div>
            </div>
        );
    }
}

export default CommentAdd;