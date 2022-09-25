import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrawlApp } from './BrawlApp'
import { AppTheme } from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppTheme>
      <BrawlApp />
    </AppTheme> 
  </React.StrictMode>
)