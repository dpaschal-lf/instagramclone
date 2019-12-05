import React from 'react';
import GalleryItem from './GalleryItem.js';

class Gallery extends React.Component{
    constructor(props){
        super(props);
        this.updateData = this.updateData.bind( this );
        this.state = {
            data: []
        }
    }
    componentDidMount(){
        this.getGalleryData();
    }
    getGalleryData(){
        fetch('api/gallery.php',{
            headers: {
                'auth-token': localStorage.authToken
            }
        })
            .then( response => response.json() )
            .then( this.updateData );
    }
    updateData( response ){
        this.setState({
            data: response
        })
    }
    render(){
        return(
            <div className="galleryContainer">
                { this.state.data.length ? this.state.data.map( data => <GalleryItem key={data.externalID} data={data}/>) : 'no data available'}
            </div>
        )
    }
}

export default Gallery;