import { IApiMessage, updateTodo } from "@/api/todos";
import { IupdateTodoItemParameters, todoId, ToDoItem } from "@/types/todoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ToDoItem | IApiMessage, // Return type
    unknown, // Error type
    { id: todoId; updatedTodo: IupdateTodoItemParameters } // Variables type
  >({
    mutationFn: ({ id, updatedTodo }) => updateTodo(id, updatedTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
