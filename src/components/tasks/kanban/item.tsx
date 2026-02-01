import { DragOverlay, useDraggable, UseDraggableArguments } from "@dnd-kit/core";
import React from "react";

type Props = {
  id: string;
  data?: UseDraggableArguments["data"];
};

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({ id, data });

  const isDragging = active?.id === id;

  return (
    <>
      {/* Normal card (always rendered) */}
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          opacity: isDragging ? 0.3 : 1,
          borderRadius: "8px",
          position: "relative",
          cursor: "grab",
        }}
      >
        {children}
      </div>

      {/* Drag overlay (only while dragging) */}
      {isDragging && (
        <DragOverlay zIndex={1000}>
          <div
            style={{
              borderRadius: "8px",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              cursor: "grabbing",
            }}
          >
            {children}
          </div>
        </DragOverlay>
      )}
    </>
  );
};
export default KanbanItem;
