import React from 'react';

class GalleryUpload extends React.Component{
    constructor(props){
        super(props);
        this.handleFileSelect = this.handleFileSelect.bind( this );
        this.uploadFile = this.uploadFile.bind( this );
        this.handleItemDraggedOver = this.handleItemDraggedOver.bind( this );
        this.handleItemDraggedLeave = this.handleItemDraggedLeave.bind( this );
        this.handleItemDropped = this.handleItemDropped.bind( this );
        this.state = {
            displayBackground: '/dropzone.png',
            additionalMessage: '',
            fileData: null,
            hoverClass: null
        }
    }
    handleFileSelect(e){
        const files = e.target.files;
        this.prepFileUpload( files[0] );
        
    }
    prepFileUpload( file ){
        const data = new FormData();
        data.append( 'uploadFile', file);

        const reader = new FileReader();
        
        const a = reader.result
        reader.onload = ()=>{
            this.setState({
                displayBackground: reader.result,
                additionalMessage: 'click or drag again to upload another image',
                fileData: data
            })
        }   
        const thing = reader.readAsDataURL( file );          
    }
    uploadFile(){

        fetch( `/api/uploadpost.php`,{
            'method': 'POST',
            'body': this.state.fileData,
            headers: {
                authToken: localStorage.authToken
            }                
        })
            .then( response => {
                return response.json()
            })
            .then( (response)=>{
                this.props.history.push('/');
            })
    }
    handleItemDraggedLeave(){
        this.setState({
            hoverClass: ''
        });
    }
    handleItemDraggedOver(e){
        e.preventDefault();
        this.setState({
            hoverClass: 'itemHovered'
        });
    }
    handleItemDropped(e){
        e.preventDefault();
        e.stopPropagation();
        const dataTransfer = e.dataTransfer;
        this.prepFileUpload( dataTransfer.files[0]);
    }
    render(){
        return(
            <div className="uploadContainer">
                <label onDrop={this.handleItemDropped} onDragLeave={this.handleItemDraggedLeave} onDragOver={ this.handleItemDraggedOver } onDragEnter={ this.handleItemDraggedOver } htmlFor="fileInput" className={`uploadDropZone ${this.state.hoverClass}`} style={{backgroundImage:`url(${this.state.displayBackground})`}}>
                    <div className="additionalMessage">{this.state.additionalMessage}</div>
                </label>
                <input id="fileInput" type="file" onChange={this.handleFileSelect}/>
                { this.state.fileData !== null ? <button type="button" className="uploadConfirm" onClick={this.uploadFile} >upload</button> : null}
            </div>
        )
    }
}

export default GalleryUpload;