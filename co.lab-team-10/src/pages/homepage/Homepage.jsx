import React, { useEffect, useContext } from "react";
import Footer from "../../components/footer/Footer";
import HomepageBody from "../../components/homepageBody/HomepageBody";
import Navbar from "../../components/navbar/Navbar";
import AppContext from "../../context/appContext.jsx";
import "./homepage.css";

function Homepage() {
  const userLoggedInInfo = window.localStorage.getItem("user")
  const { user, setUser } = useContext(AppContext);
  // const parsedUserInfo = JSON.parse(userLoggedInInfo)
  // setUser(parsedUserInfo)
  console.log(user)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  window.onscroll = function () {
    myFunction();
  };

  function myFunction() {
    var winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }

  return (
    <>
      <Navbar />
      <HomepageBody />
      <Footer />
    </>
  );
}

export default Homepage;
/* 

        

*/
