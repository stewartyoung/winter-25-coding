import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Link } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      {/* Navigation */}
      <nav className='navbar'>
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/data">Data</Link>
          <Link to="/tabs">Tabs</Link>
          <Link to="/flights">Flights</Link>
          <Link to="/files">Files</Link>
          <Link to="/slider">Slider</Link>
          <Link to="/sort">Sort</Link>
          <Link to="/search-sort">Search-Sort</Link>
        </nav>
      <div id="root">
      <App />  
      </div>
    </BrowserRouter>
  </StrictMode>
)
