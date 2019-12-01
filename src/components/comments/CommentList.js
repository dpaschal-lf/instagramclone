import React from 'react';
import CommentItem from './CommentItem.js';

class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.receiveData = this.receiveData.bind( this );
        this.state = {
            data: []
        }
    }
    getCommentData(){
        fetch('/api/comments.php?postID='+this.props.postID)
            .then( response => response.json() )
            .then( this.receiveData)
    }
    receiveData( response ){
        this.setState({
            data: response
        })
    }
    render(){
        return(
            <div>comment list</div>
        );
    }
}

export default CommentList;