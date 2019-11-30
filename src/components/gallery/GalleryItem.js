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
        console.log(this.state.exposed)
        this.setState({
            exposed: !this.state.exposed
        })
    }
    render(){
        return(
            <div onClick={this.exposeData} className={`galleryItem ${this.state.exposed ? 'exposed' : ''}`}>
                <img className="background" src={this.props.data.imagePath} />
                <div className="ownerData">
        <Link to={`users/${this.props.data.userExternalID}`}>{this.props.data.displayName}</Link>
                </div>
                <div className="icons">
                    <div className="iconContainer">
                        <i className="fas fa-heart iconBody"></i>
                        <div className="iconData">3</div>
                    </div>
                    <div className="iconContainer">
                        <i className="fas fa-comment iconBody"></i>
                        <div className="iconData">3</div>
                    </div>
                </div>
            </div>
        );
    }

}

export default GalleryItem;