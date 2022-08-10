import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ItemsDetail from "./pages/itemsDetail/ItemsDetail";
import NewLogin from "./pages/login/NewLogin";
import Register from "./pages/register/Register";
import ZoFeed from "./pages/zoFeed/ZoFeed";

function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn")

  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<NewLogin />} />
        <Route path="/feed" element={<ZoFeed />} />
        <Route path="/details/:post_id" element={<ItemsDetail />} />
      </Routes>
    </div>
  );
}


export default App;
