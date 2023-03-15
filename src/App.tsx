import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {Outlet} from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <h1>ROOT</h1>
    <div>
    <Outlet/>
    </div>
    </div>
  );
}

export default App
