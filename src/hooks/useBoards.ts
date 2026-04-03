import { Board } from "@/types/data";
import {
  createBoard,
  deleteBoard,
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
    onSuccess: async (newBoard: Board) => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] });
      if (newBoard.board_id) {
        router.push(`/${newBoard.board_id}`);
      }
    },
  });
}

export function useDeleteBoard() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: deleteBoard,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["boards"] });
      router.push(`/`);
    },
  });
}
