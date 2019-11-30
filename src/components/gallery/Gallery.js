import React from 'react';

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
        fetch('api/gallery.php')
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
            <div>gallery</div>
        )
    }
}

export default Gallery;