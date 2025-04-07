const express = require("express");
const router = express.Router();
const authenticateToken = require('./middleware');
const Todo = require('../models/Todo');


router.post('/create', authenticateToken, async (req, res) => {
    const { title } = req.body;
    const newTodo = new Todo({
        title,
        user: req.user.id,
    });
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(201).json({ error: 'Error creating todo' });
    }
});

// get all todos 
router.get('/getall', authenticateToken, async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching todos' })
    }
})

// get one todo
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getonetodo = await Todo.findById(id)
        res.status(200).send(getonetodo)
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
})

// Update a todo
router.put("/update/:id", authenticateToken, async (req, res) => {
    const { title, completed } = req.body;
    try {
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { title, completed },
            { new: true }
        );
        if (!updatedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: "Error updating todo" });
    }
});

// Delete a todo
router.delete("/delete/:id", authenticateToken, async (req, res) => {
    try {
        const deletedTodo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        if (!deletedTodo) {
            return res.status(404).json({ error: "Todo not found" });
        }
        res.json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting todo" });
    }
});


module.exports = router;