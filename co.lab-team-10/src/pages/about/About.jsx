import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import AboutpageBody from "../../components/aboutpageBody/AboutpageBody";

import "./about.css";

const AboutPage = () => {
  window.onscroll = () => myFunction();

  function myFunction() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }

  return (
    <div>
      <Navbar />
      <div className="body">
        <AboutpageBody />
        </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
