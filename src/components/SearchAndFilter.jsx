import React from 'react'
import { Search, Filter } from 'lucide-react'

const SearchAndFilter = ({ onSearch, onFilter, searchTerm, filterCategory }) => {
  const categories = [
    { value: 'all', label: 'All Trips' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'business', label: 'Business' },
    { value: 'family', label: 'Family' }
  ]

  return (
    <div className="card fade-in-up search-filter-card">
      <div className="search-filter-content">
        <h2 className="search-filter-title">
          Your Travel Plans
        </h2>
        
        <div className="search-filter-controls">
          {/* Search Bar */}
          <div className="search-input-wrapper">
            <Search 
              size={20} 
              className="search-icon"
            />
            <input
              type="text"
              placeholder="Search your trips..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filter Buttons */}
          <div className="filter-buttons-container">
            <Filter size={18} className="filter-icon" />
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onFilter(category.value)}
                className={`filter-button ${filterCategory === category.value ? 'active' : ''}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter
