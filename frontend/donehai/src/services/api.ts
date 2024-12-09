import axios from 'axios';
import { Todo, TodoCreate } from '../types/todo';

const API_URL = 'http://localhost:5000/api';

export const api = {
  getTodos: async (): Promise<Todo[]> => {
    const response = await axios.get(`${API_URL}/todos`);
    return response.data.map((todo: any) => ({
      ...todo,
      id: todo._id,
      dueDate: new Date(todo.dueDate),
      createdAt: new Date(todo.createdAt),
    }));
  },

  createTodo: async (todo: TodoCreate): Promise<Todo> => {
    const response = await axios.post(`${API_URL}/todos`, todo);
    return {
      ...response.data,
      id: response.data._id,
      dueDate: new Date(response.data.dueDate),
      createdAt: new Date(response.data.createdAt),
    };
  },

  toggleTodo: async (id: string): Promise<Todo> => {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
    return {
      ...response.data,
      id: response.data._id,
      dueDate: new Date(response.data.dueDate),
      createdAt: new Date(response.data.createdAt),
    };
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/todos/${id}`);
  },
};