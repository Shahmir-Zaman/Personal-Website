import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import './index.css'
import App from './app.jsx'
import { prefersReducedMotion } from './lib/reducedMotion.js'

// Every scroll entrance and UI tween on the site runs through GSAP, so speeding
// the global timeline up makes them all land at once instead of animating.
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(100)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
