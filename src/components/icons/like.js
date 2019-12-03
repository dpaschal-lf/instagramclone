import React from 'react';

class Like extends React.Component{
    constructor(props){
        super(props);
        this.updateLikes = this.updateLikes.bind( this );
        this.state = {
            count: parseInt(props.count),
            likedClass: this.props.added!==null ? 'liked' : '',
            likedDate: props.added
        }
    }
    updateLikes(){
        fetch('/api/likes.php?postID='+ this.props.postID)
            .then( response => response.json() )
            .then( response => {
                this.setState({ 
                    count : this.state.count + response.alterAmount,
                    likedClass : response.alterAmount > 0 ? 'liked' : '',
                    likedDate: response.likeTime
                } );
            });
    }
    render(){
        return(
            <div className="iconContainer" onClick={this.updateLikes}>
                <i className={`fas fa-heart iconBody shadowed ${ this.state.likedClass }`} title={this.state.added}>
                    <div className="iconData">{this.state.count}</div>
                </i>
                
            </div>            
        );
    }
}

export default Like;