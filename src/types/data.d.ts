export interface SubtaskBase {
  title: string;
  isCompleted: boolean;
}

export interface TaskBase {
  title: string;
  description: string;
  status: string;
}

export interface Subtask extends SubtaskBase {
  id: string;
}

export interface Task extends TaskBase {
  id: string;
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  name: string;
  columns: Column[];
}
