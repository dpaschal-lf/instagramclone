import React from 'react';
import {Link} from 'react-router-dom';

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
                    <div className="iconContainer">
                        <i className="fas fa-heart iconBody shadowed"></i>
                        <div className="iconData">{this.props.data.likes}</div>
                    </div>
                    <Link to={`/comments/${this.props.data.externalID}`} className="iconContainer">
                        <i className="fas fa-comment iconBody shadowed"></i>
                        <div className="iconData">{this.props.data.commentCount}</div>
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