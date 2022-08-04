import React from 'react'
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Footer from '../../components/Footer.jsx';
import ItemCategories from '../../components/ItemCategories.jsx';
import Navigation from '../../components/Navigation.jsx';
import AppContext from "../../context/appContext.jsx";

function Feed({ setIsAuth }) {
  const { setPosts, isAuth } = useContext(AppContext);

  return (
    <>
      <Navigation />
      <ItemCategories />
      <Footer/>
    </>
  )
}

export default Feed