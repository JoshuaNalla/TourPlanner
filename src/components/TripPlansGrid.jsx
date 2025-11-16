import React from 'react'
import TripPlanCard from './TripPlanCard'

const TripPlansGrid = ({ tripPlans }) => {
  if (tripPlans.length === 0) {
    return (
      <div className="card fade-in-up empty-state-card">
        <div className="empty-state-emoji">
          🗺️
        </div>
        <h3 className="empty-state-title">
          No trips found
        </h3>
        <p className="empty-state-message">
          Try adjusting your search or filter criteria
        </p>
        <button className="btn btn-primary">
          Create New Trip
        </button>
      </div>
    )
  }

  return (
    <div className="trip-plans-grid">
      {tripPlans.map((plan, index) => (
        <div 
          key={plan.id}
          className="fade-in-up trip-plan-item"
          style={{
            animationDelay: `${index * 0.1}s`
          }}
        >
          <TripPlanCard tripPlan={plan} />
        </div>
      ))}
    </div>
  )
}

export default TripPlansGrid
