import { Container, Grid } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import React, { useContext, useEffect, useState } from "react";
import CreatePost from "../../components/createPost/CreatePost";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import AppContext from "../../context/appContext.jsx";
import "./zoFeed.css";

function ZoFeed() {
  const { setPosts, posts, setUser } = useContext(AppContext);
  const [postsLength, setPostsLength] = useState(0);

  useEffect(() => {
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
    setPostsLength(posts.length);
  }, []);

  // useEffect(() => {
  //   fetch("https://colab-free-up.herokuapp.com/posts")
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data.data));
  //   setPostsLength(posts.length);
  // }, []);

  console.log(posts);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Navbar />
      <div className="item-feed-name">Item Feed</div>
      <div className="pagination">
        {postsLength > 12 ? (
          <Pagination count={2} variant="outlined" shape="rounded" />
        ) : (
          <Pagination count={1} variant="outlined" shape="rounded" />
        )}
      </div>
      {/*       
      Will wait for where in the design we will add to the page
       */}
      {/* <>
        <CreatePost />
      </> */}
      {/* <div className="browse-feed">
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div> */}

      <div className="feed">
        <Grid container spacing={4} className='post-container'>
          {posts.map((post) => (
            <Posts key={post.id} post={post} />
          ))}
        </Grid>
      </div>

      <div className="pagination-bottom">
        {postsLength > 12 ? (
          <Pagination count={2} variant="outlined" shape="rounded" />
        ) : (
          <Pagination count={1} variant="outlined" shape="rounded" />
        )}
      </div>
      <Footer />
    </>
  );
}

export default ZoFeed;
