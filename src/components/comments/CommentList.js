import React from 'react';
import CommentItem from './CommentItem.js';
import CommentAdd from './CommentAdd.js';
import { thisExpression } from '@babel/types';

class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.receiveData = this.receiveData.bind( this );
        this.showAddComment = this.showAddComment.bind( this );
        this.handleListUpdated = this.handleListUpdated.bind( this );
        this.state = {
            data: [],
            showAdd: false
        }
    }
    componentDidMount(){
        this.getCommentData();
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
    handleListUpdated(){
        this.setState({
            showAdd: !this.state.showAdd
        });
        this.getCommentData(); 
    }
    showAddComment(){
        this.setState({
            showAdd: !this.state.showAdd
        })
    }
    render(){
        return(
            <div className="commentContainer">
                { this.state.data.map( data => <CommentItem data={data} key={data.externalID} />)}
                { this.state.showAdd ? <CommentAdd updateCallback={this.handleListUpdated} postID={this.props.postID}/> : <button onClick={this.showAddComment}>+</button> }
            </div>
        );        
    }
}

export default CommentList;