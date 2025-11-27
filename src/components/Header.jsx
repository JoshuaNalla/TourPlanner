import React from 'react'
import { MapPin, Calendar, Users, Star } from 'lucide-react'

const Header = () => {
  return (
    <header style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '20px 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>
              ✈️
            </div>
            <h1 style={{
              color: 'white',
              fontSize: '28px',
              fontWeight: '700',
              margin: 0
            }}>
              Tour Planner
            </h1>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            color: 'white',
            fontSize: '14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={16} />
              <a href="/my-trips.html" style={{ color: 'white', textDecoration: 'none' }}>
                My Trips
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={16} />
              <a href="/calendar.html" style={{ color: 'white', textDecoration: 'none' }}>
                Calendar
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Users size={16} />
              <a href="/groups.html" style={{ color: 'white', textDecoration: 'none' }}>
                Groups
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
