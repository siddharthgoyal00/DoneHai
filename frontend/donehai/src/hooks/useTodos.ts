import { useState, useCallback, useEffect } from 'react';
import { Todo, TodoPeriod } from '../types/todo';
import { api } from '../services/api';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await api.getTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = useCallback(async (title: string, period: TodoPeriod, dueDate: Date) => {
    try {
      const newTodo = await api.createTodo({ title, period, dueDate, completed: false });
      setTodos((prev) => [...prev, newTodo]);
      setError(null);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  }, []);

  const toggleTodo = useCallback(async (id: string) => {
    try {
      const updatedTodo = await api.toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
      setError(null);
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  }, []);

  const deleteTodo = useCallback(async (id: string) => {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  }, []);

  return {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
}