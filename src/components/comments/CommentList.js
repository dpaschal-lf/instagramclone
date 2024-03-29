import React from 'react';
import CommentItem from './CommentItem.js';
import CommentAdd from './CommentAdd.js';

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
        fetch('/api/comments.php?postID='+this.props.postID,{
            headers:{
                'auth-token': localStorage.authToken
            }
        })
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
            showAdd: false
        });
        this.getCommentData(); 
        this.props.updateCallback();
    }
    showAddComment(){
        this.setState({
            showAdd: !this.state.showAdd
        })
    }
    render(){
        return(
            <div className="commentContainer">
                { this.state.data.map( data => <CommentItem data={data} key={data.externalID} updateCallback={this.handleListUpdated}/>)}
                { this.state.showAdd ? <CommentAdd updateCallback={this.handleListUpdated} postID={this.props.postID}/> : <button onClick={this.showAddComment}>+</button> }
            </div>
        );        
    }
}

export default CommentList;