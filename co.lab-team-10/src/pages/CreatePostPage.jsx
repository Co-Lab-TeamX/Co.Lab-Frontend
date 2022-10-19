import { Button, CardMedia, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, TextField, } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AppContext from "../context/appContext";
import cameraIcon from "../images/camera-icon.svg";
import checkIcon from "../images/CircleWavyCheck.svg";
import warningIcon from "../images/CircleWavyWarning.svg";
import locationIcon from "../images/location-icon.svg";

export default function CreatePostPage() {
  const { setIsAuth, setUser } = useContext(AppContext);
  const userId = JSON.parse(window.localStorage.getItem("user")).id;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Brooklyn");
  const [condition, setCondition] = useState("new");
  const [category, setCategory] = useState("household");
  const [pickupType, setPickupType] = useState("drop-off");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("NY");
  const [zipCode, setZipCode] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [weight, setWeight] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [trialImage, setTrialImage] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");

    if (loggedIn) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      setIsAuth(true);
      setUser(user);
    } else {
      navigate("/login");
    }
  }, []);

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "#fff",
    borderRadius: "15px",
    boxShadow: 24,
    p: 4,
  };

  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setTrialImage(imageList[0].data_url);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleSubmit2 = async (e) => {
    handleClose();
    if (trialImage === "") setTrialImage("");

    const newPostData = {
      userId,
      title,
      description,
      upload: trialImage,
      location,
      condition,
      category,
      streetAddress,
      state,
      zipCode,
      pickupType,
      weight,
      quantity,
    };

    try {
      const result = await fetch("https://colab-free-up.herokuapp.com/posts", {
        // const result = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });
      const parsed = await result.json();
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  let stringLength = trialImage.length - 'data:image/png;base64,'.length;
  let sizeInBytes = 4 * Math.ceil((stringLength / 3)) * 0.5624896334383812;
  var sizeInKb = sizeInBytes / 1000;
  console.log(sizeInKb);


  return (
    <div>
      <Navbar />
      <Button
        className="back-to-listing"
        onClick={(e) => navigate("/feed")}
        sx={{ marginTop: 10, marginLeft: "33px" }}
      >
        &lt; Back to listings
      </Button>
      <Container>
        <Box className="post-page-header" sx={{ marginTop: 10 }}>
          Post Item
        </Box>
        <form onSubmit={handleSubmit1}>
          <Grid container spacing={3} sx={{ zIndex: 0 }}>
            <Grid item xs="12">
              <label className="form-label" htmlFor="title">
                Item Title
              </label>
              <TextField
                id="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: 1, marginTop: 1 }}
                placeholder="Enter title"
              ></TextField>
            </Grid>
            <Grid item xs="12">
              <label className="form-label" htmlFor="description">
                Item Description - Max 1000 characters
              </label>
              <TextField
                multiline
                aria-label="item-description"
                id="description"
                minRows={3}
                placeholder="Enter Item Info..."
                sx={{ width: 1, marginTop: 1 }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs="12" sx={{ zIndex: 0 }}>
              <label className="form-label" htmlFor="image">
                Photo
              </label>
              <div>
                <ImageUploading
                  value={images}
                  onChange={onChange}
                  maxNumber={maxNumber}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <div>
                      {images.length < 1 && (
                        <Button
                          variant="raised"
                          component="span"
                          className="img-upload-box-wrapper"
                          style={isDragging ? { color: "red" } : null}
                          onClick={onImageUpload}
                          {...dragProps}
                        >
                          <Box className="upload-img-box">
                            <img src={cameraIcon} alt="camera-icon" />
                            <div className="text">Add a Photo</div>
                          </Box>
                        </Button>
                      )}
                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img
                            className="uploaded-img"
                            src={image.data_url}
                            alt=""
                          />
                          <div>
                            <button
                              className="remove-button"
                              onClick={() => {
                                onImageRemove(index);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ImageUploading>
              </div>
            </Grid>
            <Grid
              item
              xs="12"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="form-label" id="condition-label">
                Condition
              </label>
              <Select
                required
                labelId="condition-label"
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{ width: 300 }}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="like-new">Like New</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="salvage">Salvage</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs="12"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="form-label" id="category-label">
                Category
              </label>
              <Select
                required
                labelId="category-label"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: 300 }}
              >
                <MenuItem value="household">Household</MenuItem>
                <MenuItem value="sporting">Sporting</MenuItem>
                <MenuItem value="tech">Tech</MenuItem>
                <MenuItem value="clothing">Clothing</MenuItem>
                <MenuItem value="gaming">Gaming</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs="12"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="form-label" id="location-label">
                Location
              </label>
              <Select
                required
                labelId="location-label"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ width: 300 }}
              >
                <MenuItem value="Brooklyn">Brooklyn</MenuItem>
                <MenuItem value="Queens">Queens</MenuItem>
                <MenuItem value="Manhattan">Manhattan</MenuItem>
                <MenuItem value="The Bronx">The Bronx</MenuItem>
                <MenuItem value="Staten Island">Staten Island</MenuItem>
              </Select>
            </Grid>
            <Grid
              item
              xs="12"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="form-label" htmlFor="quantity">
                Quantity
              </label>
              <TextField
                id="quantity"
                type="number"
                value={quantity}
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: 150 }}
              />
            </Grid>
            <Grid
              item
              xs="12"
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <label className="form-label" htmlFor="weight">
                Item Weight (lbs)
              </label>
              <TextField
                id="weight"
                type="number"
                inputProps={{ min: 0 }}
                onChange={(e) => setWeight(e.target.value)}
                style={{ width: 150 }}
              ></TextField>
            </Grid>
            <Grid item xs="12">
              <label className="form-label" id="pickup-type-label">
                Pickup Option
              </label>
              <RadioGroup
                row
                aria-labelledby="pickup-type-label"
                name="row-radio-buttons-group"
                onChange={(e) => setPickupType(e.target.value)}
                defaultValue="drop-off"
              >
                <div className="radio-input">
                  <FormControlLabel
                    value="drop-off"
                    control={<Radio />}
                    label="Drop Off"
                  />
                  <FormLabel className="radio-description">
                    Item will be left on the street for pickup.
                  </FormLabel>
                </div>
                <div className="radio-input">
                  <FormControlLabel
                    value="arrange-pickup"
                    control={<Radio />}
                    label="Arrange Pickup"
                  />
                  <FormLabel className="radio-description">
                    Item will be available for a scheduled pickup time.
                  </FormLabel>
                </div>
              </RadioGroup>
            </Grid>
            <Grid item xs="12">
              <label className="form-label" htmlFor="address">
                Item Address
              </label>
              <Grid container spacing={4}>
                <Grid item xs="8">
                  <InputLabel htmlFor="street-address">
                    Street Address
                  </InputLabel>
                  <TextField
                    id="street-address"
                    required
                    onChange={(e) => setStreetAddress(e.target.value)}
                    sx={{ width: 1 }}
                  ></TextField>
                </Grid>
                <Grid item xs="4">
                  <InputLabel htmlFor="zip-code">Zip Code</InputLabel>
                  <TextField
                    id="zip-code"
                    required
                    onChange={(e) => setZipCode(e.target.value)}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs="12"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: 5,
                marginBottom: 7,
              }}
            >
              <Button variant="contained" size="large" type="submit">
                Post Listing
              </Button>
            </Grid>
            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle} className="post-modal">
                <Box sx={{ display: "flex" }}>
                  {images.length >= 1 && (
                    <CardMedia
                      className="modal-image"
                      component="img"
                      image={images[0].data_url}
                      alt="Thumbnail"
                    />
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                    className="modal-details-box"
                  >
                    <div className="modal-title">{title}</div>
                    <div className="modal-pickup-container">
                      {pickupType === "drop-off" ? (
                        <>
                          <img src={warningIcon} alt="warning-icon" />
                          <h3>Immediate Pickup</h3>
                        </>
                      ) : (
                        <>
                          <img src={checkIcon} alt="check-icon" />
                          <h3>Schedule Pickup</h3>
                        </>
                      )}
                    </div>
                    <div className="modal-pickup-container">
                      <img src={locationIcon} alt="location-icon" />
                      <h3>
                        {streetAddress}, {location} NY
                      </h3>
                    </div>
                  </Box>
                </Box>
                <Box className="modal-button-container">
                  <Button
                    color="primary"
                    variant="outlined"
                    size="large"
                    onClick={(e) => handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    onClick={(e) => handleSubmit2(e)}
                  >
                    Publish
                  </Button>
                </Box>
              </Box>
            </Modal>
          </Grid>
        </form>
      </Container>
      <Footer />
    </div>
  );
}
