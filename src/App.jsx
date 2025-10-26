import React, { useState } from 'react'
import Header from './components/Header'
import TripPlansGrid from './components/TripPlansGrid'
import SearchAndFilter from './components/SearchAndFilter'
import { sampleTripPlans } from './data/sampleData'

function App() {
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
    <div className="App">
      <Header />
      <main className="container" style={{ paddingTop: '40px', paddingBottom: '40px' }}>
        <SearchAndFilter 
          onSearch={handleSearch}
          onFilter={handleFilter}
          searchTerm={searchTerm}
          filterCategory={filterCategory}
        />
        <TripPlansGrid tripPlans={filteredPlans} />
      </main>
    </div>
  )
}

export default App
