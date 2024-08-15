import React, { memo } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./DocumentList.css";

const DocumentCard = memo(({ doc, provided, onCardClick }) => (
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
));

const DocumentList = ({ documents, onDragEnd, onCardClick }) => (
  <DragDropContext onDragEnd={onDragEnd}>
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
  </DragDropContext>
);

export default memo(DocumentList);
