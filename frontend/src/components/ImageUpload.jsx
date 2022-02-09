
import React from 'react';
import { ImageUploadStyled } from './styles/ImageUpload.styled';

function ImageUpload({ imageUploadRef, onChange, image }) {
  return (
    <ImageUploadStyled>
      <input type="file" ref={imageUploadRef} className="hidden-upload-file" accept="image/png, image/jpeg" onChange={onChange} />
      <div id="profile" onClick={() => imageUploadRef.current.click()} style={{ backgroundImage: `url(${image.includes("data") ? image : `data:image/png;base64,${image}`})` }}>
        <div className="dashes"></div>
        <label className={image && "hasImage"}>Click to browse an avatar image</label>
      </div>
    </ImageUploadStyled>
  );
}

export default ImageUpload;
