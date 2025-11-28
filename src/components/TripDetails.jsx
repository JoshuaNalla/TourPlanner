import React from 'react'
import { MapPin, Calendar, Clock, Users, Plane, Camera, Star, Utensils } from 'lucide-react'

const TripDetails = ({ trip }) => {
  if (!trip) return <div style={{ padding: "20px", color: "white" }}>Error Selecting Trip</div>

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
    <div style={{ padding: "20px", color: "white" }}>
      {/* Title */}
      <h1 style={{ fontSize: "32px", marginBottom: "16px" }}>{trip.title}</h1>

      {/* Image Header */}
      <div style={{
        height: '300px',
        background: `linear-gradient(135deg, ${getCategoryColor(trip.category)}20, ${getCategoryColor(trip.category)}40)`,
        borderRadius: '12px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
        position: 'relative'
      }}>
        {trip.imageEmoji}

        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: getCategoryColor(trip.category),
          color: 'white',
          padding: '8px 16px',
          borderRadius: '20px',
          fontSize: '14px',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          {getCategoryIcon(trip.category)}
          {trip.category.charAt(0).toUpperCase() + trip.category.slice(1)}
        </div>
      </div>

      {/* Trip Details */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#ccc' }}>
          <MapPin size={16} />
          <span>{trip.destination}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#ccc' }}>
          <Calendar size={16} />
          <span>{trip.startDate} - {trip.endDate}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#ccc' }}>
          <Clock size={16} />
          <span>{trip.duration} days</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', color: '#ccc' }}>
          <Users size={16} />
          <span>{trip.travelers} travelers</span>
        </div>
      </div>

      {/* Description */}
      <p style={{ marginBottom: '20px', color: '#ccc', fontSize: '16px', lineHeight: '1.5' }}>
        {trip.description}
      </p>

      {/* Budget */}
      <div style={{
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ fontSize: '16px', color: '#666', fontWeight: '500' }}>Budget</span>
        <span style={{ fontSize: '20px', fontWeight: '700', color: '#333' }}>
          ${trip.budget.toLocaleString()}
        </span>
      </div>
    </div>
  )
}

export default TripDetails

