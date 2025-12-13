/*import { useEffect, useState } from 'react'

export default function MyTrips() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch('http://localhost:8080/api/trips/get')
      .then(res => res.json())
      .then(result => {
        console.log("BACKEND RESULT:", result);
        setData(result)
      })
      .catch(err => console.error("FETCH ERROR:", err));
  }, [])

  const title = data?.[0]?.title || ""
  const desc = data?.[0]?.description || ""

  return (
    <div>
      <h1>Trip: {title}</h1>
      <p>Description: {desc}</p>
    </div>
  )
}
*/

import { useEffect, useState } from 'react'
import TripPlanCard from './TripPlanCard'   // import your card component

export default function MyTrips({ userEmail }) {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (userEmail) {
      fetch(`http://localhost:8080/api/trips/mytrips/${userEmail}`)
        .then(res => res.json())
        .then(result => {
          console.log("BACKEND RESULT:", result);
          setTrips(result);
        })
        .catch(err => console.error("FETCH ERROR:", err));
    }
  }, [userEmail]);

  const goToTripDetails = (tripId) => {
    // navigate to trip details page
    // e.g. using React Router: navigate(`/trip/${tripId}`)
    console.log("Go to trip details:", tripId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>My Trips</h1>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          {trips.map(trip => (
            <TripPlanCard 
              key={trip.id} 
              tripPlan={trip} 
              goToTripDetails={() => goToTripDetails(trip.id)} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
