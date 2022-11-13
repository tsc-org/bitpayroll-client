import React from 'react'
import ReactDOM from 'react-dom/client'
import setupAxios from './api/setupAxios'
import App from './App'
import './index.css'

setupAxios()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
