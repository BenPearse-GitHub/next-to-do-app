import { IToDoItem } from "@/types/todoList";
import React from "react";
import { Checkbox } from "../ui/checkbox";

interface ToDoItemProps extends IToDoItem {
  handleCompletionChange: (checked: boolean, name: string) => void;
}

const ToDoItem = ({
  id,
  name,
  complete,
  handleCompletionChange,
}: ToDoItemProps) => {
  return (
    <div className="flex flex-row gap-2 align-middle">
      <Checkbox
        id={id}
        checked={complete}
        onCheckedChange={() => handleCompletionChange(!complete, id)}
      />
      <label className={complete ? "line-through" : ""} htmlFor={id}>
        {name}
      </label>
    </div>
  );
};

export default ToDoItem;
