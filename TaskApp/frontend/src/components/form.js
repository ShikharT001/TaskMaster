import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import '../styles/form.css';

const Form = ({ task, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    image: null,
  });

  const navigate = useNavigate(); 

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "",
        due_date: task.due_date || "",
        image: null, // Image must be uploaded
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type! Only PNG, JPG, and JPEG are allowed.");
        e.target.value = ""; // Clear
        return;
      }
      setFormData({ ...formData, image: file });
    }
  };
  

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      const validTypes = ["image/png", "image/jpg", "image/jpeg"];
      if (!validTypes.includes(file.type)) {
        alert("Invalid file type! Only PNG, JPG, and JPEG are allowed.");
        return;
      }
      setFormData({ ...formData, image: file });
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    console.log(form)
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        form.append(key, formData[key]);
      }
    });

    try {
      let response;
      if (task) {
        // Update Task
        response = await axios.put(
          `http://localhost:5000/api/tasks/${task.id}`,
          form,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Update Response:", response.data);
      } else {
        // Create Task
        response = await axios.post("http://localhost:5000/api/tasks", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Create Response:", response.data);
      }

      if (response.status === 200 || response.status === 201) {
        // onSubmit(response.data); // Pass updated task to parent if needed
        alert("Task submitted successfully!"); 
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error submitting task:", error.response || error);
      alert("Failed to submit the task. Please try again.");
    }
  };

  return (
    <div className="container mt-4 form-container" id="form-container">
      <h2 className="text-center mb-4">{task ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={handleSubmit} className="d-flex">
        {/* Left side - Image Preview, initially hidden */}
        <div
          className="image-preview-container"
          style={{
            flex: 1,
            marginRight: "20px",
            display: formData.image ? "block" : "none",
          }}
        >
          {formData.image && (
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="img-fluid"
              style={{ maxWidth: "200px", maxHeight: "200px", objectFit: "cover" }}
            />
          )}
        </div>

        {/* Right side - Form */}
        <div className="form-fields-container" style={{ flex: 2 }}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="priority" className="form-label">Priority</label>
            <select
              className="form-select"
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="due_date" className="form-label">Due Date</label>
            <input
              type="date"
              className="form-control"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              required
            />
          </div>
          {/* Image Upload with Drag-and-Drop */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">Image</label>
            <div
              className="drag-and-drop-area"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #ccc",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the default file input
              />
              <p>Drag & drop an image here, or click to select an image.</p>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {task ? "Update Task" : "Create Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
