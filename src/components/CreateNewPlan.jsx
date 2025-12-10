import React, { useState, useRef, useEffect } from 'react'
import { MapPin, Plane, Home, Settings, ArrowLeft, MessageCircle, Send, Search} from 'lucide-react'

const CreateNewPlan = ({ goToHome }) => {
  const [activeTab, setActiveTab] = useState('overview')
  // variables declared here
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

  //---------flight stuff

// Add these with your other state declarations (around line 28)
const [availableFlights, setAvailableFlights] = useState([])
const [selectedFlight, setSelectedFlight] = useState(null)
const [loadingFlights, setLoadingFlights] = useState(false)
const [flightError, setFlightError] = useState('')
//---------------

  //++++++++++++++AI portion starts here++++++++++++++
  // Chat state
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your AI travel assistant. I can help you plan your trip, suggest destinations, activities, and answer any questions about your travel plans. What would you like to know?"
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const chatContainerRef = useRef(null)

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Get trip context for AI
  const getTripContext = () => {
    return {
      tripTitle,
      destination,
      startDate,
      endDate,
      description,
      category,
      transportationType,
      departureLocation,
      arrivalLocation,
      accommodationType,
      accommodationName,
      budget,
      currency
    }
  }


//   // Send message to AI
//   const sendMessage = async () => {
//     if (!inputMessage.trim() || isLoading) return

//     const userMessage = inputMessage.trim()
//     setInputMessage('')
    
//     // Add user message to chat
//     const newMessages = [...messages, { role: 'user', content: userMessage }]
//     setMessages(newMessages)
//     setIsLoading(true)

//     try {
//       // Get trip context
//       const tripContext = getTripContext()
      
//       // Prepare the prompt with context
//       const contextPrompt = `You are a helpful AI travel assistant. The user is planning a trip with the following details:
// ${tripContext.tripTitle ? `Trip Title: ${tripContext.tripTitle}` : ''}
// ${tripContext.destination ? `Destination: ${tripContext.destination}` : ''}
// ${tripContext.startDate ? `Start Date: ${tripContext.startDate}` : ''}
// ${tripContext.endDate ? `End Date: ${tripContext.endDate}` : ''}
// ${tripContext.description ? `Description: ${tripContext.description}` : ''}
// ${tripContext.category ? `Category: ${tripContext.category}` : ''}
// ${tripContext.transportationType ? `Transportation: ${tripContext.transportationType}` : ''}
// ${tripContext.budget ? `Budget: ${tripContext.currency} ${tripContext.budget}` : ''}

// User's question: ${userMessage}

// Please provide a helpful, friendly response about their trip planning.`

//       // TODO: Replace this with your actual GPT/AI API endpoint
//       // Example API call structure:
//       // done?
//       console.log("sending message...");
//       const response = await fetch('http://localhost:8080/api/ai/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: userMessage,
//           context: tripContext,
//           conversationHistory: newMessages.slice(-5)
//         })
//       })
//       console.log("response:", response);
//       if (!response.ok) {
//         throw new Error('Failed to get AI response')
//       }

//       const data = await response.json()
//       const aiResponse = data.response || data.message || "I'm sorry, I couldn't process that request. Please try again."

//       setMessages([...newMessages, { role: 'assistant', content: aiResponse }])
//     } catch (error) {
//       console.error('Error sending message:', error)
//       // Fallback response if API is not available
//       const fallbackResponse = `I understand you're asking about "${userMessage}". As your AI travel assistant, I'm here to help! 

// However, I notice the AI service isn't currently connected. To enable full AI assistance, please configure your GPT wrapper API endpoint at 'http://localhost:8080/api/ai/chat'.

// In the meantime, I can help you think through your trip planning. What specific aspect would you like to discuss?`
      
//       setMessages([...newMessages, { role: 'assistant', content: fallbackResponse }])
//     } finally {
//       setIsLoading(false)
//     }
//   }

// send message version 2:
// Send message to AI
const sendMessage = async () => {
  if (!inputMessage.trim() || isLoading) return

  const userMessage = inputMessage.trim()
  setInputMessage('')
  
  // Add user message to chat
  const newMessages = [...messages, { role: 'user', content: userMessage }]
  setMessages(newMessages)
  setIsLoading(true)

  try {
    // Get trip context
    const tripContext = getTripContext()
    
    console.log("Sending to backend:", {
      message: userMessage,
      context: tripContext,
      conversationHistory: newMessages.slice(-5)
    });

    const response = await fetch('http://localhost:8080/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: userMessage,
        context: tripContext,
        conversationHistory: newMessages.slice(-5)
      })
    })

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    // Get the response text first to see what we're receiving
    const responseText = await response.text();
    console.log("Response text:", responseText);

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${responseText}`)
    }

    // Parse the JSON
    const data = JSON.parse(responseText);
    console.log("Parsed data:", data);
    
    const aiResponse = data.response || data.message || "I'm sorry, I couldn't process that request. Please try again."

    setMessages([...newMessages, { role: 'assistant', content: aiResponse }])
  } catch (error) {
    console.error('Full error details:', error)
    
    // Fallback response with more details
    const fallbackResponse = `I'm having trouble connecting to the AI service.

