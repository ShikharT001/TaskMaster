import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "../components/form.js"; 
import "../styles/TaskList.css";
const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null); 
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); 
  const [taskToDelete, setTaskToDelete] = useState(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskToDelete}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete));
      setShowConfirmDelete(false); 
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setTaskToDelete(id); // Set the task id to delete
    setShowConfirmDelete(true); // Confirmation
  };

  const handleEdit = (task) => {
    setEditTask(task); // Set updation
  };

  const handleFormSubmit = (updatedTask) => {
    if (editTask) {
      // Update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } else {
      // New Tasks
      setTasks((prevTasks) => [...prevTasks, updatedTask]);
    }
    setEditTask(null); // Reset
  };

  return (
    <div className="container mt-4">
      {editTask ? (
        <Form task={editTask} onSubmit={handleFormSubmit} />
      ) : (
        <>
          <h2 className="text-center mb-4">Task List</h2>
          <div className="row">
            {tasks.map((task) => (
            
              <div className="col-md-4 mb-4" key={task.id}>
                <div className="card">
                  <div className="card-header bg-primary text-white">
                    <h5>{task.title}</h5>
                  </div>
                  <div className="card-body">
                    <p>
                      <strong>Description:</strong> {task.description}
                    </p>
                    <p>
                      <strong>Priority:</strong> {task.priority}
                    </p>
                    <p>
                      <strong>Due Date:</strong> {task.due_date}
                    </p>
                    {task.image_url && (
                      <img
                        src={`http://localhost:5000${task.image_url}`}
                        alt="Here is the name of the "
                        className="image-tasks"
                      />
                    )}
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(task)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteClick(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Confirmation modal */}
      {showConfirmDelete && (
        <div className="modal" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this task?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowConfirmDelete(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
