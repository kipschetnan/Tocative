import React from 'react'
import './Search.css'

const Search = () => {
  return (
    <div className='searchContainer'>
      <input type='text' placeholder='Search...' className='search'></input>
      <button className='submit'> Submit </button>
    </div>
  )
}

export default Search