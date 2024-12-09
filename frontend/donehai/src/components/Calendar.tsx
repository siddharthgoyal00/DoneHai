import React from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { Todo } from '../types/todo';

interface CalendarProps {
  todos: Todo[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export function Calendar({ todos, selectedDate, onSelectDate }: CalendarProps) {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {format(selectedDate, 'MMMM yyyy')}
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const todosForDay = todos.filter((todo) => isSameDay(todo.dueDate, day));
          const isSelected = isSameDay(day, selectedDate);

          return (
            <button
              key={day.toISOString()}
              onClick={() => onSelectDate(day)}
              className={`
                p-2 text-sm rounded-lg relative
                ${isSelected 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
                ${todosForDay.length > 0 ? 'font-semibold' : ''}
              `}
            >
              {format(day, 'd')}
              {todosForDay.length > 0 && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}