import React from 'react'
import { MapPin, Calendar, Users, Clock, Star, Plane, Camera, Utensils } from 'lucide-react'

const TripPlanCard = ({ tripPlan }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'adventure': return <Plane size={16} />
      case 'cultural': return <Camera size={16} />
      case 'relaxation': return <Star size={16} />
      case 'business': return <Users size={16} />
      case 'family': return <Utensils size={16} />
      default: return <MapPin size={16} />
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'adventure': return '#ff6b6b'
      case 'cultural': return '#4ecdc4'
      case 'relaxation': return '#45b7d1'
      case 'business': return '#96ceb4'
      case 'family': return '#feca57'
      default: return '#667eea'
    }
  }

  return (
    <div className="card trip-plan-card">
      {/* Image Header */}
      <div 
        className="trip-plan-image-header"
        style={{
          background: `linear-gradient(135deg, ${getCategoryColor(tripPlan.category)}20, ${getCategoryColor(tripPlan.category)}40)`
        }}
      >
        {tripPlan.imageEmoji}
        
        {/* Category Badge */}
        <div 
          className="trip-plan-category-badge"
          style={{
            background: getCategoryColor(tripPlan.category)
          }}
        >
          {getCategoryIcon(tripPlan.category)}
          {tripPlan.category.charAt(0).toUpperCase() + tripPlan.category.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div className="trip-plan-content">
        <h3 className="trip-plan-title">
          {tripPlan.title}
        </h3>

        <p className="trip-plan-description">
          {tripPlan.description}
        </p>

        {/* Trip Details */}
        <div className="trip-plan-details">
          <div className="trip-plan-detail-item">
            <MapPin size={14} />
            <span>{tripPlan.destination}</span>
          </div>
          
          <div className="trip-plan-detail-item">
            <Calendar size={14} />
            <span>{tripPlan.startDate} - {tripPlan.endDate}</span>
          </div>
          
          <div className="trip-plan-detail-item">
            <Clock size={14} />
            <span>{tripPlan.duration} days</span>
          </div>
          
          <div className="trip-plan-detail-item">
            <Users size={14} />
            <span>{tripPlan.travelers} travelers</span>
          </div>
        </div>

        {/* Budget */}
        <div className="trip-plan-budget">
          <div className="trip-plan-budget-content">
            <span className="trip-plan-budget-label">
              Budget
            </span>
            <span className="trip-plan-budget-amount">
              ${tripPlan.budget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="trip-plan-actions">
          <button className="btn btn-primary trip-plan-action-button">
            View Details
          </button>
          <button className="btn trip-plan-edit-button">
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default TripPlanCard