**Error:** ${error.message}

**Please check:**
1. Is your Spring Boot backend running on http://localhost:8080?
2. Check the browser console for detailed error messages
3. Check your Spring Boot console for error logs

Try asking your question again in a moment.`
    
    setMessages([...newMessages, { role: 'assistant', content: fallbackResponse }])
  } finally {
    setIsLoading(false)
  }
}
  //++++++++++++++AI portion ends here++++++++++++++

  //-----FLIGHT FUNCTION HERE
  // Add these functions before sendMessage (around line 90)

// Fetch ICAO codes for cities
const fetchIcaoCode = async (cityName) => {
  try {
    const response = await fetch(`http://localhost:8080/api/flights/airports?city=${encodeURIComponent(cityName)}`)
    if (!response.ok) throw new Error('Failed to fetch airport info')
    
    const airports = await response.json()
    if (airports && airports.length > 0) {
      return airports[0].icao || airports[0].iata_code
    }
    return null
  } catch (error) {
    console.error('Error fetching ICAO code:', error)
    return null
  }
}

// Search for available flights
const searchFlights = async () => {
  if (!departureLocation || !arrivalLocation) {
    setFlightError('Please enter both departure and arrival locations')
    return
  }

  setLoadingFlights(true)
  setFlightError('')
  setAvailableFlights([])

  try {
    // First, get ICAO codes for both cities
    const depIcao = await fetchIcaoCode(departureLocation)
    const arrIcao = await fetchIcaoCode(arrivalLocation)

    if (!depIcao || !arrIcao) {
      setFlightError('Could not find airport codes for the specified cities')
      setLoadingFlights(false)
      return
    }

    // Now fetch flights
    const response = await fetch(
      `http://localhost:8080/api/flights?depIcao=${depIcao}&arrIcao=${arrIcao}`
    )

    if (!response.ok) throw new Error('Failed to fetch flights')

    const flights = await response.json()
    
    if (flights && flights.length > 0) {
      setAvailableFlights(flights)
    } else {
      setFlightError('No flights found for this route')
    }
  } catch (error) {
    console.error('Error searching flights:', error)
    setFlightError('Error loading flights. Please try again.')
  } finally {
    setLoadingFlights(false)
  }
}

