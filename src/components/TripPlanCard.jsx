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
    <div className="card" style={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Image Header */}
      <div style={{
        height: '200px',
        background: `linear-gradient(135deg, ${getCategoryColor(tripPlan.category)}20, ${getCategoryColor(tripPlan.category)}40)`,
        borderRadius: '12px',
        marginBottom: '20px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '48px'
      }}>
        {tripPlan.imageEmoji}
        
        {/* Category Badge */}
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: getCategoryColor(tripPlan.category),
          color: 'white',
          padding: '6px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {getCategoryIcon(tripPlan.category)}
          {tripPlan.category.charAt(0).toUpperCase() + tripPlan.category.slice(1)}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '600',
          color: '#333',
          marginBottom: '8px',
          lineHeight: '1.3'
        }}>
          {tripPlan.title}
        </h3>

        <p style={{
          color: '#666',
          fontSize: '14px',
          lineHeight: '1.5',
          marginBottom: '16px',
          flex: 1
        }}>
          {tripPlan.description}
        </p>

        {/* Trip Details */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '14px'
          }}>
            <MapPin size={14} />
            <span>{tripPlan.destination}</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '14px'
          }}>
            <Calendar size={14} />
            <span>{tripPlan.startDate} - {tripPlan.endDate}</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '14px'
          }}>
            <Clock size={14} />
            <span>{tripPlan.duration} days</span>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '14px'
          }}>
            <Users size={14} />
            <span>{tripPlan.travelers} travelers</span>
          </div>
        </div>

        {/* Budget */}
        <div style={{
          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '14px',
              color: '#666',
              fontWeight: '500'
            }}>
              Budget
            </span>
            <span style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#333'
            }}>
              ${tripPlan.budget.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '12px'
        }}>
          <button className="btn btn-primary" style={{
            flex: 1,
            padding: '12px',
            fontSize: '14px'
          }}>
            View Details
          </button>
          <button className="btn btn-secondary" style={{
            padding: '12px',
            fontSize: '14px',
            background: 'rgba(102, 126, 234, 0.1)',
            color: '#667eea',
            border: '1px solid rgba(102, 126, 234, 0.2)'
          }}>
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default TripPlanCard
