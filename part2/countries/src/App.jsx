import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  
  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const countryNames = response.data.map(countryInfo => countryInfo.name.common)
        setAllCountries(countryNames)
      })
  }, [])

  useEffect(() => {
    if (filteredCountries.length === 1) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filteredCountries[0]}`)
        .then(response => {
          console.log(response.data)
        })
    }
  }, [filteredCountries])

  const handleCountryChange = (event) => {
    setCurrentCountry(event.target.value)
    setFilteredCountries(allCountries.filter(country => country.toLowerCase().includes(event.target.value)))
  }


  return (
    <>
      <p>find countries</p>
      <input onChange={handleCountryChange} value={currentCountry} />
      {filteredCountries.length <= 10 && filteredCountries.length > 0
        ? filteredCountries.map(c => <p key={c}>{c}</p>)
        : <p>Too many matches, specify another filter</p>
      }
    </>
  )
}

export default App
