import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import './index.css'
import LoginPage from './login'
import { authentication } from "./apis/authentication"
import App from './App'

function Root() {
  return (
    <></>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: function () {
      authentication.checkForSession()
      if (authentication.isSessionOn())
        return redirect("/dashboard")
      else {
          return redirect('/login')
        }
      
    }
  },
  {
    path: "/dashboard",
    element: <App />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

