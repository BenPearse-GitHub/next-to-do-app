import { mockToDoItems } from "@/mocks/data";
import { createTodo, deleteTodo, getTodos, updateTodo } from "./todos";
import { server } from "@/mocks/node";

server.listen();

describe("todos api", () => {
  describe("getTodos", () => {
    //get all todo requests
    it("should return all todo items", async () => {
      const todosResponse = await getTodos();

      expect(todosResponse).toEqual(mockToDoItems);
    });
  });

  describe("createTodo", () => {
    //create a new todo item
    it("should create a new todo item with the provided data", async () => {
      const newTodoName = "test new todo";
      const newToDoResponse = await createTodo(newTodoName);

      expect(newToDoResponse).toHaveProperty("id");
      expect(newToDoResponse).toHaveProperty("name", newTodoName);
      expect(newToDoResponse).toHaveProperty("complete", false);
    });
  });

  describe("updateTodo", () => {
    //update todo item
    it("should update a specified todo item with the provided data", async () => {
      const todoIdToUpdate = "fb165e0e-336c-4a4d-aea1-d062766a5418";
      const updatedTodoBody = {
        name: "updated todo item",
        complete: true,
      };

      const updateResponse = await updateTodo(todoIdToUpdate, updatedTodoBody);

      expect(updateResponse).toHaveProperty("id", todoIdToUpdate);
      expect(updateResponse).toHaveProperty("name", updatedTodoBody.name);
      expect(updateResponse).toHaveProperty(
        "complete",
        updatedTodoBody.complete
      );
    });

    it("should respond with an error message if the todo does not exist", async () => {
      const todoIdToUpdate = "blah blah";
      const updatedTodoBody = {
        name: "updated todo item",
        complete: true,
      };

      const updateResponse = await updateTodo(todoIdToUpdate, updatedTodoBody);

      expect(updateResponse).toHaveProperty("message", "Todo not found");
    });
  });

  describe("deleteTodo", () => {
    //delete todo item
    it("should delete the specified todo item", async () => {
      const todoIdToDelete = "fb165e0e-336c-4a4d-aea1-d062766a5418";

      const deleteResponse = await deleteTodo(todoIdToDelete);

      expect(deleteResponse).toHaveProperty("message", "Todo deleted");
    });

    it("should respond with an error message if the todo does not exist", async () => {
      const todoIdToDelete = "blah blah";

      const deleteResponse = await deleteTodo(todoIdToDelete);

      expect(deleteResponse).toHaveProperty("message", "Todo not found");
    });
  });
});
