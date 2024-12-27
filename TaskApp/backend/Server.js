//Import libraries
const express = require("express");
const cors = require("cors");
const router = require("./routes/route.js"); 
const path = require("path");
require('dotenv').config();
const app = express();
const port = process.env.port;

//Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors()); 


app.use("/api", router); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

//Testing Purpose
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});



app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
