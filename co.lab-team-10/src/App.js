import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/appContext";
import Homepage from "./pages/homepage/Homepage";
import ItemsDetail from "./pages/itemsDetail/ItemsDetail";
import NewLogin from "./pages/login/NewLogin";
import Register from "./pages/register/Register";
import ZoFeed from "./pages/zoFeed/ZoFeed";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  const { isAuth, setIsAuth } = useContext(AppContext)
  const checkAuthenticated = async () => {
    let localToken = window.localStorage.getItem("token");
    try {
      const res = await fetch(`http://localhost:9001/is-verify`, {
        method: "GET",
        headers: {
          token: localToken,
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

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<NewLogin />} />
        <Route path="/feed" element={<ZoFeed />} />
        <Route path="/details/:post_id" element={isAuth ? <ItemsDetail /> : <NewLogin/>} />
      </Routes>
    </div>
  );
}


export default App;
