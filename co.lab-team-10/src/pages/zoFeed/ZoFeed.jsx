import React from "react";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./zoFeed.css";
import { useContext, useEffect } from "react";
import AppContext from "../../context/appContext.jsx";
import Posts from "../../components/posts/Posts";

function ZoFeed() {
  const { setPosts, posts } = useContext(AppContext);

  useEffect(() => {
    fetch("http://localhost:4000/feed")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <Navbar />
      <div className="item-feed-name">Item Feed</div>
      <div className="browse-feed">
        {posts.map((p) => (
          <Posts key={p.id} post={p} />
        ))}
      </div>

      <Footer />
    </>
  );
}

export default ZoFeed;
