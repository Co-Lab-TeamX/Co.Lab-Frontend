import AppContext from "../../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react"

function Homepage() {
  const { user, setIsAuth, setUser, isAuth } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    setUser({});
    setIsAuth(false);
    window.localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="homepage">Homepage</div>
      <button onClick={handleLogOut}>Log-out</button>
    </>
  );
}

export default Homepage;
/* 

        

*/
