import React, {useState} from "react";
import axios from 'axios';
import './WeatherApp.css'

const WeatherApp =()=>{
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState('');
 

  const fetchData =(city)=>{
    const API_KEY = "246c2956423a4a9ab0e144605250301";
    axios.get(` http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`)
    .then((response)=>{
      setWeatherData(response.data)
      console.log(response.data);
      
      setError('')
    }).catch((err)=>{
      setError('City is not Found')
      setWeatherData(null)
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    fetchData(city)
  }

  const handleReset =()=>{
    return(
      setCity('')
    )
  }

  return(
      <div className="weather-app">

        <div className="weather-card-container">
          <div className="weather-icon">
            <img className="weather_img" src={weatherData && weatherData.current.condition.icon} width="150px" alt="" />
          </div>
          {weatherData && 
            <div className="weather-card">
              <p className="weather-temp">{weatherData.current.temp_c} °C</p>
              <div className="weather-location">
                <p className="weather-country">{weatherData.location.country}</p>
                <p className="weather-region">{weatherData.location.region}</p>
              </div>
              <div className="weather-condition">
                <p className="weather-condition-text">{weatherData.current.condition.text}</p>
                <small className="weather-condition-humidity">Humidity: {weatherData.current.humidity}</small>
                <span>Wind: {weatherData.current.wind_kph} km/h</span>
              </div>
            </div>
          }
        </div>
          <div className='search-form-container'>
            <form className='search-form' onSubmit={handleSubmit}>
              <input
                type="text"
              value={city}
              placeholder='Enter City'
              onChange={(e)=>{setCity(e.target.value)}}
              />

              <button type='submit' >Search</button>
              <button onClick={handleReset}>Reset</button>
              

            </form>
            
          </div>
          
      </div>
      
  )
}

export default WeatherApp;