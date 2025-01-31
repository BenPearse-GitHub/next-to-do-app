"use client";

import React, { SyntheticEvent } from "react";
import { IToDoItem } from "@/types/todoList";
import ToDoForm from "../organisms/ToDoForm";
import ToDoItem from "../molecules/ToDoItem";

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
        id: crypto.randomUUID(),
      };

      // Add new to do item to existing list of to do items
      setToDoItems((prevToDoItems) => [...prevToDoItems, newItem]);

      (document.getElementById("to-do-input") as HTMLInputElement).value = "";
      console.log("Added item: ", newItem);
    }
  };

  const handleToDoCompletionToggle = (checked: boolean, id: string) => {
    const tempToDoItems = toDoItems;
    const itemToUpdate = tempToDoItems.findIndex((item) => item.id === id);
    tempToDoItems[itemToUpdate].complete = checked;
    setToDoItems(tempToDoItems);
    console.log("Updated item: ", itemToUpdate);
  };

  return (
    <div className="container mx-auto h-screen p-4 border max-w-4xl flex flex-col gap-2">
      <h1>ToDoList</h1>
      <ToDoForm submitEventHandler={handleAddToDoItem} />
      {toDoItems.map((item) => (
        <div key={item.id}>
          <ToDoItem
            id={item.id}
            name={item.name}
            complete={item.complete}
            handleCompletionChange={handleToDoCompletionToggle}
          />
        </div>
      ))}
    </div>
  );
};

export default ToDoList;
