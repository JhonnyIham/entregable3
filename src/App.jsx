import { useEffect, useRef, useState } from 'react'
import './App.css'
import useFetch from './hooks/useFetch'
import LocationCard from './components/LocationCard'
import ResidentCard from './components/ResidentCard'
import Pagination from './components/Pagination'

function App() {

  const [location, getLocation, isLoading, hasError] = useFetch()
  const [search, setSearch] = useState(Math.floor(Math.random()*126 +1));
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (search) {
        const url = `https://rickandmortyapi.com/api/location/${search}`
        getLocation(url)
    }
  }, [search])

  const textInput = useRef()

  const handleSubmit = event => {
    event.preventDefault();
    setSearch(textInput.current.value.trim())
    event.target.reset();
  }

  const quantity = 5
  const second = currentPage * quantity
  const firs = second - quantity
  const residentsPart = location && location.residents.slice(firs,second);
  const totalPage = Math.ceil((location && location.residents.length) /quantity)
  
  return (
    <div className='app'>
      <header className='app__header'>
        <img src="../assets/titleHeader.png" alt="titleheader" className='app__header__title'/>
      </header>
      {
        isLoading?
          <h2>Loading....</h2>
        :
        <>
          <form onSubmit={handleSubmit} className='app__form'>
            <input 
              className='app__text'
              type="number" 
              ref={textInput} 
              placeholder='type a number (1 to 126)'
            />
            <button className='app__btn'>Search</button>
          </form>
          {
            hasError || search==0 ?
              <h2 className='hasError'>❌Hey! you must provide an id from 1 to 126 😢</h2>
            :
              <>
                  <Pagination
                     currentPage = {currentPage}
                     setCurrentPage = {setCurrentPage}
                     totalPage = {totalPage}
                  />
                <LocationCard
                  location = {location} 
                />
                <div className='app__container'>
                  {
                    residentsPart.map(resident => (
                      <ResidentCard
                        key = {resident}
                        resident = {resident}
                      />
                    ))
                  }
                </div>
                <Pagination
                   currentPage = {currentPage}
                   setCurrentPage = {setCurrentPage}
                   totalPage = {totalPage}
                />
              </>
          }

        </>
      }
      
    </div>
  )
}

export default App
