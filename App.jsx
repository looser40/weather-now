
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios, { Axios } from 'axios'


function App() {
  const [City, setCity] = useState('kochi')
  const [Temperature, setTemperature] = useState(0)
  const [SearchResults, setSearchResults] = useState([])

    useEffect(()=> {
    let latitude;
    let longitude;
    if(City=== 'kochi'){
      latitude=9.939093
     longitude=76.270523
     }
     else if(City=== 'kozhikode'){
      latitude=11.2588
      longitude=75.7804
     }
     else if(City=== 'palakkad'){
      latitude=10.7867
      longitude=76.6548
     }
     else {
      latitude=13.0827
      longitude=80.2707
     }
  
    axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
    .then(res => setTemperature(res.data.current.temperature_2m))
    .catch(error => console.log(error))

  },[City]
    )
    function handleSearch(e) {
      e.preventDefault()
      const form = e.target
      const searchKeyword = form['search'].value


      const apiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${searchKeyword}&count=10&language=en&format=json`
       axios.get(apiUrl)
      .then(res => setSearchResults(res.data.results))
      .catch(error => console.log(error))
     


    }
  
     
    
  
  
  return (
    <>
        <header className='h-16 py-4 bg-blue-500'>
     <div className='container mx-auto px-5 text-center'> <span className=' text-lg font-bold text-white '>WeatherNow</span></div>
     </header>
     <main>
      <section className='py-16 flex flex-col justify-center items-center '>
      <h1 className='3xl'>CURRENT WEATHER AT {City} IS <span className='font-bold text-5xl text-red-400'>{Temperature}</span>{'\u00b0'}C</h1>
      <div className=' mt-8 flex flex-row gap-4'>
        <button onClick={() => setCity('kochi')}className='h-10 px-6 border-green-800 border rounded text-green-600 font-bold'>kochi</button>
        <button onClick={() => setCity('kozhikode')}className='h-10 px-6 border-green-800 border rounded text-red-600 font-bold'>kozhikode</button>
        <button onClick={() => setCity('palakkad')}className='h-10 px-6 border-green-800 border rounded text-blue-600 font-bold'>palakkad</button>
        <button onClick={() => setCity('chennai')}className='h-10 px-6 border-green-800 border rounded text-yellow-600 font-bold'>chennai</button>
        </div>
        <form onSubmit={handleSearch} className='mt-8 flex flex-col items-center' action="#">
          <label htmlFor="search">Search city:</label>
          <div className='mt-4 flex flex-row items-center gap-4'>
          <input className='border border-green-700' type="text" id='search' />
        
          <button className='bg-green-800 px-6 PY-2 text-white'>Search</button>
          
          </div>
        </form>
        <ul>
          {
            SearchResults.map((result, index) => {
              return (
                <li className='p-2 flex flex-row gap-6 border rounded ' key={index}><h3>{result.name}</h3><span>{result.country}</span><span>{result.admin2}</span></li>
              )
              
            }

            )
          }
        </ul>
        
    </section>
     </main>
    </>
  )
}

export default App
