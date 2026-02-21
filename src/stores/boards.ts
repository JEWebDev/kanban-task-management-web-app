import { create } from "zustand";
import data from "@/mocks/data.json";
import { nanoid } from "nanoid";
import { Board, BoardJSON } from "@/types/data";

interface KanbanState {
  boards: Board[];
  activeBoardId: string | null;
  setActiveBoard: (id: string) => void;
}
export const useKanbanStore = create<KanbanState>((set) => ({
  boards: (data.boards as BoardJSON[]).map((board) => ({
    id: nanoid(9),
    name: board.name,
    columns: board.columns.map((col) => ({
      id: nanoid(9),
      name: col.name,
      tasks: col.tasks.map((task) => ({
        id: nanoid(9),
        title: task.title,
        description: task.description,
        status: task.status,
        subtasks: task.subtasks.map((subtask) => ({
          id: nanoid(9),
          ...subtask,
        })),
      })),
    })),
  })),

  activeBoardId: null,

  setActiveBoard: (id: string) => set({ activeBoardId: id }),
}));
