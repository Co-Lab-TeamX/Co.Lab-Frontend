import { Grid } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import AppContext from "../../context/appContext.jsx";

function ZoFeed() {
  const { setPosts, posts, setUser, setIsAuth } = useContext(AppContext);
  const [postsLength, setPostsLength] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([...posts]);
  const [filterToggle, setFilterToggle] = useState(false);
  const [category, setCategory] = useState("Any");
  const [pickupType, setPickupType] = useState("Any");
  const [categorySelected, setCategorySelected] = useState(false);
  const [itemCount, setItemCount] = useState(posts.length);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://colab-free-up.herokuapp.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data.data));
    setItemCount(posts.length);
    setPostsLength(posts.length);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");

    if (loggedIn) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      setIsAuth(true);
      setUser(user);
    }
  }, []);

  const filterFeed = (productCategory, productPickupType = pickupType) => {
    setFilterToggle(true);

    setCategory(productCategory);
    setCategorySelected(productCategory);
    setPickupType(productPickupType);

    let filteredFeed = [...posts];

    if (productCategory === "Any") {
      fetch("https://colab-free-up.herokuapp.com/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data.data));
      setPostsLength(posts.length);
      filteredFeed = [...posts];
      setItemCount(filteredFeed.length);
    } else {
      filteredFeed = filteredFeed.filter(
        (post) => post.category === productCategory
      );
      setItemCount(filteredFeed.length);
    }

    if (productPickupType !== "Any") {
      filteredFeed = filteredFeed.filter(
        (post) => post.pickup_type === productPickupType
      );
    }
    setFilteredPosts(filteredFeed);
    setItemCount(filteredFeed.length);
  };

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

      <Box
        className="idk"
        sx={{
          width: 1,
          display: "flex",
          justifyContent: "center",
          marginBottom: 5,
        }}
      >
        <Button
          className="create-post-btn"
          variant="contained"
          onClick={(e) => navigate("/createPost")}
        >
          Create Listing
        </Button>
      </Box>
      <div className="filters">
        <button
          variant="outlined"
          className="sub-filter-reset"
          onClick={(e) => filterFeed("Any", pickupType)}
        >
          Any
        </button>
        <button
          variant="outlined"
          className={
            categorySelected === "Household"
              ? "sub-filter-selected"
              : "sub-filters"
          }
          onClick={(e) => filterFeed("Household", pickupType)}
        >
          Household
        </button>
        <button
          variant="outlined"
          className={
            categorySelected === "Sporting"
              ? "sub-filter-selected"
              : "sub-filters"
          }
          onClick={(e) => filterFeed("Sporting", pickupType)}
        >
          Sporting
        </button>
        <button
          variant="outlined"
          className={
            categorySelected === "Tech" ? "sub-filter-selected" : "sub-filters"
          }
          onClick={(e) => filterFeed("Tech", pickupType)}
        >
          Tech
        </button>
        <button
          variant="outlined"
          className={
            categorySelected === "Clothing"
              ? "sub-filter-selected"
              : "sub-filters"
          }
          onClick={(e) => filterFeed("Clothing", pickupType)}
        >
          Clothing
        </button>
        <button
          variant="outlined"
          className={
            categorySelected === "Gaming"
              ? "sub-filter-selected"
              : "sub-filters"
          }
          onClick={(e) => filterFeed("Gaming", pickupType)}
        >
          Gaming
        </button>
      </div>

      <div className="radio-filters">
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="Any"
            onChange={(e) => setPickupType(e.target.value)}
          >
            <FormControlLabel
              value="Any"
              control={<Radio className="all-radio-button" />}
              label="Any"
              onClick={(e) => filterFeed(category, "Any")}
            />
            <FormControlLabel
              value="drop-off"
              control={<Radio className="immediate-radio-button" />}
              label="Immediate Pickup"
              onClick={(e) => filterFeed(category, "drop-off")}
            />
            <FormControlLabel
              value="arrange-pickup"
              control={<Radio className="scheduled-radio-button" />}
              label="Scheduled Pickup"
              onClick={(e) => filterFeed(category, "arrange-pickup")}
            />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="count-holder">
        <div className="item-text">
          {itemCount === 1 ? (
            <>
              <div className="item-count">1</div> item
            </>
          ) : (
            <>
              <div className="item-count">{itemCount}</div> items
            </>
          )}
        </div>
      </div>
      <div className="feed">
        <Grid container spacing={4} className="post-container">
          {filterToggle
            ? filteredPosts.map((post) => <Posts key={post.id} post={post} />)
            : posts.map((post) => <Posts key={post.id} post={post} />)}
        </Grid>
      </div>
      <div className="pagination-bottom">
        {postsLength > 9 ? (
          <Pagination
            count={2}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        ) : (
          <Pagination
            count={1}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default ZoFeed;
