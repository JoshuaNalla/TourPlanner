import React from 'react'
import { MapPin, Calendar, Users, Star } from 'lucide-react'

const Header = ({goToMyTrips, goToCalendar, goToGroups, goToHome, goToRegister, goToLogin}) => {
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
          <div 
            style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: "pointer"}}
            onClick={goToHome}
            >
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
            <h1 
              style={{
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
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: "pointer" }}
              onClick={goToLogin}
            >
              <Users size={16} />
              <span>Login</span>
              </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: "pointer" }}
              onClick={goToRegister}
            >
              <Users size={16} />
              <span>Register</span>
              </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: "pointer" }}
              onClick={goToMyTrips}
            >
              <MapPin size={16} />
              <span>My Trips</span>
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: "pointer" }}
              onClick={goToCalendar}
            >
              <Calendar size={16} />
              <span>Calendar</span> 
            </div>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: "pointer" }}
              onClick={goToGroups}
            >
              <Users size={16} />
              <span>Groups</span> 
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
