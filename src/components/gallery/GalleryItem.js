import React from 'react';
import {Link} from 'react-router-dom';
import Like from '../icons/like.js';

class GalleryItem extends React.Component{
    constructor(props){
        super(props);
        this.exposeData = this.exposeData.bind( this );
        this.state = {
            exposed: false
        }
    }
    exposeData(){
        this.setState({
            exposed: !this.state.exposed
        })
    }
    render(){
        return(
            <div onClick={this.exposeData} className={`galleryItem ${this.state.exposed ? 'exposed' : ''}`}>
                <img className="background" alt={this.props.data.originalImage} src={this.props.data.imagePath} />
                <div className="ownerData shadowed">
                    <Link to={`users/${this.props.data.userExternalID}`}>{this.props.data.displayName}</Link>
                </div>
                <div className="icons">
                    <Like count={this.props.data.likes} postID={this.props.data.externalID} />
                    <Link to={`/comments/${this.props.data.externalID}`} className="iconContainer">
                        <i className="fas fa-comment iconBody shadowed">
                            <div className="iconData">{this.props.data.commentCount}</div>
                        </i>
                        
                    </Link>
                    <Link to={`/gallery/${this.props.data.externalID}`} className="iconContainer">
                        <i className="fas fa-eye iconBody shadowed"></i>
                    </Link>
                </div>
            </div>
        );
    }

}

export default GalleryItem;