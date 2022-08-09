import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import pic from "../../images/homepagePic.png";
import instructionsImg1 from "../../images/instructions-img1.png";
import instructionsImg2 from "../../images/instructions-img2.png";
import instructionsImg3 from "../../images/instructions-img3.png";
import "./homepageBody.css";

function HomepageBody() {
  const navigate = useNavigate();

  return (
    <div className="body-holder">
      <div className="first-image">
        <img src={pic} alt="Logo" className="main-image" />
      </div>
      <div className="intro-text">Find the perfect item today!</div>
      <div className="intro-btn">
        <Button variant="contained" className="browse-items-btn" size="small">
          <MenuItem className="nav-link" onClick={(e) => navigate("/feed")}>
            Browse Items
          </MenuItem>
        </Button>
      </div>

      <div className="how-it-works">How it works</div>
      <div class="grid-container">
        <div class="grid-item">
          <img className="instructions-image" src={instructionsImg1} />
          <div className="instructions-sub-headers">Search for an item</div>
          <div className="instructions-text">
            This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
            iusto sapiente ullam atque saepe maiores porro?
          </div>
        </div>
        <div class="grid-item">
          <img className="instructions-image" src={instructionsImg2} />
          <div className="instructions-sub-headers">Message poster</div>
          <div className="instructions-text">
            This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
            iusto sapiente ullam atque saepe maiores porro?
          </div>
        </div>
        <div class="grid-item">
          <img className="instructions-image" src={instructionsImg3} />
          <div className="instructions-sub-headers">Pick up item</div>
          <div className="instructions-text">
            This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
            iusto sapiente ullam atque saepe maiores porro?
          </div>
        </div>
      </div>

      <div className="review-text">Reviews</div>
      
      <div className="review-cards">
      <div class="review-grid-items">
        <Card sx={{ minWidth: 275 }} className="review-card">
          <CardContent>
            <img className="review-card-img" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"/>
            <Typography
              sx={{ fontSize: 20 }}
              color="#133240"
              gutterBottom
            >
              Sarah Miles
            </Typography>
            <Typography variant="body2" className="review-card-review">
            This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
            iusto sapiente ullam atque saepe maiores porro?
            </Typography>
          </CardContent>
        </Card>
        </div>
      <div class="review-grid-items">
        <Card sx={{ minWidth: 275 }} className="review-card">
          <CardContent>
            <img className="review-card-img" src="https://i.guim.co.uk/img/media/e909d8da276dcaa25baca97b134d6d63e8664e75/0_36_6025_3615/master/6025.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=58d66e814e05e26b8cb93b44c48117b1"/>
            <Typography
              sx={{ fontSize: 20 }}
              color="#133240"
              gutterBottom
            >
              Sarah Miles
            </Typography>
            <Typography variant="body2" className="review-card-review">
            This is some Lorem ipsum, dolor si animi esse. Ostrum inventore
            iusto sapiente ullam atque saepe maiores porro?
            </Typography>
          </CardContent>
        </Card>
        </div>
      </div>
      <div className="intro-btn">
        <Button variant="contained" className="home-signup-btn" size="small" onClick={(e) => navigate('/register')}>
            Sign up
        </Button>
      </div>
    </div>
  );
}

export default HomepageBody;
