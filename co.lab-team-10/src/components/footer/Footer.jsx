import Typography from "@mui/material/Typography";
import React from "react";
import { AiFillInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import { MdLocationOn } from "react-icons/md";
import "./footer.css";

function Footer() {
  return (
    <div className="footer">
      <div>
        <div className="footer-logo-img">
          <Typography className="footer-pin">
            <MdLocationOn />
          </Typography>
          <Typography
            className="footer-logo"
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex" },
              flexGrow: 1,
              fontFamily: "poppins",
              fontWeight: 700,
              color: "white",
              textDecoration: "none",
            }}
          >
            FreeUp
          </Typography>
          <div className="footer-follow-us">Follow Us</div>
        </div>
      </div>
      <div className="footer-socials">
        <div className="footer-social-icon1">
          <ImFacebook2 />
        </div>
        <div className="footer-social-icon2">
          <AiFillInstagram />
        </div>
        <div className="footer-social-icon3">
          <FaTiktok />
        </div>
      </div>
    </div>
  );
}

export default Footer;
