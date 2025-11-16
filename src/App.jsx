import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import TripPlansGrid from './components/TripPlansGrid'
import SearchAndFilter from './components/SearchAndFilter'
import CreateNewPlan from './components/CreateNewPlan'
import Calendar from './components/Calendar'
import { sampleTripPlans } from './data/sampleData'

function Home() {
  const [tripPlans, setTripPlans] = useState(sampleTripPlans)
  const [filteredPlans, setFilteredPlans] = useState(sampleTripPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const handleSearch = (term) => {
    setSearchTerm(term)
    filterPlans(term, filterCategory)
  }

  const handleFilter = (category) => {
    setFilterCategory(category)
    filterPlans(searchTerm, category)
  }

  const filterPlans = (search, category) => {
    let filtered = tripPlans

    // Filter by search term
    if (search) {
      filtered = filtered.filter(plan =>
        plan.title.toLowerCase().includes(search.toLowerCase()) ||
        plan.destination.toLowerCase().includes(search.toLowerCase()) ||
        plan.description.toLowerCase().includes(search.toLowerCase())
      )
    }

    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(plan => plan.category === category)
    }

    setFilteredPlans(filtered)
  }

  return (
    <main className="container main-content">
      <SearchAndFilter 
        onSearch={handleSearch}
        onFilter={handleFilter}
        searchTerm={searchTerm}
        filterCategory={filterCategory}
      />
      <TripPlansGrid tripPlans={filteredPlans} />
    </main>
  )
}

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-new-plan" element={<CreateNewPlan />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </div>
  )
}

export default App
