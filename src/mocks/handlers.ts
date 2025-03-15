import {
  DefaultRequestMultipartBody,
  http,
  HttpResponse,
  PathParams,
} from "msw";
import { v4 as uuidv4 } from "uuid";
import { mockToDoItems } from "./data";
import { ToDoItem } from "@/types/todoList";

interface IaddTodoRequestBody {
  name: string;
}

interface IaddTodoResponseBody {
  id: string;
  name: string;
  complete: boolean;
}

interface IupdateTodoParams {
  id: string;
}

interface IupdateTodoRequestBody {
  name?: string;
  complete?: boolean;
}

interface IupdateTodoResponseSuccessBody {
  id: string;
  name: string;
  complete: boolean;
}

interface IupdateTodoResponseNotFoundBody {
  message: string;
}

interface IdeleteTodoParams {
  id: string;
}

interface IdeleteTodoResponseBody {
  message: string;
}

export const handlers = [
  http.get("http://localhost:5001/todos", () => {
    return HttpResponse.json(mockToDoItems);
  }),
  http.post<
    PathParams,
    IaddTodoRequestBody,
    IaddTodoResponseBody,
    "http://localhost:5001/todos"
  >("http://localhost:5001/todos", async ({ request }) => {
    const requestJson = await request.json();
    const newTodoName = requestJson.name;

    const mockNewTodo: ToDoItem = {
      id: uuidv4(),
      name: newTodoName,
      complete: false,
    };
    return HttpResponse.json(mockNewTodo);
  }),
  http.put<
    IupdateTodoParams,
    IupdateTodoRequestBody,
    IupdateTodoResponseSuccessBody | IupdateTodoResponseNotFoundBody,
    "http://localhost:5001/todos/:id"
  >("http://localhost:5001/todos/:id", async ({ params, request }) => {
    const { id } = params;
    const requestJson = await request.json();

    //search todo items
    const todoToUpdate = mockToDoItems.find((todo) => todo.id === id);

    //if it exists, update todo item
    if (todoToUpdate) {
      const mockUpdatedTodo = {
        id: todoToUpdate.id,
        name:
          requestJson.name !== undefined ? requestJson.name : todoToUpdate.name,
        complete:
          requestJson.complete !== undefined
            ? requestJson.complete
            : todoToUpdate.complete,
      };

      return HttpResponse.json(mockUpdatedTodo);
    } else {
      return HttpResponse.json({ message: "Todo not found" });
    }
  }),
  http.delete<
    IdeleteTodoParams,
    DefaultRequestMultipartBody,
    IdeleteTodoResponseBody,
    "http://localhost:5001/todos/:id"
  >("http://localhost:5001/todos/:id", async ({ params }) => {
    const { id } = params;
    const todoToDelete = mockToDoItems.find((todo) => todo.id === id);

    if (todoToDelete) {
      return HttpResponse.json({ message: "Todo deleted" });
    } else {
      return HttpResponse.json({ message: "Todo not found" });
    }
  }),
];
