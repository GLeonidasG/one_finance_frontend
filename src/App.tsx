import './App.css'
import Dashboard from "./dashboard";

function App() {

  return (
    <div className="flex flex-1 w-full">
      <div className="sidebar-opacity">
        <div className="sidebar">
          <div className="user-icon">user icon</div>
          <div className="navbar-options">options</div>
        </div>
      </div>
      <Dashboard />
    </div>
  );
}

export default App
