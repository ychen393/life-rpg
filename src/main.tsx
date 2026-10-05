import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LifeRPGProvider } from './hooks/useLifeRPG'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><LifeRPGProvider><App /></LifeRPGProvider></BrowserRouter></StrictMode>,
)
