"use client";

import React, { SyntheticEvent } from "react";
import { IToDoItem } from "@/types/todoList";
import ToDoForm from "../organisms/ToDoForm";

const ToDoList = () => {
  const [toDoItems, setToDoItems] = React.useState<IToDoItem[]>([]);

  const handleAddToDoItem = (e: SyntheticEvent) => {
    e.preventDefault();

    // Type assertion of html form submit event target
    const target = e.target as typeof e.target & {
      toDoInput: { value: string };
    };

    const newToDoName = target.toDoInput.value;

    if (newToDoName.length !== 0) {
      // Define new to do item
      const newItem: IToDoItem = {
        name: newToDoName,
        complete: false,
      };

      // Add new to do item to existing list of to do items
      setToDoItems((prevToDoItems) => [...prevToDoItems, newItem]);

      (document.getElementById("to-do-input") as HTMLInputElement).value = "";
    }
  };

  return (
    <div className="container mx-auto h-screen p-4 border">
      <h1>ToDoList</h1>
      <ToDoForm submitEventHandler={handleAddToDoItem} />
      {toDoItems.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
};

export default ToDoList;
