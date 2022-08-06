import React from 'react'
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Footer from '../../components/Footer.jsx';
import ItemCategories from '../../components/ItemCategories.jsx';
import Navigation from '../../components/Navigation.jsx';
import AppContext from "../../context/appContext.jsx";
import ItemCard from './ItemCard.jsx';

function Feed() {
  const { setPosts, isAuth } = useContext(AppContext);
  return (
    <div className='feed'>
      <Navigation />
      <ItemCategories />
      <header>
        <a href="">back to home</a>
        <h1>item feed</h1>
        <label htmlFor="filter">filter</label>
        <select name="filter" id="filter">
          <option value="household">Household</option>
          <option value="electronic">Electronic</option>
          <option value="misc">Misc</option>
        </select>
      </header>
      <div className="items-card-container">
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <button>View More</button>
      <Footer />
    </div>
  )
}

export default Feed


