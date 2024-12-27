import './App.css';
import React from 'react';
import {useRoutes} from 'react-router-dom';
import Home from './pages/home';
import Form from './components/form';
import TaskList from './pages/tasklist';


function App() {
  const routes = useRoutes(
    [
      { path: '/', element: <Home /> },
      { path: '/tasks', element: <Form /> },
      { path: '/tasklist', element: <TaskList /> },

    ]
  )
  return routes
}

export default App;
