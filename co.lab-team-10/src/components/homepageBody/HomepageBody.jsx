import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import { useNavigate } from "react-router-dom";
import pic from "../../images/homepagePic.png";
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
      {/* <div className="how-it-works">How it works</div> */}
    </div>
  );
}

export default HomepageBody;