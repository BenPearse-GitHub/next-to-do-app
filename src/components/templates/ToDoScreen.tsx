"use client";

import React, { SyntheticEvent } from "react";
import { IToDoItem } from "@/types/todoList";
import ToDoForm from "../organisms/ToDoForm/ToDoForm";
import ToDoList from "../organisms/ToDoList/ToDoList";

const ToDoScreen = () => {
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
        id: crypto.randomUUID(),
      };

      // Add new to do item to existing list of to do items
      setToDoItems((prevToDoItems) => [...prevToDoItems, newItem]);

      (document.getElementById("to-do-input") as HTMLInputElement).value = "";
    }
  };

  const handleToDoCompletionToggle = (checked: boolean, id: string) => {
    const indexToUpdate = toDoItems.findIndex((item) => item.id === id);

    if (indexToUpdate !== -1) {
      // Clone the list with spreader operator otherwise React won't see the state change
      const tempToDoItems = [...toDoItems];
      tempToDoItems[indexToUpdate].complete = checked;

      setToDoItems(tempToDoItems);
    }
  };

  const handleToDoDelete = (id: string) => {
    setToDoItems((prevToDoItems) =>
      prevToDoItems.filter((item) => item.id !== id)
    );
  };

  return (
    <div className="container mx-auto h-screen p-4 border max-w-4xl flex flex-col gap-2">
      <h1>ToDoList</h1>
      <ToDoForm submitEventHandler={handleAddToDoItem} />
      <ToDoList
        toDoItems={toDoItems}
        onCompleteChange={handleToDoCompletionToggle}
        onDelete={handleToDoDelete}
      />
    </div>
  );
};

export default ToDoScreen;
