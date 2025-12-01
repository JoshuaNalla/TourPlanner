import { useEffect, useState } from 'react'

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

