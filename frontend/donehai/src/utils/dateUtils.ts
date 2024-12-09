import {
    isSameDay,
    isSameWeek,
    isSameMonth,
    startOfWeek,
    endOfWeek,
    format,
  } from 'date-fns';
  import { Todo } from '../types/todo';
  
  export function filterTodosByDate(todos: Todo[], selectedDate: Date) {
    const dailyTodos = todos.filter(
      (todo) => todo.period === 'daily' && isSameDay(todo.dueDate, selectedDate)
    );
  
    const weeklyTodos = todos.filter(
      (todo) =>
        todo.period === 'weekly' && isSameWeek(todo.dueDate, selectedDate)
    );
  
    const monthlyTodos = todos.filter(
      (todo) =>
        todo.period === 'monthly' && isSameMonth(todo.dueDate, selectedDate)
    );
  
    return {
      dailyTodos,
      weeklyTodos,
      monthlyTodos,
    };
  }
  
  export function getDateInfo(date: Date) {
    const weekStart = startOfWeek(date);
    const weekEnd = endOfWeek(date);
  
    return {
      day: format(date, 'EEEE, MMMM d, yyyy'),
      week: `Week of ${format(weekStart, 'MMM d')} - ${format(weekEnd, 'MMM d, yyyy')}`,
      month: format(date, 'MMMM yyyy'),
    };
  }