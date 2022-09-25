import { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AppContext from "./context/appContext";
import AboutPage from "./pages/about/About";
import Chats from "./pages/chats/Chats";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import Feed from "./pages/feed/Feed";
import Homepage from "./pages/homepage/Homepage";
import ItemsDetail from "./pages/itemsDetail/ItemsDetail";
import NewLogin from "./pages/login/NewLogin";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import ViewMessages from "./pages/viewMessages/ViewMessages";

function App() {
  const { setIsAuth, setUser } = useContext(AppContext)

  const checkAuthenticated = async () => {
    let localToken = window.localStorage.getItem("token");

    try {
      const res = await fetch(`https://colab-free-up.herokuapp.com/is-verify`, {
        method: "GET",
        headers: {
          token: localToken,
          "Content-Type": "application/json",
        },
      });
      const response = await res.json();
      response === true ? setIsAuth(true) : setIsAuth(false);
      const us = window.localStorage.getItem("user");
      const parsed = JSON.parse(us);
      setUser(parsed);
    } catch (err) {
      console.log(err)
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
        <Route path="/feed" element={<Feed />} />
        <Route path="/chats/:post_id/:sender_id/:receiver_id" element={<Chats />} />
        <Route path="/details/:post_id" element={<ItemsDetail />} />
        <Route path="/details/messages/:user_id" element={<ViewMessages />} />
        <Route path="/createPost" element={<CreatePostPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/profile/:profile_id" element={<Profile />} />
      </Routes>
    </div>
  );
}


export default App;
