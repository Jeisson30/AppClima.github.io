"use client"
import Image from 'next/image'
import { useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import axios from 'axios'
import Spinner from '../app/components/Spinner'

export default function Home() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)

  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY
  
  //Search

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    axios.get(url)
    .then((res) => {
      setWeather(res.data)
      console.log('Data return => ', JSON.stringify(res.data));
    })
    .catch(error => {
      alert('Error en la consulta')
    });
    setCity('')
    setLoading(false)
  }

  if (loading) {
    return <Spinner />
  } else {
    return (
      <main >
        <div>
          <div style={{ 
            display: "flex",
            backgroundColor: "#f2f2f2",
            padding: "1.5rem",
            borderRadius: "1rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2rem",
            maxWidth: "400px",
            margin: "0 auto"
          }}> 
            <form onSubmit={fetchWeather} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
              <div>
                  <input onChange={(e) => setCity(e.target.value)} type='text' placeholder='Search City ...' value={city} /> 
              </div>
              <div>
                <button onClick={fetchWeather}><BsSearch /></button>
              </div>   
            </form>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: "2rem" }}>
              {/* Target *** */}  

              <p><strong>{weather.name && weather.name}{weather.sys && weather.sys.country && `, ${weather.sys.country}`}</strong></p>{weather.weather && weather.weather[0] && (
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt={weather.weather[0].description}
              />
              )}
              {weather.weather && weather.weather[0] && (
              <p>{weather.weather[0].description}</p>
              )}
              <p> <strong> Temperatura: </strong> { weather.main && Math.round((weather.main.temp - 32) * 5/9)}°C</p>
              <p><strong>Fecha:</strong> {weather.dt ? new Date(weather.dt * 1000).toLocaleDateString() : 'No disponible'}</p>
              <p> <strong>Humedad:</strong> {weather.main && weather.main.humidity}%</p>
              {/* <p><strong>Hora:</strong> {weather.dt ? new Date(weather.dt * 1000).toLocaleTimeString() : 'No disponible'}</p> */}
            </div>
          </div>
        </div>     
      </main>
    )
  }


}
