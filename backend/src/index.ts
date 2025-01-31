import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { todoRouter } from './routes/todos'; // Adjust the path if needed
import { userRouter } from './routes/user';

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb+srv://admin:fvmQ1D2B6iDKmUM6@cluster0.ztkcnap.mongodb.net/donehai";

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRouter);
app.use('/user' , userRouter)
// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});
