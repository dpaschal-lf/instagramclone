import React from 'react';

class Like extends React.Component{
    constructor(props){
        super(props);
        this.updateLikes = this.updateLikes.bind( this );
        this.state = {
            count: props.count
        }
    }
    updateLikes(){
        fetch('/api/likes.php?postID='+ this.props.postID)
            .then( response => response.json() )
            .then( response => this.setState({ count : this.state.count + response.alterAmount}));
    }
    render(){
        return(
            <div className="iconContainer" onClick={this.updateLikes}>
                <i className="fas fa-heart iconBody shadowed"></i>
                <div className="iconData">{this.state.count}</div>
            </div>            
        );
    }
}

export default Like;