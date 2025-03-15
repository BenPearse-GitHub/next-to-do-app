import { todoId, ToDoItem, IupdateTodoItemParameters } from "@/types/todoList";

interface IApiMessage {
  message: string;
}

//Get all todos
export const getTodos = async (): Promise<ToDoItem[]> => {
  const response = await fetch("http://localhost:5001/todos");
  const data = response.json();
  return data;
};

//Create new todo
export const createTodo = async (newTodoName: string): Promise<ToDoItem> => {
  const response = await fetch("http://localhost:5001/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newTodoName }),
  });
  const data = response.json();
  return data;
};

//Update todo
export const updateTodo = async (
  id: todoId,
  updatedTodo: IupdateTodoItemParameters
): Promise<ToDoItem | IApiMessage> => {
  const response = await fetch(`http://localhost:5001/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...updatedTodo }),
  });
  const data = response.json();
  return data;
};

//Delete todo
export const deleteTodo = async (id: todoId): Promise<IApiMessage> => {
  const response = await fetch(`http://localhost:5001/todos/${id}`, {
    method: "DELETE",
  });
  const data = response.json();
  return data;
};
