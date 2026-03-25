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
  task_id: string;
  subtasks: Subtask[];
}

export interface Column {
  column_id: string;
  name: string;
  tasks: Task[];
}

export interface Board {
  board_id: string;
  name: string;
  columns?: Column[];
}

export interface FormError {
  [key: string]: string;
}
