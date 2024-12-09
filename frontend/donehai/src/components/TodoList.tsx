
import { TodoItem } from './TodoItem';
import { Todo, TodoPeriod } from '../types/todo';
import { Calendar, Clock, ListTodo } from 'lucide-react';
import { getDateInfo } from '../utils/dateUtils';

interface TodoListProps {
  todos: Todo[];
  period: TodoPeriod;
  selectedDate: Date;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, period, selectedDate, onToggle, onDelete }: TodoListProps) {
  const dateInfo = getDateInfo(selectedDate);
  
  const getIcon = () => {
    switch (period) {
      case 'daily':
        return <Clock className="w-5 h-5" />;
      case 'weekly':
        return <Calendar className="w-5 h-5" />;
      case 'monthly':
        return <ListTodo className="w-5 h-5" />;
    }
  };

  const getSubheading = () => {
    switch (period) {
      case 'daily':
        return dateInfo.day;
      case 'weekly':
        return dateInfo.week;
      case 'monthly':
        return dateInfo.month;
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2 text-gray-900 dark:text-white">
          {getIcon()}
          <h2 className="text-lg font-semibold capitalize">{period} Tasks</h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 ml-7">{getSubheading()}</p>
      </div>
      
      <div className="space-y-3">
        {todos.length === 0 ? (
          <div className="text-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <p className="text-gray-500 dark:text-gray-400">
              No {period} todos for this {period === 'daily' ? 'day' : period === 'weekly' ? 'week' : 'month'}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Add a new todo using the form above
            </p>
          </div>
        ) : (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}