// Handle flight selection
const handleSelectFlight = (flight) => {
  setSelectedFlight(flight)
  
  // Auto-fill travel details from selected flight
  if (flight.departure) {
    setDepartureLocation(flight.departure.airport || departureLocation)
  }
  if (flight.arrival) {
    setArrivalLocation(flight.arrival.airport || arrivalLocation)
  }
}
//-----------FLIGHT ENDS HERE
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapPin },
    { id: 'travel', label: 'Travel', icon: Plane },
    { id: 'housing', label: 'Housing', icon: Home },
    { id: 'logistics', label: 'Logistics', icon: Settings }
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
    <div className="create-plan-container" style={{ 
      display: 'flex', 
      gap: '24px', 
      alignItems: 'flex-start',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '40px 20px'
    }}>
      {/* Main Form Content */}
      <div className="card fade-in-up create-plan-card" style={{ flex: '1', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '32px 32px 24px' }}>
          {goToHome && (
            <button
              onClick={goToHome}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                background: 'rgba(102, 126, 234, 0.1)',
                border: '2px solid rgba(102, 126, 234, 0.2)',
                borderRadius: '12px',
                color: '#667eea',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.2)'
                e.currentTarget.style.transform = 'translateX(-4px)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'rgba(102, 126, 234, 0.1)'
                e.currentTarget.style.transform = 'translateX(0)'
              }}
            >
              <ArrowLeft size={18} />
              Back
            </button>
          )}
          <h1 className="create-plan-title" style={{ flex: 1, textAlign: goToHome ? 'center' : 'left', margin: 0 }}>
            Create New Plan
          </h1>
          {goToHome && <div style={{ width: '100px' }}></div>}
        </div>
        
        {/* Tabs */}
        <div className="create-plan-tabs">
          {tabs.map(tab => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                className={`create-plan-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={18} style={{ marginRight: '8px' }} />
                {tab.label}
              </button>
            )
          })}
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
                    <div className="overview-summary-item clickable" onClick={() => handleNavigateToTab('travel')}>
  <span className="overview-label">Selected Flight:</span>
  <span className="overview-value">
    {selectedFlight 
      ? `${selectedFlight.airline?.name || 'Unknown'} - ${selectedFlight.flight?.iata || 'N/A'}`
      : 'Not selected'}
  </span>
</div>
                    <button 
                      className="overview-edit-link"
                      onClick={() => handleNavigateToTab('travel')}
                    >
                      Edit
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

          {/* {activeTab === 'travel' && (
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
          )} */}
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
      
      {/* Flight Search Section */}
      {transportationType === 'flight' && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
          padding: '24px',
          borderRadius: '12px',
          marginBottom: '20px',
          border: '2px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            marginBottom: '16px',
            color: '#667eea'
          }}>
            Search Available Flights
          </h3>
          
          <div className="form-group">
            <label className="form-label">Departure City</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., New York, London"
              value={departureLocation}
              onChange={(e) => setDepartureLocation(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Arrival City</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g., Paris, Tokyo"
              value={arrivalLocation}
              onChange={(e) => setArrivalLocation(e.target.value)}
            />
          </div>
          
          <button
            onClick={searchFlights}
            disabled={loadingFlights || !departureLocation || !arrivalLocation}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              background: loadingFlights ? '#ccc' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              color: 'white',
              fontWeight: '600',
              cursor: loadingFlights ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
              justifyContent: 'center'
            }}
          >
            <Search size={18} />
            {loadingFlights ? 'Searching...' : 'Search Flights'}
          </button>
          
          {flightError && (
            <div style={{
              marginTop: '12px',
              padding: '12px',
              background: '#fee',
              border: '1px solid #fcc',
              borderRadius: '8px',
              color: '#c33',
              fontSize: '14px'
            }}>
              {flightError}
            </div>
          )}
          
          {/* Available Flights List */}
          {availableFlights.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                marginBottom: '12px',
                color: '#333'
              }}>
                Available Flights ({availableFlights.length})
              </h4>
              <div style={{
                maxHeight: '400px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {availableFlights.map((flight, index) => (
                  <div
                    key={index}
                    onClick={() => handleSelectFlight(flight)}
                    style={{
                      padding: '16px',
                      background: selectedFlight === flight ? 'rgba(102, 126, 234, 0.1)' : 'white',
                      border: selectedFlight === flight ? '2px solid #667eea' : '2px solid #e1e5e9',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      if (selectedFlight !== flight) {
                        e.currentTarget.style.borderColor = '#667eea'
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedFlight !== flight) {
                        e.currentTarget.style.borderColor = '#e1e5e9'
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = 'none'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: '16px', 
                          fontWeight: '600', 
                          color: '#333',
                          marginBottom: '8px'
                        }}>
                          {flight.airline?.name || 'Unknown Airline'}
                        </div>
                        <div style={{ 
                          fontSize: '14px', 
                          color: '#666',
                          marginBottom: '4px'
                        }}>
                          Flight: {flight.flight?.iata || flight.flight?.icao || 'N/A'}
                        </div>
                        <div style={{ 
                          fontSize: '13px', 
                          color: '#888',
                          display: 'flex',
                          gap: '16px',
                          marginTop: '8px'
                        }}>
                          <span>
                            <strong>From:</strong> {flight.departure?.airport || departureLocation}
                          </span>
                          <span>→</span>
                          <span>
                            <strong>To:</strong> {flight.arrival?.airport || arrivalLocation}
                          </span>
                        </div>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        background: flight.flight_status === 'scheduled' ? '#d4edda' : '#fff3cd',
                        color: flight.flight_status === 'scheduled' ? '#155724' : '#856404',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: '600',
                        textTransform: 'capitalize'
                      }}>
                        {flight.flight_status || 'Unknown'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {selectedFlight && (
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: '#d4edda',
              border: '1px solid #c3e6cb',
              borderRadius: '8px',
              color: '#155724',
              fontSize: '14px'
            }}>
              ✓ Flight selected: {selectedFlight.airline?.name} - {selectedFlight.flight?.iata}
            </div>
          )}
        </div>
      )}
      
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
            <button 
              className="btn btn-secondary"
              onClick={goToHome}
            >
              Cancel
            </button>
            <button className="btn btn-primary">Save Plan</button>
          </div>
        </div>
      </div>

      {/* Chat Box Sidebar */}
      <div
        ref={chatContainerRef}
        style={{
          width: '400px',
          height: 'calc(100vh - 80px)',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'sticky',
          top: '40px'
        }}
      >
        {/* Chat Header */}
        <div
          style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <MessageCircle size={20} />
          <span style={{ fontWeight: '600', fontSize: '16px' }}>AI Travel Assistant</span>
        </div>

        {/* Messages Container */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: '#f8f9fa'
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div
                style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: message.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  background: message.role === 'user'
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                    : 'white',
                  color: message.role === 'user' ? 'white' : '#333',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  boxShadow: message.role === 'user' ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '16px 16px 16px 4px',
                  background: 'white',
                  color: '#666',
                  fontSize: '14px'
                }}
              >
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid #e1e5e9',
            background: 'white'
          }}
        >
          <div style={{ display: 'flex', gap: '8px' }}>
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about your trip..."
              style={{
                flex: 1,
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '12px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'none',
                minHeight: '50px',
                maxHeight: '100px',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea'
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e1e5e9'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              style={{
                padding: '12px 20px',
                background: inputMessage.trim() && !isLoading
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#ccc',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                cursor: inputMessage.trim() && !isLoading ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                if (inputMessage.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'scale(1.05)'
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateNewPlan

