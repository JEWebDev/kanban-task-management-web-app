import {
  createBoard,
  getAllBoards,
  getBoardById,
} from "@/utils/queries/boards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useBoards() {
  return useQuery({
    queryKey: ["boards"],
    queryFn: () => getAllBoards(),
  });
}

export function useBoard(id: string) {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardById(id),
    enabled: !!id,
  });
}

export function useCreateBoard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      console.log("Insert Successfull");
    },

    onError: (error) => {
      console.error("Error creating board: ", error.message);
    },
  });
}
