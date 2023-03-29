import React, { useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom"
import './index.css'
import LoginPage from './login'
import Dashboard from './dashboard'
import { v4 as uuid } from "uuid"

const USER_SESSION_KEY = "USER_SESSION"
type UserSession = {
  username: string
  token: string
}

type UserCredentials = {
  username: string
  password: string
}

class Authentication {
  private users: Map<string, UserCredentials> = new Map()
  private user: UserSession | null

  constructor() {
    this.users.set(uuid(), { username: "admin", password: "admin" })
    this.user = null
  }

  public checkForSession(): void {
    this.user = JSON.parse(localStorage.getItem(USER_SESSION_KEY) || "null")
  }

  public isSessionOn(): boolean {
    return this.user !== null;
  }

  public authenticate({ username, password }: UserCredentials): boolean {
    const userMatch = [...this.users.values()].find((user) => user.username === username && user.password === password);
    if (userMatch) {
      const token = uuid()
      localStorage.setItem(USER_SESSION_KEY, JSON.stringify({ username, token }))
      console.log("User authenticated")
      return true
    }
    else {
      console.error("User not authenticated")
      return false
    }
  }

}

export const authentication = new Authentication()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard/>,
    // children: [
    //   {
    //     path: "dashboard",
    //     element: <Dashboard />,
    //   },
    // ],
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

