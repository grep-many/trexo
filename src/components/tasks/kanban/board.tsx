import React from "react";
import { DndContext } from "@dnd-kit/core";

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      style={{
        width: "calc(100%+64px)",
        height: "calc(100vh-64px",
        display: "flex",
        flexDirection: "column",
        // margin: "-32px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "scroll",
          padding: "32px",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const KanbanBoard = ({ children }: React.PropsWithChildren) => {
  return <DndContext>{children}</DndContext>;
};
