import { Grid } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from '@mui/material/Button';
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreatePost from "../../components/createPost/CreatePost";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import AppContext from "../../context/appContext.jsx";

function ZoFeed() {
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  const { setPosts, posts, setUser } = useContext(AppContext);
  const [postsLength, setPostsLength] = useState(0);
  const [filtered, setFiltered] = useState('all')

  useEffect(() => {
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => {
        if (filtered === 'all') setPosts(data.data)
        // else (setPosts.filter((p) => p.category === filtered))
      });
    setPostsLength(posts.length);
  }, []);


  const handleFilter = e => {
    setFiltered(e.target)
  }

  // le.log(filtered.outerText.toLowerCase())conso
  // useEffect(() => {
  //   fetch("https://colab-free-up.herokuapp.com/posts")
  //     .then((response) => response.json())
  //     .then((data) => setPosts(data.data));
  //   setPostsLength(posts.length);
  // }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div role="presentation" className="breadcrumb-detail">
        <Breadcrumbs aria-label="breadcrumb" className="breadcrumb-detail">
          <div
            className="breadcrumb-link"
            underline="hover"
            color="inherit"
            onClick={(e) => navigate("/")}
          >
            Home
          </div>
          <Typography color="text.primary">Feed</Typography>
        </Breadcrumbs>
      </div>
      <div className="item-feed-name">Item Feed</div>
      <div className="pagination">
        {postsLength > 12 ? (
          <Pagination count={2} variant="outlined" shape="rounded" color="primary" />
        ) : (
          <Pagination count={1} variant="outlined" shape="rounded" color="primary" />
        )}
      </div>
      {/*       
      Will wait for where in the design we will add to the page
       */}
      <>
        <CreatePost />
      </>
      {/* <div className="browse-feed">
        {posts.map((post) => (
          <Posts key={post.id} post={post} />
        ))}
      </div> */}

      <div className="filters">
        <div className="filer-text">Filter</div>
        <Button variant="outlined" onClick={handleFilter}>Household</Button>
        <Button variant="outlined" onClick={handleFilter}>Outdoors</Button>
        <Button variant="outlined" onClick={handleFilter}>Tech</Button>
        <Button variant="outlined" onClick={handleFilter}>Sports</Button>
      </div>


      <div className="feed">
        <Grid container spacing={4} className='post-container'>
          {posts.map((post) => (
            <Posts key={post.id} post={post} />
          ))}
        </Grid>
      </div>

      <div className="pagination-bottom">
        {postsLength > 12 ? (
          <Pagination count={2} variant="outlined" shape="rounded" color='primary' />
        ) : (
          <Pagination count={1} variant="outlined" shape="rounded" color='primary' />
        )}
      </div>
      <Footer />
    </>
  );
}

export default ZoFeed;
