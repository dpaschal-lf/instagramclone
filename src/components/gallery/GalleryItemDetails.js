import React from 'react';

class GalleryItemDetails extends React.Component{
    constructor(props){
        super(props);
        this.updateData = this.updateData.bind( this );
        this.state = {
            data: {}
        }
    }
    componentDidMount(){
        this.getGalleryData();
    }
    getDetails(){
        fetch('api/gallery.php?id='+this.props.match.params.id)
            .then( response => response.json() )
            .then( this.updateData );
    }
    updateData( response ){
        this.setState( {
            data: response
        })
    }
    render(){
        return(
            <div className="galleryDetails">
                <img className="background" alt={this.props.data.originalImage} src={this.props.data.imagePath} />
                <div className="icons">
                    <div className="iconContainer">
                        <i className="fas fa-heart iconBody"></i>
                        <div className="iconData">{this.props.data.likes}</div>
                    </div>
                    <div className="iconContainer">
                        <i className="fas fa-comment iconBody"></i>
                        <div className="iconData">{this.props.data.commentCount}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GalleryItemDetails