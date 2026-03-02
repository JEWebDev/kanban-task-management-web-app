import { getAllBoards, getBoardById } from "@/utils/queries/boards";
import { useQuery } from "@tanstack/react-query";

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
