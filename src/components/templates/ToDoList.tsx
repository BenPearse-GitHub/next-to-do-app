"use client";

import React, { SyntheticEvent } from "react";
import { Input } from "../ui/input";
import { IToDoItem } from "@/types/todoList";
import { Button } from "../ui/button";

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
    <div className="container-sm mx-auto">
      <h1>ToDoList</h1>
      <form onSubmit={(event) => handleAddToDoItem(event)}>
        <Input
          id="to-do-input"
          name="toDoInput"
          type="text"
          placeholder="Enter a new to do item"
        />
        <Button type="submit">Add to do</Button>
      </form>
      {toDoItems.map((item, index) => (
        <div key={index}>{item.name}</div>
      ))}
    </div>
  );
};

export default ToDoList;
