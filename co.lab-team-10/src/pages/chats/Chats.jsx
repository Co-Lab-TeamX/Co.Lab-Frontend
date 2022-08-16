import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./chats.css";

function Chats() {
  const { sender_id, receiver_id } = useParams();
  // console.log(sender_id, receiver_id -> user)

  const navigate = useNavigate();

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
          <Typography color="text.primary">Chats</Typography>
        </Breadcrumbs>
      </div>
      <div className="holder">
        <div className="grid-container-chats">
          <div className="grid-item1">
            <div className="info-holder">
              <div className="all-conversations-text">All Conversations</div>
              <div className="left-side-contacts">
                <div className="each-contact">
                  <img
                    className="contact-profile-pic"
                    src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                  />
                  <div className="contact-name">Name</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item2">
            <div className="top-portion">
              <img
                className="contact-profile-pic"
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
              />
              <div className="chatting-with">Chat With Sarah Lee</div>
            </div>
            <div className="horizontal-row"></div>
            <div className="chat-box">
              <div className="entire-message">
                <img
                  className="contact-profile-pic"
                  src="https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
                />
                <div className="message-body">
                  <div className="message-body-container">Message Body</div>
                  <div className="time-posted">Time Posted</div>
                </div>
              </div>
            </div>
            <div className="sending-message-section">
              <input type="message" placeholder="Type your message here" />
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chats;
