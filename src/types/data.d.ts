export interface SubtaskJSON {
  title: string;
  isCompleted: boolean;
}

export interface TaskJSON {
  title: string;
  description: string;
  status: Status;
  subtasks: SubtaskJSON[];
}

export interface ColumnJSON {
  name: string;
  tasks: TaskJSON[];
}

export interface BoardJSON {
  name: string;
  columns: ColumnJSON[];
}

// Normalization types

export interface Subtask extends SubtaskJSON {
  id: string;
}

export interface Task extends Omit<TaskJSON, "subtasks"> {
  id: string;
  subtasks: Subtask[];
}

export interface Column extends Omit<ColumnJSON, "tasks"> {
  id: string;
  tasks: Task[];
}

export interface Board extends Omit<BoardJSON, "columns"> {
  id: string;
  columns: Column[];
}
