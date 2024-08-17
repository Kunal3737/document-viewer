import React, { memo } from "react";
import "./SaveInfo.css";

interface SaveInfoProps {
  timeSinceLastSave: string;
}

const SaveInfo: React.FC<SaveInfoProps> = ({ timeSinceLastSave }) => (
  <div className="save-info">Last save: {timeSinceLastSave}</div>
);

export default memo(SaveInfo);
