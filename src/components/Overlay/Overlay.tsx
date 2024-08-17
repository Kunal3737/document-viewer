import React, { memo } from "react";
import "./Overlay.css";

interface OverlayProps {
  selectedImage: string;
  onOverlayClick: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ selectedImage, onOverlayClick }) => (
  <div className="overlay" onClick={onOverlayClick}>
    <div className="thumbnail-container">
      <img src={selectedImage} alt="Selected" className="overlay-image" />
    </div>
  </div>
);

export default memo(Overlay);
