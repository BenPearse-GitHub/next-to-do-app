import { ToDoItem as ToDoItemType } from "@/types/todoList";
import React from "react";
import { Checkbox } from "../../ui/checkbox";
import { Button } from "../../ui/button";
import { MdOutlineDelete } from "react-icons/md";

export interface ToDoItemProps extends ToDoItemType {
  handleCompletionChange: (checked: boolean, id: string) => void;
  handleDelete: (id: string) => void;
}

const ToDoItem = ({
  id,
  name,
  complete = false,
  handleCompletionChange,
  handleDelete,
}: ToDoItemProps) => {
  return (
    <div
      id={id}
      className="flex flex-row gap-2 items-center justify-between shadow-md rounded-md px-3 py-1 hover:bg-gray-50"
    >
      <div className="flex gap-2 items-center">
        <Checkbox
          checked={complete}
          onCheckedChange={() => handleCompletionChange(!complete, id)}
        />
        <label className={complete ? "line-through" : ""} htmlFor={id}>
          {name}
        </label>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="rounded-full justify-self-end"
        onClick={() => handleDelete(id)}
      >
        <MdOutlineDelete />
      </Button>
    </div>
  );
};

export default ToDoItem;
