import React from "react";
import Header from "../components/header";
import "../styles/Home.css";
import TaskList from "./tasklist.js";
const Home=()=>{
    return (
        <>
            <Header />
            <div className="home-container">
                <h1>Task Master</h1>
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="row">
                        <div className="col-12 col-md-6 d-flex justify-content-center">
                        <div className="box"><img src="Images/Home_image.jpg" class="image-fluid" alt="Its an Homscreen "/></div> 
                        </div> 
                        <div className="col-12 col-md-6 d-flex justify-content-center"> 
                        <div className="box d-flex align-items-center"><p>A task management system is a comprehensive tool designed to help individuals and teams plan, track, and complete tasks efficiently. It enables users to create tasks, assign them to team members, set deadlines, prioritize tasks, and monitor progress. With features like task categorization, real-time collaboration, notifications, and reporting, the system ensures that all tasks are aligned with project goals and completed on time. This system not only enhances productivity but also fosters better communication and accountability within the team. Tailored for various workflows, it adapts to the needs of businesses, organizations, and personal projects, ensuring a seamless task management experience.</p></div> 
                        </div> 
                    </div>
                </div>
            </div>
            <TaskList/>
        </>
    )
}

export default Home;