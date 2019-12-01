import React from 'react';
import CommentList from '../comments/CommentList.js';
import UserDisplay from '../userDisplay/UserDisplay.js';

class GalleryItemDetails extends React.Component{
    constructor(props){
        super(props);
        this.updateData = this.updateData.bind( this );
        this.state = {
            data: null
        }
    }
    componentDidMount(){
        this.getDetails();
    }
    getDetails(){
        fetch('/api/gallery.php?id='+this.props.match.params.id)
            .then( response => response.json() )
            .then( this.updateData )
            .catch( (...args) => {
                console.log("huh"+args);
            })
    }
    updateData( response ){
        this.setState( {
            data: response
        })
    }
    render(){
        if(this.state.data === null){
            return <div>Loading data...</div>
        }
        return(
            <div className="galleryDetails">
                <UserDisplay id={this.state.data.userExternalID} />
                <div className="imageContainer" style={{backgroundImage:`url(${'/'+this.state.data.imagePath})`}}>
                    <div className="icons">
                        <div className="iconContainer">
                            <i className="fas fa-heart iconBody">
                                <div className="iconData">{this.state.data.likes}</div>
                            </i> 
                        </div>
                        <div className="iconContainer">
                            <i className="fas fa-comment iconBody">
                                <div className="iconData">{this.state.data.commentCount}</div>
                            </i> 
                        </div>
                    </div>
                </div>
                <div className="postCaption">{this.state.data.caption}</div>
                <CommentList postID={this.state.data.externalID} />
            </div>
        );
    }
}

export default GalleryItemDetails