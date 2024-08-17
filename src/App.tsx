import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import "./App.css";
import Spinner from "./components/Spinner/Spinner";
import SaveInfo from "./components/SaveInfo/SaveInfo";
import DocumentList from "./components/DocumentList/DocumentList";
import Overlay from "./components/Overlay/Overlay";

interface Document {
  type: string;
  title: string;
  position: number;
  thumbnail: string;
}

function App() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaveTime, setLastSaveTime] = useState<number>(Date.now());
  const [hasChanges, setHasChanges] = useState<boolean>(false);
  const [timeSinceLastSaveStr, setTimeSinceLastSaveStr] = useState<string>("");
  const saveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadDocuments = async () => {
      const savedDocuments = localStorage.getItem("documents");
      if (savedDocuments) {
        setDocuments(JSON.parse(savedDocuments));
      } else {
        try {
          const response = await axios.get<Document[]>("/api/documents");
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
    const handleEsc = (event: KeyboardEvent) => {
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
    return () => {
      if (saveIntervalRef.current) clearInterval(saveIntervalRef.current);
    };
  }, [hasChanges, documents]);

  useEffect(() => {
    const updateTimeSinceLastSave = () => {
      const seconds = Math.floor((Date.now() - lastSaveTime) / 1000);
      setTimeSinceLastSaveStr(`${seconds} seconds ago`);
    };

    timeIntervalRef.current = setInterval(updateTimeSinceLastSave, 1000);
    return () => {
      if (timeIntervalRef.current) clearInterval(timeIntervalRef.current);
    };
  }, [lastSaveTime]);

  const handleDragEnd = useCallback(
    (result: any) => {
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
    (thumbnail: string) => setSelectedImage(thumbnail),
    []
  );

  const handleOverlayClick = useCallback(() => setSelectedImage(null), []);

  return (
    <div className="App">
      <h1>Document Viewer</h1>
      {isSaving ? <Spinner /> : <><SaveInfo timeSinceLastSave={timeSinceLastSaveStr} />
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
      )}</>}
      
    </div>
  );
}

export default App;
