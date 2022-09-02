import { Grid } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import React, { useContext, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Posts from "../../components/posts/Posts";
import AppContext from "../../context/appContext.jsx";

function ZoFeed() {
  const { setPosts, posts, setUser, setIsAuth } = useContext(AppContext);
  const [postsLength, setPostsLength] = useState(0);
  const [filteredPosts, setFilteredPosts] = useState([...posts]);
  const [firstFilterToggle, setFirstFilterToggle] = useState(true);
  const [pickupTypeToggle, setPickupTypeToggle] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [radioBtnPickupType, setRadioBtnPickupType] = useState([...posts]);
  const [borough, setBorough] = useState("all");

  const navigate = useNavigate();

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

  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterPickupType = (pickupType) => {
    setPickupTypeToggle(false);

    if (!firstFilterToggle) {
      console.log('here')
      if (pickupType === "all") {
        fetch("http://localhost:4000/posts")
          .then((response) => response.json())
          .then((data) => setPosts(data.data));
        setPostsLength(posts.length);
        setFilteredPosts([...posts]);
        setRadioBtnPickupType([...posts]);
      } else {
        const filteredFeed = filteredPosts.filter(
          (post) => post.pickup_type === pickupType
        );
        setRadioBtnPickupType(filteredFeed);
      }
    } else {
      if (pickupType === "all") {
        fetch("http://localhost:4000/posts")
          .then((response) => response.json())
          .then((data) => setPosts(data.data));
        setPostsLength(posts.length);
        setFilteredPosts([...posts]);
        console.log(filteredPosts)
      } else {
        const filteredFeed = posts.filter(
          (post) => post.pickup_type === pickupType
        );
        console.log(filteredFeed)
        setRadioBtnPickupType(filteredFeed);
      }
    }

    
  };

  const filterCategory = (productCategory) => {

    // Page will now use the filteredPost array while keeping the original posts unchanged
    setFirstFilterToggle(false);
    if (productCategory === "Reset") {
      // will make a fetch call incase the db is updated
      fetch("http://localhost:4000/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data.data));
      setPostsLength(posts.length);
      setFilteredPosts([...posts]);
      // fetch("https://colab-free-up.herokuapp.com/posts")
      //   .then((response) => response.json())
      //   .then((data) => setPosts(data.data))
      // setPostsLength(posts.length);
      // setFilteredPosts([...posts]);
    } else {
      const filteredFeed = posts.filter(
        (post) => post.category === productCategory
      );
      setPostsLength(filteredPosts.length);
      setFilteredPosts(filteredFeed);
    }
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
        <Button variant="contained" onClick={(e) => navigate("/createPost")}>
          Create Listing
        </Button>
      </Box>
      <div className="filters">
        <button
          variant="outlined"
          className="sub-filter-reset"
          onClick={(e) => filterCategory("Reset")}
        >
          Any
        </button>
        <button
          variant="outlined"
          className="sub-filters"
          onClick={(e) => {
            filterCategory("Household")
           
          }}
        >
          Household
        </button>
        <button
          variant="outlined"
          className="sub-filters"
          onClick={(e) => filterCategory("Sporting")}
        >
          Sporting
        </button>
        <button
          variant="outlined"
          className="sub-filters"
          onClick={(e) => filterCategory("Tech")}
        >
          Tech
        </button>
        <button
          variant="outlined"
          className="sub-filters"
          onClick={(e) => filterCategory("Clothing")}
        >
          Clothing
        </button>
        <button
          variant="outlined"
          className="sub-filters"
          onClick={(e) => filterCategory("Gaming")}
        >
          Gaming
        </button>
      </div>
      <div className="radio-filters">
        <FormControl onChange={(e) => filterPickupType(e.target.value)} >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="all"
          >
            <FormControlLabel
              value="all"
              control={<Radio className="all-radio-button" />}
              label="Any"
            />
            <FormControlLabel
              value="drop-off"
              control={<Radio className="immediate-radio-button" />}
              label="Immediate Pickup"
            />
            <FormControlLabel
              value="arrange-pickup"
              control={<Radio className="scheduled-radio-button" />}
              label="Scheduled Pickup"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {/* Trial */}
      {/* <div>
        <Box className="category-container"
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "15ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField id="outlined-select-currency" select label="Borough">
              <MenuItem value="Borough" label="Borough">
                All
              </MenuItem>
              <MenuItem value="Brooklyn">Brooklyn</MenuItem>
              <MenuItem value="Queens">Queens</MenuItem>
              <MenuItem value="Manhattan">Manhattan</MenuItem>
              <MenuItem value="The Bronx">The Bronx</MenuItem>
              <MenuItem value="Staten Island">Staten Island</MenuItem>
            </TextField>
          </div>
          <div>
            <TextField id="outlined-select-currency" select label="PickupType">
              <MenuItem value="PickupType" label="PickupType">
                All
              </MenuItem>
              <MenuItem value="Staten Island">Immediate Pickup</MenuItem>
              <MenuItem value="Staten Island">Scheduled Pickup</MenuItem>
            </TextField>
          </div>
          <div>
            <TextField id="outlined-select-currency" select label="Sort">
              <MenuItem value="Sort" label="Sort">
                All
              </MenuItem>
              <MenuItem value="one-day-ago">1 Day Ago</MenuItem>
              <MenuItem value="one-week-ago">1 Week Ago</MenuItem>
              <MenuItem value="one-Month-ago">1 Month Ago</MenuItem>
            </TextField>
          </div>
          <div className="reset-filters-btn">
          <Button 
          sx={{
          textTransform: 'none',
            height: "56px",
            width: "100px",
        backgroundColor: "white",
        border: "1px solid #02A7A7",
        color: "#474747",
        fontSize: "17px"
      }}>Reset</Button>
          </div>
        </Box>
      </div> */}
      {/* Trial */}
      {/* FEED */}
      <div className="feed">
        <Grid container spacing={4} className="post-container">
          {/* If no filter button is pressed use the global filter array else use the filtered array */}
          {firstFilterToggle
            ? posts.map((post) => <Posts key={post.id} post={post} />)
            : filteredPosts.map((post) => <Posts key={post.id} post={post} />)}
           
          {pickupTypeToggle
            ? posts.map((post) => <Posts key={post.id} post={post} />)
            : radioBtnPickupType.map((post) => <Posts key={post.id} post={post} />)}
        </Grid>
      </div>
      {/* END FEED */}

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
