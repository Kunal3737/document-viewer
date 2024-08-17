declare module 'react-beautiful-dnd' {
    import * as React from 'react';
  
    export interface DropResult {
      draggableId: string;
      type: string;
      source: DraggableLocation;
      reason: DropReason;
      destination?: DraggableLocation;
    }
  
    export interface DraggableLocation {
      droppableId: string;
      index: number;
    }
  
    export type DropReason = 'DROP' | 'CANCEL';
  
    export interface DraggableProvided {
      draggableProps: React.HTMLProps<HTMLDivElement>;
      dragHandleProps: React.HTMLProps<HTMLDivElement>;
      innerRef: React.Ref<any>;
    }
  
    export interface DroppableProvided {
      droppableProps: React.HTMLProps<HTMLDivElement>;
      innerRef: React.Ref<any>;
      placeholder: React.ReactElement<any>;
    }
  
    export class DragDropContext extends React.Component<{ onDragEnd: (result: DropResult) => void }> {}
  
    export class Droppable extends React.Component<{
      droppableId: string;
      children: (provided: DroppableProvided) => React.ReactElement<any>;
    }> {}
  
    export class Draggable extends React.Component<{
      draggableId: string;
      index: number;
      children: (provided: DraggableProvided) => React.ReactElement<any>;
    }> {}
  }
  