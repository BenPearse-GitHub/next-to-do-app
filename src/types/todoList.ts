export type ToDoItem = IupdateTodoItemParameters & { id: todoId };

export interface IupdateTodoItemParameters {
  name: string;
  complete: boolean;
}

export type todoId = string;
