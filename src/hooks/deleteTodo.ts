import { deleteTodo, IApiMessage } from "@/api/todos";
import { todoId } from "@/types/todoList";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IApiMessage, // Return type
    unknown, // Error type
    todoId // Variables type
  >({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
