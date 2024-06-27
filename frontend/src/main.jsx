import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Root from './pages/Root.jsx'

import HomePage from './pages/HomePage.jsx'
import LoginPage ,{action as loginAction} from './pages/LoginPage.jsx'
import RegisterPage,{action as registerAction} from './pages/RegisterPage.jsx'
import HomeAPage from './pages/HomeAPage.jsx'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "/register",
        element: <RegisterPage />,
        action: registerAction,
      },
      {
        path: "home",
        element: <HomeAPage />,
      }
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

