const express = require("express");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  upload,
} = require("../controls/task_control.js");


const router = express.Router();

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    await getTasks(req, res);
  } catch (err) {
    console.error("Error in getTasks route:", err);
    res.status(500).send({ message: "Error fetching tasks." });
  }
});

// Create Route
router.post("/tasks", upload.single("image"), async (req, res) => {
  try {
    await createTask(req, res);
  } catch (err) {
    console.error("Error in createTask route:", err);
    res.status(500).send({ message: "Error creating task." });
  }
});

// Update Rote
router.put('/tasks/:id', upload.single('image'), async (req, res) => {
  try {
    await updateTask(req, res);
  } catch (err) {
    console.error("Error in updateTask route:", err);
    res.status(500).send({ message: "Error updating task." });
  }
});

//Delete Route
router.delete("/tasks/:id", async (req, res) => {
  try {
    await deleteTask(req, res);
  } catch (err) {
    console.error("Error in deleteTask route:", err);
    res.status(500).send({ message: "Error deleting task." });
  }
});

module.exports = router;
