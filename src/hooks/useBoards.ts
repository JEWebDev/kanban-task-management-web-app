import {
  createBoard,
  getAllBoards,
  getBoardById,
} from "@/utils/queries/boards";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  return useMutation({
    mutationFn: createBoard,
    onSuccess: (data) => {
      const newBoardId = data?.board_id;
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      if (newBoardId) {
        router.push(`/${newBoardId}`);
      }
    },

    onError: (error) => {
      console.error("Error creating board: ", error.message);
    },
  });
}
