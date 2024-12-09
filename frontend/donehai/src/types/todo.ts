export type TodoPeriod = 'daily' | 'weekly' | 'monthly';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  period: TodoPeriod;
  dueDate: Date;
}

export type TodoCreate = Omit<Todo, 'id' | 'createdAt'>;