import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import News from './News.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <News />
  </StrictMode>,
)
