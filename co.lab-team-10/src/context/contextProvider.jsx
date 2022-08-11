import { React, useState, useEffect } from "react";
import AppContext from "./appContext";

const ContextProvider = (props) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const context = {
    user,
    setUser,
    isAuth,
    setIsAuth,
    posts, 
    setPosts
  };

  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default ContextProvider;
