import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AppContext from "../../context/appContext";
import "./viewMessages.css";

function ViewMessages() {
  const { user_id } = useParams();
  const [userContacts, setUserContacts] = useState([]);

  useEffect(() => {
    fetchUserContacts();
  }, []);

  const fetchUserContacts = async () => {
    const result = await fetch(
      `http://localhost:4000/details/messages/${user_id}`
    );
    const parsed = await result.json();
    setUserContacts(parsed);
  };

  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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
          <div
            className="breadcrumb-link"
            underline="hover"
            color="inherit"
            onClick={(e) => navigate("/feed")}
          >
            Feed
          </div>
          <Typography color="text.primary">Messages</Typography>
        </Breadcrumbs>
      </div>

      <div className="holder-view-messages">
        <div className="grid-item-view-messages">
          <div className="top-portion-view-messages">
            <div className="view-messages-text">View Messages</div>
          </div>
          <div className="horizontal-row"></div>
          <div className="chat-box">
            {userContacts.map((contact) => (
              <>
                <div
                  className="each-contact-view-message"
                  onClick={(e) => navigate(`/chats/${contact.id}/${user_id}`)}
                >
                  <img
                    className="contact-profile-pic-messages"
                    src={contact.profile_pic}
                  />
                  <div className="contact-username-messages">
                    {contact.username}
                  </div>
                </div>
                <div className="horizontal-row"></div>
              </>
            ))}
            <div className="entire-message"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewMessages;
