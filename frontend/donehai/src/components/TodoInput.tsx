import React, { useState } from 'react';
import { Plus, Calendar as CalendarIcon } from 'lucide-react';
import { TodoPeriod } from '../types/todo';

interface TodoInputProps {
  onAdd: (title: string, period: TodoPeriod, dueDate: Date) => void;
  selectedDate: Date;
}

export function TodoInput({ onAdd, selectedDate }: TodoInputProps) {
  const [title, setTitle] = useState('');
  const [period, setPeriod] = useState<TodoPeriod>('daily');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), period, selectedDate);
      setTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value as TodoPeriod)}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
            bg-white dark:bg-gray-700 text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
            transition-colors dark:focus:ring-offset-gray-800"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <CalendarIcon className="w-4 h-4" />
        <span>Due date: {selectedDate.toLocaleDateString()}</span>
      </div>
    </form>
  );
}