import React from 'react'
import TripPlanCard from './TripPlanCard'

const TripPlansGrid = ({ tripPlans, goToTripDetails }) => {
  if (tripPlans.length === 0) {
    return (
      <div className="card fade-in-up" style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'rgba(255, 255, 255, 0.8)'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '20px'
        }}>
          🗺️
        </div>
        <h3 style={{
          fontSize: '24px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '12px'
        }}>
          No trips found
        </h3>
        <p style={{
          color: '#666',
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          Try adjusting your search or filter criteria
        </p>
        <button className="btn btn-primary">
          Create New Trip
        </button>
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      marginTop: '20px'
    }}>
      {tripPlans.map((plan, index) => (
        <div 
          key={plan.id}
          className="fade-in-up"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <TripPlanCard tripPlan={plan}
            goToTripDetails={goToTripDetails}
          />
        </div>
      ))}
    </div>
  )
}

export default TripPlansGrid
