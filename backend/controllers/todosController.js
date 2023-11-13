const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');

// const userSchema = require('../models/userModel');
// Define the User schema
/*
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  }
);
*/

// const Todo = require('../models/todoModel');
// Define the Todo schema
const todoSchema = mongoose.Schema(
  {
    /*
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    */
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Todo model
const Todo = mongoose.model('Todo', todoSchema);

const getTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find();
    res.status(200).json(todos)
  });

const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400).json({ error: 'Please add text field' });
    return;
  }

  const todo = await Todo.create({
    text: req.body.text,
  });

  res.status(200).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
  
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
  
    res.status(200).json(updatedTodo);
  });

  const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
  
    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }
  
    await Todo.deleteOne({ _id: req.params.id });
  
    res.status(200).json({ id: req.params.id });
  });

module.exports = {
  getTodos,
  setTodo: asyncHandler(async (req, res) => await setTodo(req, res, Todo)),
  updateTodo,
  deleteTodo,
};
