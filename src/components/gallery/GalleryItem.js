import React from 'react';

export default props =>{
    return(
        <div className="galleryItem">
            <img className="background" src={props.data.imagePath} />
        </div>
    );
}