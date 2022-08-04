import React from 'react'
import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import AppContext from "../../context/appContext.jsx";

function Feed({setIsAuth}) {
  const { setPosts, isAuth } = useContext(AppContext);
  console.log(isAuth)
  // return isAuth ? <Navigate to="/login"/> :  (
    return (
    <div>Authorized Feed</div>
  )
}

export default Feed