import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import gsap from 'gsap'

// Silence harmless GSAP warnings caused by React StrictMode and dynamic unmounting
gsap.config({ nullTargetWarn: false });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
