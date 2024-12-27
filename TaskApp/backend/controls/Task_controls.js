const db = require('../database/db.js');  
const path = require('path');
const multer = require('multer');

// Multer for file uploads
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });
  
  
// Fetch all tasks with pagination
const getTasks = (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
  
    db.query('SELECT * FROM tasks LIMIT ? OFFSET ?', [parseInt(limit), offset], (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            return res.status(500).send({ message: 'Error fetching tasks' });
        }
        res.status(200).json(results);
    });
};

// Create Tasks
const createTask = (req, res) => {
    const { title, description, priority, due_date } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!title || !priority) {
        return res.status(400).send({ message: 'Title and Priority are required.' });
    }

    const query = 'INSERT INTO tasks (title, description, priority, due_date, image_url) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [title, description, priority, due_date, imageUrl], (err, result) => {
        if (err) {
            console.error('Error creating task:', err);
            return res.status(500).send({ message: 'Error creating task' });
        }
        res.status(201).send({ message: 'Task created successfully!' });
    });
};

// Update existing task
const updateTask = (req, res) => {
    const { title, description, priority, due_date } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const query = 'UPDATE tasks SET title = ?, description = ?, priority = ?, due_date = ?, image_url = ? WHERE id = ?';
    db.query(query, [title, description, priority, due_date, imageUrl || null, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating task:', err);
            return res.status(500).send({ message: 'Error updating task' });
        }
        res.status(200).send({ message: 'Task updated successfully!' });
    });
};

// Delete a task
const deleteTask = (req, res) => {
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            return res.status(500).send({ message: 'Error deleting task' });
        }
        res.status(200).send({ message: 'Task deleted successfully!' });
    });
};

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
    upload
};
