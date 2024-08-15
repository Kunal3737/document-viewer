import React, { memo } from "react";
import "./SaveInfo.css";

const SaveInfo = ({ timeSinceLastSave }) => (
  <div className="save-info">Last save: {timeSinceLastSave}</div>
);

export default memo(SaveInfo);
