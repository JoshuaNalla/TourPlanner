import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Users, Plus } from 'lucide-react'

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-container">
          <Link to="/" className="header-logo-section">
            <div className="header-logo-icon">
              ✈️
            </div>
            <h1 className="header-title">
              Trip Planner
            </h1>
          </Link>
          
          <div className="header-nav">
            <Link to="/" className="header-nav-item">
              <MapPin size={16} />
              <span>My Trips</span>
            </Link>
            <Link to="/calendar" className="header-nav-item">
              <Calendar size={16} />
              <span>Calendar</span>
            </Link>
            <div className="header-nav-item">
              <Users size={16} />
              <span>Groups</span>
            </div>
            <Link 
              to="/create-new-plan"
              className="header-create-button"
            >
              <Plus size={16} />
              <span>Create New Plan</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
