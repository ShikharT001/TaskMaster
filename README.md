# MERN Stack Task Manager with MySQL

This project is a Task Management application built using the MERN stack (MongoDB, Express, React, Node.js) with MySQL as the database. It includes features like task creation, updating, deletion, image upload, and pagination.

---

## Features

- Create, update, and delete tasks.
- Image upload with file validation (supports `.jpg`, `.png`, `.jpeg`).
- Paginated list of tasks.
- Cloud-based or local storage options for images.
- Backend validation for required fields and image size.
- Responsive frontend built with React.

---

## Project Structure

```plaintext
project-root/
├── backend/
│   ├── app.js
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   └── tasks.js
│   └── uploads/
│       └── (Uploaded images will be stored here)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Form.js
│   │   └── App.js
│   ├── public/
│   └── package.json
├── tasks.sql
└── README.md
