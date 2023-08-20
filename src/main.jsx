import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { NoSsr } from '@mui/material'
import { ToastContainer } from 'react-toastify'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NoSsr>
      <App />
      <ToastContainer /> 
    </NoSsr>
  </React.StrictMode>,
)
