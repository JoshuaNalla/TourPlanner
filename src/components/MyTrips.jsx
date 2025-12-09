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

  return (
    <div>
      <h1>My Trips</h1>
      {trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <ul>
          {trips.map(trip => (
            <li key={trip.id}>
              <h2>{trip.title}</h2>
              <p>{trip.description}</p>
              <p>Destination: {trip.destination}</p>
              <p>Dates: {trip.startDate} – {trip.endDate}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
