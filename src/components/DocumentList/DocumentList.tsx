import React, { memo } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableProvided,
} from "react-beautiful-dnd";
import "./DocumentList.css";
import { Document } from "../../utils";

interface DocumentCardProps {
  doc: Document;
  provided: DraggableProvided;
  onCardClick: (thumbnail: string) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = memo(
  ({ doc, provided, onCardClick }) => (
    <div
      className="card"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => onCardClick(doc.thumbnail)}
    >
      <div className="thumbnail-container">
        <img src={doc.thumbnail} alt={doc.type} className="thumbnail" />
      </div>
      <h2>{doc.title}</h2>
      <p>Type: {doc.type}</p>
    </div>
  )
);

interface DocumentListProps {
  documents: Document[];
  onDragEnd: (result: DropResult) => void;
  onCardClick: (thumbnail: string) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onDragEnd,
  onCardClick,
}) => {
  return React.createElement(
    DragDropContext,
    { onDragEnd },
    <Droppable droppableId="droppable">
      {(provided) => (
        <div
          className="card-container"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {documents.map((doc, index) => (
            <Draggable
              key={doc.position}
              draggableId={doc.position.toString()}
              index={index}
            >
              {(provided) => (
                <DocumentCard
                  doc={doc}
                  provided={provided}
                  onCardClick={onCardClick}
                />
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default memo(DocumentList);
