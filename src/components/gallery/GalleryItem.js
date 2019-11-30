import React from 'react';

export default props =>{
    return(
        <div className="galleryItem">
            <img className="background" src={props.data.imagePath} />
            <div className="icons">
                <div className="iconContainer">
                    <i class="fas fa-heart iconBody"></i>
                    <div className="iconData">3</div>
                </div>
                <div className="iconContainer">
                    <i class="fas fa-comment iconBody"></i>
                    <div className="iconData">3</div>
                </div>
            </div>
        </div>
    );
}