import React, { useEffect } from "react";
import AboutPageBody from "../components/AboutPageBody"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
        <AboutPageBody />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
