import React from 'react'
import { MapPin, Calendar, Users, Clock, Star, Plane, Camera, Utensils } from 'lucide-react'

const TripPlanCard = ({ tripPlan, goToTripDetails }) => {
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

  // derive values safely
  const duration = tripPlan.startDate && tripPlan.endDate
    ? Math.max(1, (new Date(tripPlan.endDate) - new Date(tripPlan.startDate)) / (1000*60*60*24))
    : null;

  const travelers = tripPlan.travel?.numberOfTravelers || null;
  const budget = tripPlan.logistics?.budget || null;

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
      {/* Header */}
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
        {/* fallback emoji */}
        {tripPlan.imageEmoji || "🌍"}
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
          {tripPlan.category}
        </div>
      </div>

      {/* Content */}
      <h3>{tripPlan.title}</h3>
      <p>{tripPlan.description}</p>

      <div>
        <div><MapPin size={14}/> {tripPlan.destination}</div>
        <div><Calendar size={14}/> {tripPlan.startDate} – {tripPlan.endDate}</div>
        {duration && <div><Clock size={14}/> {duration} days</div>}
        {travelers && <div><Users size={14}/> {travelers} travelers</div>}
      </div>

      {budget !== null && (
        <div>
          <span>Budget:</span>
          <strong>${budget.toLocaleString()}</strong>
        </div>
      )}

      
    </div>
  )
}


export default TripPlanCard
