import React from 'react';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { Calendar } from './components/Calendar';
import { ThemeToggle } from './components/ThemeToggle';
import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { filterTodosByDate } from './utils/dateUtils';

function App() {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  const { theme, toggleTheme } = useTheme();
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const { dailyTodos, weeklyTodos, monthlyTodos } = filterTodosByDate(
    todos,
    selectedDate
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-400">Loading todos...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-600 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Done Hai</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Organize your tasks by time period</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Add a New Todo</h2>
              <TodoInput onAdd={addTodo} selectedDate={selectedDate} />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <TodoList
                todos={dailyTodos}
                period="daily"
                selectedDate={selectedDate}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <TodoList
                todos={weeklyTodos}
                period="weekly"
                selectedDate={selectedDate}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <TodoList
                todos={monthlyTodos}
                period="monthly"
                selectedDate={selectedDate}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Calendar</h2>
            <Calendar
              todos={todos}
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
