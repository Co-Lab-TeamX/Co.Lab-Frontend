import { useContext, useState, useEffect } from "react";
import { Button } from "@mui/material";
import AppContext from "../../context/appContext";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import "./profile.css";
import Footer from "../../components/footer/Footer";

const Profile = () => {
  const [userProfileInfo, setUserProfileInfo] = useState({});
  const { profile_id } = useParams();

  useEffect(() => {
    fetch(`https://colab-free-up.herokuapp.com/users/${profile_id}`)
      .then((res) => res.json())
      .then((data) => setUserProfileInfo(data.data[0]));
  }, []);

  const navigate = useNavigate();

  window.onscroll = function () {
    myFunction();
  };

  function myFunction() {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <div>
      <Navbar />
      <Button
        className="back-to-listing"
        onClick={(e) => navigate("/feed")}
        sx={{ marginTop: 10, marginLeft: "33px" }}
      >
        &lt; Back to Item Details
      </Button>
      <div className="user-profile-text">Profile</div>
      <div className="succinct-user-info-container">
        <div className="succinct-user-info">
          <img className="profile-page-img" src={userProfileInfo.profile_pic} />
          <div className="information-text">
            <div className="profile-username">{userProfileInfo.username}</div>
            <div className="profile-location">{userProfileInfo.location}</div>
          </div>
        </div>
      </div>
      <div className="profile-body">

      <div className="profile-cards">
        <div className="profile-cards-container">
          <div className="individual-profile-card">
            <div className="card-container">
              <div className="profile-card-icon"><EmailOutlinedIcon className="profile-card-icon"/></div>
              <div className="profile-card-text">
                <div className="profile-card-title-text">Inbox</div>
                <div className="profile-card-more-info">Manage messages</div>
              </div>
            </div>
          </div>
          <div className="individual-profile-card">
            <div className="card-container">
              <div className="profile-card-icon"><AccountCircleOutlinedIcon className="profile-card-icon"/></div>
              <div className="profile-card-text">
                <div className="profile-card-title-text">Account Settings</div>
                <div className="profile-card-more-info">View and make changes to personal information</div>
              </div>
            </div>
          </div>
          <div className="individual-profile-card">
            <div className="card-container">
              <div className="profile-card-icon"><CreateOutlinedIcon className="profile-card-icon"/></div>
              <div className="profile-card-text">
                <div className="profile-card-title-text">Listings</div>
                <div className="profile-card-more-info">Manage listings</div>
              </div>
            </div>
          </div>
          <div className="individual-profile-card">
            <div className="card-container">
              <div className="profile-card-icon"><CalendarTodayOutlinedIcon className="profile-card-icon"/></div>
              <div className="profile-card-text">
                <div className="profile-card-title-text">Calendar</div>
                <div className="profile-card-more-info">Change schedule and availability</div>
              </div>
            </div>
          </div>
          <div className="individual-profile-card">
            <div className="card-container">
              <div className="profile-card-icon"><BookmarkBorderOutlinedIcon className="profile-card-icon"/></div>
              <div className="profile-card-text">
                <div className="profile-card-title-text">Saved Listings</div>
                <div className="profile-card-more-info">View and manage saved listings</div>
              </div>
            </div>
          </div>
          <div className="individual-profile-card">
            <div className="card-container">
              <div className="profile-card-icon"><InfoOutlinedIcon className="profile-card-icon"/></div>
              <div className="profile-card-text">
                <div className="profile-card-title-text">Help</div>
                <div className="profile-card-more-info">FAQ, policies and more</div>
              </div>
            </div>
          </div>
        </div>
          
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
