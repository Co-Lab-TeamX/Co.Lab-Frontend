import { Grid, Rating } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import { useNavigate } from "react-router-dom";
import avatar1 from "../../images/avatar-1.png";
import avatar2 from "../../images/avatar-2.png";
import pic from "../../images/homepagePic.png";
import instructionsImg1 from "../../images/instructions-img1.png";
import instructionsImg2 from "../../images/instructions-img2.png";
import instructionsImg3 from "../../images/instructions-img3.png";
import "./homepageBody.css";

function HomepageBody() {
  const loggedIn = window.localStorage.getItem("isLoggedIn")
  const navigate = useNavigate();

  return (
    // container
    <div className="body-holder">
      <Grid container className="body-holder-container">
        <Grid container xs='12' className="header-grid">

          {/* order={{ xs: 3, sm: 2 }} */}
          <Grid item className="intro-text" xs='12' order={{ xs: 1, md: 2 }}>Find the perfect item today!</Grid>
          {/* image section */}
          <Grid item xs='12' order={{ xs: 2, md: 1 }}>
            <img src={pic} alt="Logo" className="main-image" />
          </Grid>
          {/* end image section */}

          {/* Call to action section*/}
          {/* needs to be reordered on tablet */}
          {/* <div className="intro-text">Find the perfect item today!</div> */}
          <Grid item xs='12' className="browse-items-btn-container" order={{ xs: 3 }}>
            <Button variant="contained" className="browse-items-btn" size="small" onClick={(e) => navigate("/feed")}>
                Browse Items
            </Button>
          </Grid>
        </Grid>
        {/* End call to action section*/}

        {/* How it works section */}
        <Grid item xs='12' className="how-it-works-text">How it works</Grid>
        <Grid container className="instructions-grid">
          <Grid item xs='12' md='4' className="instructions-grid-item">
            <img className="instructions-image-1" src={instructionsImg1} />
            <div className="instructions-sub-headers">Search for an item</div>
            <div className="instructions-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum.
            </div>
          </Grid>
          <Grid item xs='12' md='4' className="instructions-grid-item">
            <img className="instructions-image-2" src={instructionsImg2} />
            <div className="instructions-sub-headers">Message poster</div>
            <div className="instructions-text">
              Nunc vulputate libero et
              consectetur adipiscing elit
            </div>
          </Grid>
          <Grid item xs='12' md='4' className="instructions-grid-item">
            <img className="instructions-image-3" src={instructionsImg3} />
            <div className="instructions-sub-headers">Pick up item</div>
            <div className="instructions-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
          </Grid>
        </Grid>
        {/* End of how it works section */}

        {/* Review Section */}
        <Grid item xs='12' className="review-text">Reviews</Grid>

        {/* Review Card #1 */}
        <Grid xs='12' md='6 'item className="review-card-container review-card-1">
          <Card className="review-card">
            <CardContent>
              <div className="review-avatar-and-rating">
                <img
                  className="review-card-img"
                  src={avatar1}
                />
                <Rating name="read-only" value={5} readOnly />
              </div>
              <div className="review-username">
                Sarah Miles
              </div>
              <div className="review-description">
                This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
                iusto sapiente ullam atque saepe maiores porro?
              </div>
            </CardContent>
          </Card>
        </Grid>

        {/* Review Card #2 */}
        <Grid item xs='12' md='6' className="review-card-container review-card-2">
          <Card className="review-card">
            <CardContent>
              <div className="review-avatar-and-rating">
                <img
                  className="review-card-img"
                  src={avatar2}
                />
                <Rating name="read-only" value={5} readOnly />
              </div>
              <div className="review-username">
                Floyd Smith
              </div>
              <div className="review-description">
                This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
                iusto sapiente ullam atque saepe maiores porro?
              </div>
            </CardContent>
          </Card>
        </Grid>
        {/* End Review Section */}

        {/* Call to action #2 */}
        <Grid item xs='12' className="home-signup-btn-container">
          <Button
            variant="contained"
            className="home-signup-btn"
            onClick={(e) => navigate("/register")}
          >
            Sign up
          </Button>
        </Grid>
        {/* End of call to action #2 */}
      </Grid>
    </div>
  );
}

export default HomepageBody;
