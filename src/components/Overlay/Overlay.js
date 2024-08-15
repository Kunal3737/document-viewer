import React, { memo } from "react";
import "./Overlay.css";

const Overlay = ({ selectedImage, onOverlayClick }) => (
  <div className="overlay" onClick={onOverlayClick}>
    <div className="thumbnail-container">
      <img src={selectedImage} alt="Selected" className="overlay-image" />
    </div>
  </div>
);

export default memo(Overlay);
