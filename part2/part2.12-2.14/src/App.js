import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'


const App = () => {
  const [search,setSearch] = useState('')
  const [country,setCountry] = useState({})
  const [countryList, setCountryList] = useState([])
  const [countryFilter, setCountryFilter] = useState([])
  const [warning,setWarning] = useState('')
  const [weather,setWeather] = useState('')
 
  const api_key = process.env.REACT_APP_APIKEY

  useEffect(()=> {
    axios.get('http://localhost:3001/countries').then(response=>{
      setCountryList(response.data)
    })
  },[])

  const handleChange = (event) => {
      const searchTerm = event.target.value 
      setSearch(searchTerm)
      
      const numCountries = countryList.filter(country=>
    country.name.common.includes(searchTerm)
  )
    setCountryFilter(numCountries)
    if ((numCountries.length > 1 && numCountries.length < 11) || numCountries.length === 0 ) {
        console.log("agus")
        setCountryFilter(numCountries)
    }
    else if (numCountries.length > 11 ) {
      console.log("batu")
      setWarning("Too much results to show, query should be more specific")
    }
    else {
      console.log("bara")
      setCountry(numCountries[0])
    }
    
  }
  
  const handleClick = (event) => {
    
    const numCountries = countryList.filter(country => country.name.official === event.target.value)
    setCountry(numCountries[0])
    setCountryFilter(numCountries)
  
    
  }
    
    let tooMuch = <p></p>
    let renderCtryList = <p></p>
    let renderCountry = <p></p>
    let renderWeather = <p></p>
    
    const getWeather = async (url) => {
      const weatherdata = await fetch(url)
      .then((response)=>response.json())
      .then((data)=>data)   
    
      const icon_id = weatherdata["weather"][0]["icon"]
      
      const url_icon = `https://openweathermap.org/img/wn/${icon_id}@2x.png`
      const icon_data = await fetch(url_icon)
      .then((response)=>response.blob())
      .then((image)=>{
        const data_url = URL.createObjectURL(image)
        return data_url
      })
      weatherdata['icon'] = icon_data
      setWeather(weatherdata)
      
    }


    useEffect(()=>{
      
      if (Object.keys(country).length == 0 ) {
        
        setWeather({})
      }
      else {
        console.log("siap agusss")
        
        const ctry = {...country}
        const [lat,lon] = ctry.latlng
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
        const weatherdata = getWeather(url)
        
       
       
      }

    },[country])  
    console.log(weather)


  if (countryFilter.length > 11 ) {
     tooMuch = <p>{warning}</p>
     let renderCountry = <p></p>
     renderWeather = <p></p>
  }
  // else if (countryFilter.length === 1) {
  //   const ctry = country
    

  //   const languages = Object.values(ctry['languages'])
  //   renderCountry = <div><h2>{ctry.name.common}</h2><p>Capital : {ctry.capital[0]}</p><p>Area : {ctry.area}</p><ul><strong>Languages</strong>{languages.map((lang) => <li key="lang">{lang}</li>)}</ul><div><img alt={ctry.name.common} width="300px" height="200px" src={ctry.flags.svg} /></div></div>
  // }
  else{
    const ctrylist = [...countryFilter]
    if (ctrylist.length > 1 ){
      renderCtryList = <div><ul>{ctrylist.map(ctry => <li key={ctry.name.common}>{ctry.name.common}<button value={ctry.name.official} onClick={handleClick}>show</button></li>)}</ul></div>
    }
    else {
      renderCtryList = <p></p>
      renderWeather = <p></p>
      const ctry = {...country} 
      const ctryLength = Object.keys(ctry).length
      if (ctryLength==0){
        renderCountry = <p></p>
        
      }
      else {
        const languages = Object.values(ctry['languages'])
        renderCountry = <div><h2>{ctry.name.common}</h2><p>Capital : {ctry.capital[0]}</p><p>Area : {ctry.area}</p><ul><strong>Languages</strong>{languages.map((lang) => <li key="lang">{lang}</li>)}</ul><div><img alt={ctry.name.common} width="300px" height="200px" src={ctry.flags.svg} /></div></div>
        if (Object.keys(weather).length == 0 ) {
          renderWeather = <p></p>
        }
        else {
          renderWeather = <div><h3>Weather in {ctry.capital}</h3><p>temperature : {weather.main.temp} <sup>o</sup>Kelvin</p><img src={weather.icon} /><p>Wind speed is {weather.wind.speed} m/s</p></div>    
        }
        
      }
      
    }
    
  }

  return (
    <div>
      <div>
        Search Country by Name : <input onChange={handleChange}/>
      </div>
      <div>
        {tooMuch}
        {renderCountry}
        {renderCtryList}
        {renderWeather}
      </div>  
    </div>
  ) 
  
     
   
  }
    
 





export default App;
