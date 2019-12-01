import React from 'react';

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
        debugger;
        return(
            <div className="galleryDetails">
                <img className="background" alt={this.state.data.imagePath} src={this.state.data.imagePath} />
                <div className="icons">
                    <div className="iconContainer">
                        <i className="fas fa-heart iconBody"></i>
                        <div className="iconData">{this.state.data.likes}</div>
                    </div>
                    <div className="iconContainer">
                        <i className="fas fa-comment iconBody"></i>
                        <div className="iconData">{this.state.data.commentCount}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GalleryItemDetails