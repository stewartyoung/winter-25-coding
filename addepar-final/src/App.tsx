import './App.css'
import JobsListings from './components/great-frontend/JobsListings'
import Data from './pages/Data'
import Home from './pages/Home'
import { Route, Routes } from 'react-router-dom'
import TabsPage from './pages/TabsPage'
import FlightBookingPage from './pages/FlightBookingPage'
import FilesPage from './pages/Files'
import SliderPage from './pages/SliderPage'
import SortPage from './pages/SortPage'
import SearchSortDataTablePage from './pages/SearchSortDataTablePage'
import Layout from './components/Layout'

function App() {


  return (
    <>
      {/* Route definitions */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobsListings />} />
          <Route path="/data" element={<Data />} />
          <Route path="/tabs" element={<TabsPage />} />
          <Route path="/flights" element={<FlightBookingPage />} />
          <Route path="/files" element={<FilesPage />} />
          <Route path="/slider" element={<SliderPage />} />
          <Route path="/sort" element={<SortPage />} />
          <Route path="/search-sort" element={<SearchSortDataTablePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
