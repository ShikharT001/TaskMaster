import React from "react";
import{NavLink} from "react-router-dom";
import '../styles/Home.css'



const Header=()=>{
  

    return (
        <>
       <nav className="navbar navbar-expand-lg navbar-head">
  <div className="container-fluid">

    <a className="navbar-brand" href="/">
      <img src="Images/Logo.png" alt="Logo" width={40} height={40} className="d-inline-block align-text-top" />
      
    </a>


    {/* Toggler button for mobile view */}
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarContent">


      {/* Search Bar */}
      <form className="d-flex ms-auto me-3">
        <input className="form-control me-2 search-bar" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit" style={{color:'white'}}>Search</button>
      </form>


      {/* Links */}
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to='/tasks' className="nav-link active" id="hover" aria-current="page" style={{color:'white'}}>Add Tasks</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to='/tasklist' className="nav-link" href="#" style={{color:'white'}}>All Tasks</NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}


export default Header;
