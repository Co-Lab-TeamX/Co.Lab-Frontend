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
  const [filterToggle, setFilterToggle] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [borough, setBorough] = useState("all");
  const [category, setCategory] = useState("Any");
  const [pickupType, setPickupType] = useState("Any");
  const [categorySelected, setCategorySelected] = useState(false);

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

  // const open = Boolean(anchorEl);

  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  const filterFeed = (productCategory, productPickupType = pickupType) => {
    setFilterToggle(true);

    setCategory(productCategory);
    setCategorySelected(productCategory)
    setPickupType(productPickupType)

    // Page will now use the filteredPost array while keeping the original posts unchanged
    let filteredFeed = [...posts];

    // Filter by category
    if (productCategory === "Any") {
      // will make a fetch call incase the db is updated
      fetch("http://localhost:4000/posts")
        .then((response) => response.json())
        .then((data) => setPosts(data.data));
      setPostsLength(posts.length);
      filteredFeed = [...posts];
    } else {
      filteredFeed = filteredFeed.filter(post => post.category === productCategory);
    }

    // Filter by pickup type
    if (productPickupType !== "Any") {
      filteredFeed = filteredFeed.filter(post => post.pickup_type === productPickupType);
    }
    setFilteredPosts(filteredFeed);
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
        <Button className="create-post-btn" variant="contained" onClick={(e) => navigate("/createPost")}>
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
          className={categorySelected === "Household" ? 'sub-filter-selected' : 'sub-filters'}
          onClick={(e) => filterFeed("Household", pickupType)}
        >
          Household
        </button>
        <button
          variant="outlined"
          className={categorySelected === "Sporting" ? 'sub-filter-selected' : 'sub-filters'}
          onClick={(e) => filterFeed("Sporting", pickupType)}
        >
          Sporting
        </button>
        <button
          variant="outlined"
          className={categorySelected  === "Tech"? 'sub-filter-selected' : 'sub-filters'}
          onClick={(e) => filterFeed("Tech", pickupType)}
        >
          Tech
        </button>
        <button
          variant="outlined"
          className={categorySelected  === "Clothing" ? 'sub-filter-selected' : 'sub-filters'}
          onClick={(e) => filterFeed("Clothing", pickupType)}
        >
          Clothing
        </button>
        <button
          variant="outlined"
          className={categorySelected === "Gaming"? 'sub-filter-selected' : 'sub-filters'}
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
            onChange={e => setPickupType(e.target.value)}
          >
            <FormControlLabel
              value="Any"
              control={<Radio className="all-radio-button" />}
              label="Any"
              onClick={(e) => filterFeed(category, 'Any')}
            />
            <FormControlLabel
              value="drop-off"
              control={<Radio className="immediate-radio-button" />}
              label="Immediate Pickup"
              onClick={(e) => filterFeed(category, 'drop-off')}
            />
            <FormControlLabel
              value="arrange-pickup"
              control={<Radio className="scheduled-radio-button" />}
              label="Scheduled Pickup"
              onClick={(e) => filterFeed(category, 'arrange-pickup')}
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

          {filterToggle
            ? filteredPosts.map((post) => <Posts key={post.id} post={post} />)
            : posts.map((post) => <Posts key={post.id} post={post} />)
          }

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
