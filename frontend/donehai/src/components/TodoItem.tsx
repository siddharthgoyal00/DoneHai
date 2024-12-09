
import { Check, Trash2, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="flex items-start justify-between p-4 bg-white dark:bg-gray-700 
      rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 
      hover:shadow-md transition-shadow gap-4">
      <div className="flex items-start gap-3 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-500 hover:border-green-500'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        <div className="min-w-0 flex-1">
          <span
            className={`block text-gray-800 dark:text-gray-200 break-words ${
              todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}
          >
            {todo.title}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mt-1">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{todo.dueDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-500 dark:text-gray-400 hover:text-red-500 
          dark:hover:text-red-400 transition-colors flex-shrink-0"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}