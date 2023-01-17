import React from 'react'
import MainCarousel from "./MainCarousel.jsx";
import ShoppingList from "./ShoppingList.jsx";
import Subscribe from "./Subscribe.jsx";

const Home = () => {
  return (
    <div className='home'>
      <MainCarousel />
      <ShoppingList/>
      <Subscribe/>
    </div>
  )
}

export default Home

