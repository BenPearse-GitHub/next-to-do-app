import React from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";

export interface ToDoFormProps {
  submitEventHandler: (event: React.FormEvent<HTMLFormElement>) => void;
}

const ToDoForm = ({ submitEventHandler }: ToDoFormProps) => {
  return (
    <form
      onSubmit={(event) => submitEventHandler(event)}
      className="flex flex-row gap-2"
    >
      <Input
        id="to-do-input"
        name="toDoInput"
        type="text"
        placeholder="Enter a new to do item"
        role="textbox"
      />
      <Button type="submit">Add to do</Button>
    </form>
  );
};

export default ToDoForm;
