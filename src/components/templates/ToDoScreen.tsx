"use client";

import React, { SyntheticEvent, useEffect } from "react";
import ToDoForm from "../organisms/ToDoForm/ToDoForm";
import ToDoList from "../organisms/ToDoList/ToDoList";
import { ToDoItem } from "@/types/todoList";
import { useGetAllTodos } from "@/hooks/getAllTodos";
import { useCreateTodo } from "@/hooks/createTodo";
import { useUpdateTodo } from "@/hooks/updateTodo";

const ToDoScreen = () => {
  const [toDoItems, setToDoItems] = React.useState<ToDoItem[]>([]);

  const { data } = useGetAllTodos();
  const { mutate: createTodoMutation } = useCreateTodo();
  const { mutate: updateTodoMutation } = useUpdateTodo();

  const handleAddToDoItem = (e: SyntheticEvent) => {
    e.preventDefault();

    // Type assertion of html form submit event target
    const target = e.target as typeof e.target & {
      toDoInput: { value: string };
    };

    const newToDoName = target.toDoInput.value;

    if (newToDoName.length !== 0) {
      createTodoMutation(newToDoName);

      (document.getElementById("to-do-input") as HTMLInputElement).value = "";
    }
  };

  const handleToDoCompletionToggle = (checked: boolean, id: string) => {
    const todoToUpdate = toDoItems.find((item) => item.id === id);

    if (todoToUpdate) {
      todoToUpdate.complete = checked;
      updateTodoMutation({ id, updatedTodo: todoToUpdate });
    }
  };

  const handleToDoDelete = (id: string) => {
    setToDoItems((prevToDoItems) =>
      prevToDoItems.filter((item) => item.id !== id)
    );
  };

  //Load todo items
  useEffect(() => {
    if (data) {
      setToDoItems(data);
    }
  }, [data]);

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
