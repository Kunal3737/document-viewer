import React, { memo } from "react";
import "./Spinner.css";

const Spinner: React.FC = () => <div className="spinner">Saving...</div>;

export default memo(Spinner);
