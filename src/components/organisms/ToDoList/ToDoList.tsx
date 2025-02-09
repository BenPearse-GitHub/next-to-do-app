import ToDoItem from "@/components/molecules/ToDoItem/ToDoItem";
import { IToDoItem } from "@/types/todoList";
import React from "react";

interface ToDoListProps {
  toDoItems: IToDoItem[];
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
