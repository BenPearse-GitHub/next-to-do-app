import ToDoItem from "@/components/molecules/ToDoItem/ToDoItem";
import { ToDoItem as ToDoItemType } from "@/types/todoList";
import React from "react";

export interface ToDoListProps {
  toDoItems: ToDoItemType[];
  onCompleteChange: (checked: boolean, id: string) => void;
  onDelete: (id: string) => void;
}

const ToDoList = ({ toDoItems, onCompleteChange, onDelete }: ToDoListProps) => {
  return toDoItems.map((item) => (
    <div key={item.id}>
      <ToDoItem
        id={item.id}
        name={item.name}
        complete={item.complete}
        handleCompletionChange={onCompleteChange}
        handleDelete={onDelete}
      />
    </div>
  ));
};

export default ToDoList;
