import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react'
import { sampleTripPlans } from '../data/sampleData'

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  // Get trips for a specific date
  const getTripsForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return sampleTripPlans.filter(trip => {
      const startDate = new Date(trip.startDate)
      const endDate = new Date(trip.endDate)
      const checkDate = new Date(dateStr)
      return checkDate >= startDate && checkDate <= endDate
    })
  }

  // Check if date is trip start date
  const isTripStartDate = (date, trip) => {
    const dateStr = date.toISOString().split('T')[0]
    return dateStr === trip.startDate
  }

  // Check if date is trip end date
  const isTripEndDate = (date, trip) => {
    const dateStr = date.toISOString().split('T')[0]
    return dateStr === trip.endDate
  }

  // Check if date is in the middle of a trip (not start or end)
  const isTripMiddleDate = (date, trip) => {
    const dateStr = date.toISOString().split('T')[0]
    const startDate = new Date(trip.startDate)
    const endDate = new Date(trip.endDate)
    const checkDate = new Date(dateStr)
    return checkDate > startDate && checkDate < endDate
  }

  // Check if a date is within any trip
  const isDateInTrip = (date) => {
    return getTripsForDate(date).length > 0
  }

  // Get trip color based on category
  const getTripColor = (category) => {
    const colors = {
      adventure: '#ef4444',
      cultural: '#3b82f6',
      relaxation: '#10b981',
      business: '#f59e0b',
      family: '#8b5cf6'
    }
    return colors[category] || '#6b7280'
  }

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    
    // First day of the month
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    
    // Days in the month
    const daysInMonth = lastDay.getDate()
    
    // Starting day of week (0 = Sunday, 6 = Saturday)
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const calendarDays = getCalendarDays()
  const today = new Date()
  const isToday = (date) => {
    if (!date) return false
    return date.toDateString() === today.toDateString()
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '40px 20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="card fade-in-up" style={{ 
          background: 'rgba(255, 255, 255, 0.98)',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <CalendarIcon size={32} style={{ color: '#667eea' }} />
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                margin: 0,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                My Calendar
              </h1>
            </div>
            <button
              onClick={goToToday}
              className="btn btn-secondary"
              style={{
                padding: '10px 20px',
                fontSize: '14px'
              }}
            >
              Today
            </button>
          </div>

          {/* Month Navigation */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '24px'
          }}>
            <button
              onClick={goToPreviousMonth}
              className="btn btn-secondary"
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ChevronLeft size={20} />
            </button>
            
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#333',
              margin: 0
            }}>
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <button
              onClick={goToNextMonth}
              className="btn btn-secondary"
              style={{
                padding: '10px 16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            gap: '8px'
          }}>
            {/* Day Headers */}
            {dayNames.map(day => (
              <div
                key={day}
                style={{
                  padding: '12px',
                  textAlign: 'center',
                  fontWeight: '600',
                  color: '#666',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} style={{ padding: '12px' }} />
              }

              const trips = getTripsForDate(date)
              const hasTrips = trips.length > 0
              const isCurrentDay = isToday(date)
              
              // Get the primary trip color (first trip's color)
              const primaryTrip = hasTrips ? trips[0] : null
              const primaryColor = primaryTrip ? getTripColor(primaryTrip.category) : null
              
              // Determine trip position indicators
              const isStart = primaryTrip ? isTripStartDate(date, primaryTrip) : false
              const isEnd = primaryTrip ? isTripEndDate(date, primaryTrip) : false
              const isMiddle = primaryTrip ? isTripMiddleDate(date, primaryTrip) : false

              return (
                <div
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  style={{
                    minHeight: '100px',
                    padding: '8px',
                    border: isCurrentDay 
                      ? '3px solid #667eea' 
                      : hasTrips 
                        ? `2px solid ${primaryColor}80`
                        : '2px solid #e1e5e9',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: hasTrips 
                      ? `linear-gradient(135deg, ${primaryColor}20 0%, ${primaryColor}30 100%)`
                      : 'white',
                    position: 'relative',
                    borderLeft: hasTrips && isStart ? `4px solid ${primaryColor}` : undefined,
                    borderRight: hasTrips && isEnd ? `4px solid ${primaryColor}` : undefined,
                    ...(selectedDate && selectedDate.toDateString() === date.toDateString() && {
                      boxShadow: `0 0 0 4px ${primaryColor || '#667eea'}40`,
                      transform: 'scale(1.02)'
                    })
                  }}
                  onMouseEnter={(e) => {
                    if (hasTrips) {
                      e.currentTarget.style.transform = 'scale(1.05)'
                      e.currentTarget.style.boxShadow = `0 4px 12px ${primaryColor}60`
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!(selectedDate && selectedDate.toDateString() === date.toDateString())) {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px'
                  }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: isCurrentDay ? '700' : '600',
                      color: isCurrentDay ? '#667eea' : hasTrips ? primaryColor : '#333',
                    }}>
                      {date.getDate()}
                    </div>
                    {hasTrips && (
                      <div style={{
                        display: 'flex',
                        gap: '2px'
                      }}>
                        {isStart && (
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: primaryColor,
                            border: '1px solid white'
                          }} title="Trip Start" />
                        )}
                        {isEnd && (
                          <div style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: primaryColor,
                            border: '1px solid white'
                          }} title="Trip End" />
                        )}
                        {isMiddle && (
                          <div style={{
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: primaryColor + '80'
                          }} />
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Trip Indicators */}
                  {hasTrips && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      marginTop: '4px'
                    }}>
                      {trips.slice(0, 2).map((trip, tripIndex) => (
                        <div
                          key={trip.id}
                          style={{
                            fontSize: '10px',
                            padding: '4px 6px',
                            borderRadius: '6px',
                            background: getTripColor(trip.category),
                            color: 'white',
                            fontWeight: '600',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap'
                          }}
                          title={trip.title}
                        >
                          {trip.imageEmoji} {trip.title.length > 12 ? trip.title.substring(0, 12) + '...' : trip.title}
                        </div>
                      ))}
                      {trips.length > 2 && (
                        <div style={{
                          fontSize: '10px',
                          padding: '4px 6px',
                          borderRadius: '6px',
                          background: '#6b7280',
                          color: 'white',
                          fontWeight: '600',
                          textAlign: 'center'
                        }}>
                          +{trips.length - 2} more
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Selected Date Info */}
          {selectedDate && getTripsForDate(selectedDate).length > 0 && (
            <div style={{
              marginTop: '32px',
              padding: '24px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '16px',
              border: '2px solid rgba(102, 126, 234, 0.2)'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#333',
                marginBottom: '16px'
              }}>
                Trips on {selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {getTripsForDate(selectedDate).map(trip => (
                  <div
                    key={trip.id}
                    style={{
                      padding: '16px',
                      background: 'white',
                      borderRadius: '12px',
                      borderLeft: `4px solid ${getTripColor(trip.category)}`,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px'
                    }}
                  >
                    <div style={{
                      fontSize: '32px'
                    }}>
                      {trip.imageEmoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#333',
                        marginBottom: '4px'
                      }}>
                        {trip.title}
                      </div>
                      <div style={{
                        fontSize: '14px',
                        color: '#666'
                      }}>
                        {trip.destination} • {trip.startDate} to {trip.endDate}
                      </div>
                    </div>
                    <div style={{
                      padding: '8px 16px',
                      borderRadius: '8px',
                      background: getTripColor(trip.category),
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: '600',
                      textTransform: 'capitalize'
                    }}>
                      {trip.category}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: '#f8f9fa',
            borderRadius: '12px',
            border: '1px solid #e1e5e9'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#333',
              marginBottom: '12px'
            }}>
              Legend
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {['adventure', 'cultural', 'relaxation', 'business', 'family'].map(category => (
                <div
                  key={category}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '4px',
                    background: getTripColor(category)
                  }} />
                  <span style={{
                    fontSize: '14px',
                    color: '#666',
                    textTransform: 'capitalize'
                  }}>
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
