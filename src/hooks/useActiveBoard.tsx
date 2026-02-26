import { useKanbanStore } from "@/stores/boards";

function useActiveBoard() {
  const boards = useKanbanStore((state) => state.boards);
  const activeBoardId = useKanbanStore((state) => state.activeBoardId);
  const activeBoard = boards.find((board) => board.id === activeBoardId);
  const setActiveBoard = useKanbanStore((state) => state.setActiveBoard);
  return { boards, activeBoard, activeBoardId, setActiveBoard };
}

export default useActiveBoard;
