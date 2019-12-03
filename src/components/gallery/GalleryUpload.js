import React from 'react';

class GalleryUpload extends React.Component{
    constructor(props){
        super(props);
        this.handleFileSelect = this.handleFileSelect.bind( this );
        this.uploadFile = this.uploadFile.bind( this );
        this.state = {
            displayBackground: '/dropzone.png',
            additionalMessage: '',
            fileData: null
        }
    }
    handleFileSelect(e){
        const data = new FormData();
        const files = e.target.files;
        data.append( files[ 0 ].name, files[ 0 ]);

        const reader = new FileReader();
        
        const a = reader.result
        reader.onload = ()=>{
            this.setState({
                displayBackground: reader.result,
                additionalMessage: 'click or drag again to upload another image',
                fileData: data
            })
        }   
        const thing = reader.readAsDataURL( files[0] );  
        
    }
    uploadFile(){
        fetch( `${process.env.PUBLIC_URL}/uploadpost.php`,{
            'method': 'POST',
            'body': this.state.fileData
        })
            .then( response => {
                return response.json()
            })
            .then( (response)=>{
                console.log('file uploaded');
            })
    }
    render(){
        return(
            <div className="uploadContainer">
                <label for="fileInput" className="uploadDropZone" style={{backgroundImage:`url(${this.state.displayBackground})`}}>
                    <div className="additionalMessage">{this.state.additionalMessage}</div>
                </label>
                <input id="fileInput" type="file" onChange={this.handleFileSelect}/>
                { this.state.fileData !== null ? <button type="button" className="uploadConfirm" onClick={this.uploadFile} >upload</button> : null}
            </div>
        )
    }
}

export default GalleryUpload;