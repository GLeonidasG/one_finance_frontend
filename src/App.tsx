import { v4 as uuid } from "uuid"
import './App.css'
import { Outlet, useRoutes } from 'react-router-dom'
import {useEffect} from "react"

function App() {

  return (
    <div className="flex flex-1 w-full">
      <div className="sidebar-opacity">
        <div className="sidebar">
          <div className="user-icon">user icon</div>
          <div className="navbar-options">options</div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default App
