import React, { useState } from 'react'

const CreateNewPlan = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Overview state
  const [tripTitle, setTripTitle] = useState('')
  const [destination, setDestination] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  
  // Travel state
  const [transportationType, setTransportationType] = useState('')
  const [departureLocation, setDepartureLocation] = useState('')
  const [arrivalLocation, setArrivalLocation] = useState('')
  const [departureDateTime, setDepartureDateTime] = useState('')
  const [arrivalDateTime, setArrivalDateTime] = useState('')
  const [numberOfTravelers, setNumberOfTravelers] = useState('')
  const [travelNotes, setTravelNotes] = useState('')
  
  // Housing state
  const [accommodationType, setAccommodationType] = useState('')
  const [accommodationName, setAccommodationName] = useState('')
  const [address, setAddress] = useState('')
  const [checkInDate, setCheckInDate] = useState('')
  const [checkOutDate, setCheckOutDate] = useState('')
  const [numberOfRooms, setNumberOfRooms] = useState('')
  const [accommodationNotes, setAccommodationNotes] = useState('')
  
  // Logistics state
  const [budget, setBudget] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [emergencyContact, setEmergencyContact] = useState('')
  const [emergencyPhone, setEmergencyPhone] = useState('')
  const [importantDocuments, setImportantDocuments] = useState('')
  const [additionalNotes, setAdditionalNotes] = useState('')

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'travel', label: 'Travel' },
    { id: 'housing', label: 'Housing' },
    { id: 'logistics', label: 'Logistics' }
  ]

  const handleNavigateToTab = (tabId) => {
    setActiveTab(tabId)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'Not set'
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })
  }

  return (
    <div className="create-plan-container">
      <div className="card fade-in-up create-plan-card">
        <h1 className="create-plan-title">
          Create New Plan
        </h1>
        
        {/* Tabs */}
        <div className="create-plan-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`create-plan-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="create-plan-content">
          {activeTab === 'overview' && (
            <div className="create-plan-section">
              <h2 className="create-plan-section-title">Trip Overview</h2>
              
              {/* Basic Trip Information */}
              <div className="create-plan-form">
                <div className="form-group">
                  <label className="form-label">Trip Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter trip title"
                    value={tripTitle}
                    onChange={(e) => setTripTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Destination</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter destination"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Start Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">End Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="Describe your trip..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select category</option>
                    <option value="adventure">Adventure</option>
                    <option value="cultural">Cultural</option>
                    <option value="relaxation">Relaxation</option>
                    <option value="business">Business</option>
                    <option value="family">Family</option>
                  </select>
                </div>
              </div>

              {/* Summary Sections - Clickable */}
              <div className="overview-summary">
                {/* Travel Summary */}
                <div className="overview-summary-section">
                  <div className="overview-summary-header">
                    <h3 className="overview-summary-title">Travel Details</h3>
                    <button 
                      className="overview-edit-link"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      Edit →
                    </button>
                  </div>
                  <div className="overview-summary-content">
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      <span className="overview-label">Transportation:</span>
                      <span className="overview-value">{transportationType || 'Not set'}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      <span className="overview-label">Route:</span>
                      <span className="overview-value">
                        {departureLocation || 'Not set'} → {arrivalLocation || 'Not set'}
                      </span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      <span className="overview-label">Departure:</span>
                      <span className="overview-value">{formatDateTime(departureDateTime)}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      <span className="overview-label">Arrival:</span>
                      <span className="overview-value">{formatDateTime(arrivalDateTime)}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      <span className="overview-label">Travelers:</span>
                      <span className="overview-value">{numberOfTravelers || 'Not set'}</span>
                    </div>
                  </div>
                </div>

                {/* Housing Summary */}
                <div className="overview-summary-section">
                  <div className="overview-summary-header">
                    <h3 className="overview-summary-title">Housing Details</h3>
                    <button 
                      className="overview-edit-link"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      Edit →
                    </button>
                  </div>
                  <div className="overview-summary-content">
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      <span className="overview-label">Type:</span>
                      <span className="overview-value">{accommodationType || 'Not set'}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      <span className="overview-label">Name:</span>
                      <span className="overview-value">{accommodationName || 'Not set'}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      <span className="overview-label">Address:</span>
                      <span className="overview-value">{address || 'Not set'}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      <span className="overview-label">Check-in:</span>
                      <span className="overview-value">{formatDate(checkInDate)}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      <span className="overview-label">Check-out:</span>
                      <span className="overview-value">{formatDate(checkOutDate)}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('housing')}
                    >
                      <span className="overview-label">Rooms:</span>
                      <span className="overview-value">{numberOfRooms || 'Not set'}</span>
                    </div>
                  </div>
                </div>

                {/* Logistics Summary */}
                <div className="overview-summary-section">
                  <div className="overview-summary-header">
                    <h3 className="overview-summary-title">Logistics</h3>
                    <button 
                      className="overview-edit-link"
                      onClick={() => handleNavigateToTab('logistics')}
                    >
                      Edit →
                    </button>
                  </div>
                  <div className="overview-summary-content">
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('logistics')}
                    >
                      <span className="overview-label">Budget:</span>
                      <span className="overview-value">
                        {budget ? `${currency} ${parseFloat(budget).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Not set'}
                      </span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('logistics')}
                    >
                      <span className="overview-label">Emergency Contact:</span>
                      <span className="overview-value">{emergencyContact || 'Not set'}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('logistics')}
                    >
                      <span className="overview-label">Emergency Phone:</span>
                      <span className="overview-value">{emergencyPhone || 'Not set'}</span>
                    </div>
                    <div 
                      className="overview-summary-item clickable"
                      onClick={() => handleNavigateToTab('logistics')}
                    >
                      <span className="overview-label">Documents:</span>
                      <span className="overview-value">{importantDocuments || 'Not set'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'travel' && (
            <div className="create-plan-section">
              <h2 className="create-plan-section-title">Travel Details</h2>
              <div className="create-plan-form">
                <div className="form-group">
                  <label className="form-label">Transportation Type</label>
                  <select 
                    className="form-input"
                    value={transportationType}
                    onChange={(e) => setTransportationType(e.target.value)}
                  >
                    <option value="">Select transportation</option>
                    <option value="flight">Flight</option>
                    <option value="train">Train</option>
                    <option value="car">Car</option>
                    <option value="bus">Bus</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Departure Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter departure location"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Arrival Location</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter arrival location"
                    value={arrivalLocation}
                    onChange={(e) => setArrivalLocation(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Departure Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="form-input"
                      value={departureDateTime}
                      onChange={(e) => setDepartureDateTime(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Arrival Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="form-input"
                      value={arrivalDateTime}
                      onChange={(e) => setArrivalDateTime(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Travelers</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Enter number of travelers" 
                    min="1"
                    value={numberOfTravelers}
                    onChange={(e) => setNumberOfTravelers(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Travel Notes</label>
                  <textarea 
                    className="form-textarea" 
                    rows="3" 
                    placeholder="Any additional travel notes..."
                    value={travelNotes}
                    onChange={(e) => setTravelNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'housing' && (
            <div className="create-plan-section">
              <h2 className="create-plan-section-title">Housing Details</h2>
              <div className="create-plan-form">
                <div className="form-group">
                  <label className="form-label">Accommodation Type</label>
                  <select 
                    className="form-input"
                    value={accommodationType}
                    onChange={(e) => setAccommodationType(e.target.value)}
                  >
                    <option value="">Select accommodation type</option>
                    <option value="hotel">Hotel</option>
                    <option value="airbnb">Airbnb</option>
                    <option value="hostel">Hostel</option>
                    <option value="resort">Resort</option>
                    <option value="apartment">Apartment</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Accommodation Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter accommodation name"
                    value={accommodationName}
                    onChange={(e) => setAccommodationName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Address</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Check-in Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Check-out Date</label>
                    <input 
                      type="date" 
                      className="form-input"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Number of Rooms</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Enter number of rooms" 
                    min="1"
                    value={numberOfRooms}
                    onChange={(e) => setNumberOfRooms(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Accommodation Notes</label>
                  <textarea 
                    className="form-textarea" 
                    rows="3" 
                    placeholder="Any additional accommodation notes..."
                    value={accommodationNotes}
                    onChange={(e) => setAccommodationNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logistics' && (
            <div className="create-plan-section">
              <h2 className="create-plan-section-title">Logistics</h2>
              <div className="create-plan-form">
                <div className="form-group">
                  <label className="form-label">Budget</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="Enter total budget" 
                    min="0" 
                    step="0.01"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select 
                    className="form-input"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="AUD">AUD (A$)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Contact</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter emergency contact name"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Emergency Phone</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="Enter emergency phone number"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Important Documents</label>
                  <textarea 
                    className="form-textarea" 
                    rows="3" 
                    placeholder="List important documents needed (passport, visa, etc.)"
                    value={importantDocuments}
                    onChange={(e) => setImportantDocuments(e.target.value)}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Additional Notes</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="Any additional logistics notes..."
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="create-plan-actions">
            <button className="btn btn-secondary">Cancel</button>
            <button className="btn btn-primary">Save Plan</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPlan

