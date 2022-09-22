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
          <div className="about-footer">
            <div className="about-text">About</div>
            <div className="extra-text">Company</div>
            <div className="extra-text">Contact</div>
            <div className="extra-text">FAQ</div>
          </div>
          <div className="community-footer">
            <div className="community-text">Community</div>
            <div className="extra-text">News</div>
            <div className="extra-text">Career</div>
          </div>
          <div className="support-footer">
            <div className="support-text">Support</div>
            <div className="extra-text">Policies</div>
            <div className="extra-text">Terms</div>
            <div className="extra-text">Privacy</div>
          </div>
          <div className="follow-us-footer">
            <div className="follow-us-text">Follow Us</div>
            <div className="socials-container">
              <div className="facebook-icon"><ImFacebook2 /></div>
              <div className="instagram-icon"><AiFillInstagram /></div>
              <div className="tiktok-icon"><FaTiktok /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-text">©2022 FreeUp, Inc. All rights reserved.</div>
    </div>
  );
}

export default Footer;
