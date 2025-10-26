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
    <div className="card fade-in-up" style={{ marginBottom: '32px' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#333',
          margin: 0
        }}>
          Your Travel Plans
        </h2>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Search Bar */}
          <div style={{ position: 'relative' }}>
            <Search 
              size={20} 
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#666'
              }}
            />
            <input
              type="text"
              placeholder="Search your trips..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '16px 16px 16px 48px',
                border: '2px solid #e1e5e9',
                borderRadius: '12px',
                fontSize: '16px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: 'white'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#667eea'
                e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e1e5e9'
                e.target.style.boxShadow = 'none'
              }}
            />
          </div>

          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <Filter size={18} style={{ color: '#666' }} />
            {categories.map(category => (
              <button
                key={category.value}
                onClick={() => onFilter(category.value)}
                className={`btn ${filterCategory === category.value ? 'btn-primary' : 'btn-secondary'}`}
                style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  borderRadius: '20px',
                  border: filterCategory === category.value ? 'none' : '1px solid #e1e5e9',
                  background: filterCategory === category.value 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white',
                  color: filterCategory === category.value ? 'white' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
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
