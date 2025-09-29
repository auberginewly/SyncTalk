import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 这个路由无需页面刷新可以切换到不同的页面 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
