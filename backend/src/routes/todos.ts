import express from 'express';
import { Todo } from '../models/todo';
import { authMiddleware } from '../middleware';

const router = express.Router();

// Get all todos
router.get('/', authMiddleware , async (req, res) => {
  try {
    const userId =( req as any).user.id;
    const todos = await Todo.find({userId});
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Create a todo
router.post('/', authMiddleware, async (req, res) => {
  const userId = (req as any).user.id;
  const todo = new Todo({
    title: req.body.title,
    period: req.body.period,
    dueDate: req.body.dueDate,
    userId,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Toggle todo completion
router.patch('/:id/toggle',authMiddleware,  async (req: any , res : any ) => {
  try {
    const userId = req.user.id;
    const todo = await Todo.findById({_id:req.params.id, userId});
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    todo.completed = !todo.completed;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete a todo
router.delete('/:id', authMiddleware, async (req: any , res: any ) => {
  try {
    const userId = req.user.id;
    const todo = await Todo.findById({_id:req.params.id, userId});
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }
    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
export { router as todoRouter };