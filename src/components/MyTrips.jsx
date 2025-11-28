import {useEffect, useState } from 'react'

export default function MyTrips() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8080/api/test")
      .then(res => res.json())
      .then(json =>setData(json))
      .catch(err => console.error(err))
  }, [])


  const title = data?.title || ""
  const desc = data?.desc || ""

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>My Trips</h1>
      <h2>Test Trip</h2>
      <p><strong>Title: </strong> {title}</p>
      <p><strong>Description: </strong> {desc}</p>
    </div>
  )
}
