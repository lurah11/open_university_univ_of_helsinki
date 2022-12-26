import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import fs from 'fs'

const App = () => {
  const [search,setSearch] = useState('')
  const [country,setCountry] = useState({})
  const [countryList, setCountryList] = useState([])
  const [countryFilter, setCountryFilter] = useState([])
  const [warning,setWarning] = useState('')
 
  const fs = require('fs-extra')
  console.log(fs)

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
    console.log(countryFilter.length)
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
    console.log(countryFilter)
    let tooMuch = <p></p>
    let renderCountry = <p></p>
    let renderCtryList = <p></p>


  if (countryFilter.length > 11 ) {
     tooMuch = <p>{warning}</p>
  }
  else if (countryFilter.length === 1) {
    const ctry = country
    const languages = Object.values(ctry['languages'])
    renderCountry = <div><h2>{ctry.name.common}</h2><p>Capital : {ctry.capital[0]}</p><p>Area : {ctry.area}</p><ul><strong>Languages</strong>{languages.map((lang) => <li key="lang">{lang}</li>)}</ul><div><img alt={ctry.name.common} width="300px" height="200px" src={ctry.flags.svg} /></div></div>
  }
  else {
    const ctrylist = [...countryFilter]
    renderCtryList = <div><ul>{ctrylist.map(ctry => <li key={ctry.name.common}>{ctry.name.common}<button value={ctry.name.official} onClick={handleClick}>show</button></li>)}</ul></div>
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
      </div>  
    </div>
  ) 
  
     
   
  }
    
 





export default App;
