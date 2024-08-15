import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

async function enableMocking() {
  try {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  } catch (error) {
    console.error("Failed to start mocking:", error);
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
});
