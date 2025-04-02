import { getTodos } from "@/api/todos";
import { useQuery } from "@tanstack/react-query";

// Queries
export const useGetAllTodos = () =>
  useQuery({ queryKey: ["todos"], queryFn: getTodos });
