import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import SaveInfo from "./components/SaveInfo/SaveInfo";
import DocumentList from "./components/DocumentList/DocumentList";
import Overlay from "./components/Overlay/Overlay";

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaveTime, setLastSaveTime] = useState(Date.now());
  const [hasChanges, setHasChanges] = useState(false);
  const [timeSinceLastSaveStr, setTimeSinceLastSaveStr] = useState("");
  const saveIntervalRef = useRef(null);
  const timeIntervalRef = useRef(null);

  useEffect(() => {
    const loadDocuments = async () => {
      const savedDocuments = localStorage.getItem("documents");
      if (savedDocuments) {
        setDocuments(JSON.parse(savedDocuments));
      } else {
        try {
          const response = await axios.get("/api/documents");
          const data = response.data;
          setDocuments(data);
          localStorage.setItem("documents", JSON.stringify(data));
        } catch (error) {
          console.error("Failed to load documents", error);
        }
      }
    };

    loadDocuments();
  }, []);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  useEffect(() => {
    const saveData = async () => {
      setIsSaving(true);
      try {
        await axios.post("/api/documents", { documents });
        setLastSaveTime(Date.now());
        setHasChanges(false);
      } catch (error) {
        console.error("Failed to save data", error);
      } finally {
        setIsSaving(false);
      }
    };

    saveIntervalRef.current = setInterval(() => {
      if (hasChanges) saveData();
    }, 5000);
    return () => clearInterval(saveIntervalRef.current);
  }, [hasChanges, documents]);

  useEffect(() => {
    const updateTimeSinceLastSave = () => {
      const seconds = Math.floor((Date.now() - lastSaveTime) / 1000);
      setTimeSinceLastSaveStr(`${seconds} seconds ago`);
    };

    timeIntervalRef.current = setInterval(updateTimeSinceLastSave, 1000);
    return () => clearInterval(timeIntervalRef.current);
  }, [lastSaveTime]);

  const handleDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const items = Array.from(documents);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);

      setDocuments(items);
      setHasChanges(true);
    },
    [documents]
  );

  const handleCardClick = useCallback(
    (thumbnail) => setSelectedImage(thumbnail),
    []
  );

  const handleOverlayClick = useCallback(() => setSelectedImage(null), []);

  return (
    <div className="App">
      <h1>Document Viewer</h1>
      {isSaving && <Spinner />}
      <SaveInfo timeSinceLastSave={timeSinceLastSaveStr} />
      <DocumentList
        documents={documents}
        onDragEnd={handleDragEnd}
        onCardClick={handleCardClick}
      />
      {selectedImage && (
        <Overlay
          selectedImage={selectedImage}
          onOverlayClick={handleOverlayClick}
        />
      )}
    </div>
  );
}

export default App;
