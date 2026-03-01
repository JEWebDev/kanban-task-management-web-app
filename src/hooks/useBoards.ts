import { Board } from "@/types/data";
import { getAllBoards, getBoardById } from "@/utils/queries/boards";
import { useQuery } from "@tanstack/react-query";

export function useBoards(initialData?: Board[]) {
  return useQuery({
    queryKey: ["boards"],
    queryFn: () => getAllBoards(),
    initialData: initialData,
  });
}

export function useBoard(id: string) {
  return useQuery({
    queryKey: ["board", id],
    queryFn: () => getBoardById(id),
    enabled: !!id,
  });
}
