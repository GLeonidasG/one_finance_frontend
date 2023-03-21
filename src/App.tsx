import { useState } from 'react'
import './App.css'
import {Outlet} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="main-container">
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
