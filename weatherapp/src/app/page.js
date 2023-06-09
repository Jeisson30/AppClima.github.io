"use client"
import Image from 'next/image'
import { useEffect, useState } from 'react'
import {BsSearch} from 'react-icons/bs'
import axios from 'axios'
import Spinner from '../app/components/Spinner'
import Favorites from './components/Favorites'

export default function Home() {

  const [city, setCity] = useState(process.env.NEXT_PUBLIC_DEFAULT_CITY)
  const [weather, setWeather] = useState({})
  const [loading, setLoading] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [forecast, setForecast] = useState([]);


  const apiKey = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  const handleClearFavorites = () => {
    localStorage.removeItem('favorites');
    setWeather({});
    setForecast([]);
    setFavorites([]);
  };
    
  //Search

  const fetchWeather = (e) => {
    e.preventDefault()
    setLoading(true)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    axios.get(url)
    .then((res) => {
      setWeather(res.data)
      //console.log('Data return => ', JSON.stringify(res.data));
      if (!favorites.some(f => f.name === res.data.name)) {
        setFavorites([...favorites, res.data])
        localStorage.setItem('favorites ', JSON.stringify([...favorites, res.data]))
      }
      fetchForecast()
    })
    .catch(error => {
      alert('Error en la consulta')
    });
    setCity('')
    setLoading(false)
  }

  const fetchForecast = () => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    axios.get(url)
    .then((res) => {
      const forecastData = res.data.list.filter((data, index) => index % 8 === 0);
      setForecast(forecastData);
    })
    .catch((error) => {
      console.log(error);
    });
  };
  

  if (loading) {
    return <Spinner />
  } else {
    return (
      <main className='body'>
        <div className='tarjet'> 
          <form onSubmit={fetchWeather} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "0.5rem" }}>
            <div>
                <input className='input' onChange={(e) => setCity(e.target.value)} type='text' placeholder='Search City ...' value={city} /> 
            </div>
            <div>
              <button className='myButton' onClick={fetchWeather}><BsSearch /></button>
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
        <Favorites favorites={favorites} setWeather={setWeather} />

        {forecast && forecast.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3 style={{ marginBottom: "1rem" }}>Pronóstico para los próximos 5 días</h3>
            <table className='table'>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Temperatura (°C)</th>
                  <th>Humedad (%)</th>
                </tr>
              </thead>
              <tbody>
                {forecast.map((data) => (
                  <tr key={data.dt}>
                    <td>{new Date(data.dt * 1000).toLocaleDateString()}</td>
                    <td>{data.weather && data.weather[0] && <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt={data.weather[0].description} />} {data.weather && data.weather[0] && data.weather[0].description}</td>
                    <td>{data.main && Math.round((data.main.temp - 32) * 5/9)}</td>
                    <td>{data.main && data.main.humidity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='containerButton'>
          <button className='myButton' onClick={handleClearFavorites}>Clear Favorites</button>        
        </div>
      </main>
    )
  }
}
