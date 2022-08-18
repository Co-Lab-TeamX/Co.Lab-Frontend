import {
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import ImageUploading from "react-images-uploading";
import { BiImageAdd } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";

export default function CreatePostPage() {
  // only getting a user when a new person signs up, using local storage for now until we can solve that problem
  const { user, setPosts, posts } = useContext(AppContext);
  const userId = JSON.parse(window.localStorage.getItem("user")).id; //

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("Brooklyn");
  const [condition, setCondition] = useState("new");
  const [category, setCategory] = useState("household");
  const [pickupType, setPickupType] = useState("drop-off");
  const [streetAddress, setStreetAddress] = useState("");
  const [state, setState] = useState("NY");
  const [zipCode, setZipCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [weight, setWeight] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [imageSelected, setImageSelected] = useState(null);

  const [images, setImages] = useState([]);
  const [trialImage, setTrialImage] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const navigate = useNavigate();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "auto",
    bgcolor: "#fff",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // Image upload
  const maxNumber = 69;
  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setTrialImage(imageList[0].data_url);
    // setImageSelected(true);
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();
    handleOpen();
  };

  const handleSubmit2 = async (e) => {
    handleClose();
    if (trialImage === "") setTrialImage("");

    const newPostData = {
      userId: 1,
      title,
      description,
      image:
        "https://gmedia.playstation.com/is/image/SIEPDC/ps-plus-cloud-storage-dark-icon-01-en-25sep20?$native--t$",
      upload: trialImage,
      location: "Brooklyn",
      condition: "new",
      category: "Household",
      streetAddress: "435 Banner Ave",
      state: "NY",
      zipCode: "11235",
      pickupType,
      weight: 34,
      quantity,
    };
    console.log(newPostData);
    try {
      const result = await fetch("http://localhost:4000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPostData),
      });
      const parsed = await result.json();
      // console.log(parsed.data)
      navigate("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <Button className="back-to-listing">Back to listing</Button>

      <Container>
        <div className="post-page-header">Post Item</div>

        <form onSubmit={handleSubmit1}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs="12">
              <InputLabel htmlFor="title">Item Title</InputLabel>
              <TextField
                id="title"
                required
                onChange={(e) => setTitle(e.target.value)}
                sx={{ width: 1 }}
              ></TextField>
            </Grid>

            {/* Description */}
            <Grid item xs="12">
              <InputLabel htmlFor="description">
                Item Description - Max 1000 characters
              </InputLabel>
              <TextField
                multiline
                aria-label="item-description"
                id="description"
                minRows={3}
                placeholder="Enter Item Info..."
                sx={{ width: 1 }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>

            {/* Upload Photo Tester URL only */}
            <Grid item xs="12">
              <InputLabel htmlFor="photoURL">Upload Photo URL</InputLabel>
              <TextField
                id="photoURL"
                required
                onChange={(e) => setImgURL(e.target.value)}
                sx={{ width: 1 }}
              ></TextField>
            </Grid>

            {/* Upload Photo */}
            <Grid item xs="12">
              <InputLabel htmlFor="image">Photo</InputLabel>
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
                    <div className="upload__image-wrapper">
                      <Button
                        variant="raised"
                        component="span"
                        className="img-upload-box"
                        style={isDragging ? { color: "red" } : null}
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <div className="img-upload-box">+</div>
                      </Button>

                      {imageList.map((image, index) => (
                        <div key={index}>
                          <img
                            className="uploaded-img"
                            src={image.data_url}
                            alt=""
                          />
                          <p>{image.file.name}</p>
                          <div>
                            <button
                              onClick={() => {
                                onImageRemove(index);
                                // setImageSelected(null);
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
            {/* <Grid item xs='12'>
              <InputLabel htmlFor="image">Photo</InputLabel>
              {!image.preview
                ? (
                  <>
                    <input
                      accept="image/*"
                      // className={classes.input}
                      style={{ display: 'none' }}
                      id="image"
                      multiple
                      type="file"
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image">
                      <Button
                        variant="raised"
                        component="span"
                        className="img-upload-box"
                        style={{ paddingLeft: 0, paddingRight: 0 }}
                      >
                        <div className="img-upload-box">+</div>
                      </Button>
                    </label>
                  </>
                )
                : (
                  <div className='uploaded-image-container'>
                    <img src={image.preview} alt="dummy" width="820" height="412" />
                    <Button
                      color='error'
                      variant="contained"
                      onClick={handleDeletePhoto}
                    >
                      Delete Photo
                    </Button>
                  </div>
                )
              }
            </Grid> */}

            {/* Condition */}
            <Grid item xs="12">
              <InputLabel id="condition-label">Condition</InputLabel>
              <Select
                required
                labelId="condition-label"
                id="condition"
                value={condition}
                label="Condition"
                onChange={(e) => setCondition(e.target.value)}
                style={{ width: 300 }}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="like-new">Like New</MenuItem>
                <MenuItem value="fair">Fair</MenuItem>
                <MenuItem value="salvage">Salvage</MenuItem>
              </Select>
            </Grid>

            {/* household, sporting, tech, clothing, gaming */}
            {/* Category */}
            <Grid item xs="12">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                required
                labelId="category-label"
                id="category"
                value={category}
                label="Category"
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

            {/* video */}

            {/* Location */}
            <Grid item xs="12">
              <InputLabel id="location-label">Location</InputLabel>
              <Select
                required
                labelId="location-label"
                id="location"
                value={location}
                label="Location"
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

            {/* Pickup-type */}
            <Grid item xs="12">
              <FormLabel id="pickup-type-label">Pickup Option</FormLabel>
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

            {/* Address */}
            <Grid item xs="12">
              <InputLabel htmlFor="address">Item Address</InputLabel>
              <Grid container spacing={4}>
                <Grid item xs="5">
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
                <Grid item xs="1">
                  <InputLabel htmlFor="state">State</InputLabel>
                  <TextField
                    id="state"
                    required
                    onChange={(e) => setState(e.target.value)}
                  ></TextField>
                </Grid>
                <Grid item xs="2">
                  <InputLabel htmlFor="zip-code">Zip Code</InputLabel>
                  <TextField
                    id="zip-code"
                    required
                    onChange={(e) => setZipCode(e.target.value)}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>

            {/* Quantity */}
            <Grid item xs="12">
              <InputLabel htmlFor="quantity">Quantity</InputLabel>
              <TextField
                id="quantity"
                type="number"
                InputProps={{ inputProps: { min: 1 } }}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: 150 }}
              />
            </Grid>

            <Grid item xs="12">
              <InputLabel htmlFor="weight">Weight (lbs)</InputLabel>
              <TextField
                id="weight"
                onChange={(e) => setWeight(e.target.value)}
                style={{ width: 150 }}
              ></TextField>
            </Grid>

            {/* <div className="length-widith-height"></div> */}

            {/* Submit Button */}
            <Grid item xs="12">
              <Button variant="contained" type="submit">
                submit
              </Button>
            </Grid>

            {/* Modal */}
            <Modal
              open={modalOpen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <h1>Is Your Item's Information correct?</h1>

                <h3>Title: {title}</h3>
                <h3>description: {description}</h3>
                {/* <h3>{title}</h3> image */}
                {streetAddress && <h3>Address: {streetAddress}</h3>}
                <h3>Pickup Type: {pickupType}</h3>
                {weight && <h3>Weight: {weight}</h3>}
                {quantity && <h3>Quantity: {quantity}</h3>}

                <Button
                  color="primary"
                  variant="contained"
                  onClick={(e) => handleSubmit2(e)}
                >
                  Submit
                </Button>

                <Button
                  color="error"
                  variant="contained"
                  onClick={(e) => handleClose()}
                >
                  Cancel
                </Button>
              </Box>
            </Modal>
          </Grid>
        </form>
      </Container>
    </div>
  );
}
