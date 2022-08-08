import { useContext, useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom";
import AppContext from "./context/appContext";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register"
import Feed from "./pages/feed/Feed"
import ItemDetail from "./pages/itemdetail/Itemdetail"
import ZoFeed from "./pages/zoFeed/ZoFeed";
import NewLogin from "./pages/login/NewLogin";
import ItemsDetail from "./pages/itemsDetail/ItemsDetail";

function App() {
  const { isAuth, setIsAuth } = useContext(AppContext);

  const checkAuthenticated = async () => {
    let localToken = window.localStorage.getItem("token");
    try {
      // const res = await fetch(`https://colab-free-up.herokuapp.com/is-verify`, {
       const res = await fetch(`http://localhost:4000/is-verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localToken}`,
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      response === true ? setIsAuth(true) : setIsAuth(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  return (
    <div >
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={
          !isAuth ? (
            <NewLogin />
          ) : (
            <Navigate replace to="/" />
          )
        } />
        <Route path="/feed" element={<ZoFeed />} />

        {/* <Route path="/feed" element={
          isAuth ? (
            <Feed setAuth={setAuth} />
          ) : (
            <Navigate replace to="/" />
          )
        } /> */}

        {/* CHANGE PATH TO /itemdetail/:post_id */}
        <Route path="/details/:post_id" element={<ItemsDetail />} />
      </Routes>
    </div>
  );
}


export default App;
