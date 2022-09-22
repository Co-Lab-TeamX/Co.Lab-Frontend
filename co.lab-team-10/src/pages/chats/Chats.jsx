import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { AiOutlineArrowUp } from "react-icons/ai"
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./chats.css";

const socket = io.connect("https://colab-free-up.herokuapp.com");

function Chats() {
  const { sender_id, receiver_id, post_id } = useParams();
  const [receiver, setReceiver] = useState({});
  const [sender, setSender] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

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

  async function getChatData() {
    const response = await fetch(
      `https://colab-free-up.herokuapp.com/chats/${post_id}/${sender_id}/${receiver_id}`
    );
    const data = await response.json();
    setMessages(data);
  }

  async function getReceiverData() {
    const response = await fetch(
      `https://colab-free-up.herokuapp.com/users/${receiver_id}`
    );
    const data = await response.json();
    setReceiver(data.data[0]);
  }

  async function getSenderData() {
    const response = await fetch(
      `https://colab-free-up.herokuapp.com/users/${sender_id}`
    );
    const data = await response.json();
    setSender(data.data[0]);
  }

  useEffect(() => {
    if (!sender_id) return;
    getReceiverData();
    getSenderData();
    getChatData();
  }, [sender_id]);

  useEffect(() => {
    socket.on("receive_message", (payload) => {
      console.log("payload", payload);
      getChatData();
    });
  }, [socket]);

  function sendMessage(e) {
    if (newMessage.length === 0) return;

    async function postChat() {
      const response = await fetch(
        `https://colab-free-up.herokuapp.com/chats/${post_id}/${sender_id}/${receiver_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message_body: newMessage }),
        }
      );
      const data = await response.json();
      setMessages([...messages, data[0]]);
    }

    postChat();
    socket.emit("chat", newMessage);
    setNewMessage("");
  }

  return (
    <div className="chats-page-container">
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
        <div className="grid-item2">
          <div className="top-portion">
            <img className="contact-profile-pic" src={receiver.profile_pic} />
            <div className="chatting-with">{receiver.username}</div>
          </div>
          <div className="horizontal-row"></div>
          <div className="chat-box">
            <div className="entire-message">
              <ScrollToBottom className="message-container">
                {messages.map((message) => {
                  return (
                    <>
                      <div className="each-message">
                        <div
                          className="message"
                          id={sender.id !== message.sender_id ? "other" : "you"}
                        >
                          <div
                            id={
                              sender.id !== message.sender_id ? "other" : "you"
                            }
                          >
                            <div className="message-content">
                              <p className="message-body">
                                {message.message_body}
                              </p>
                            </div>
                            <div className="message-meta">
                              <p id="time">
                                {DateTime.fromISO(
                                  message.time_posted
                                ).toRelative()}
                              </p>
                              <p id="author">
                                {sender.id !== message.sender_id ? (
                                  <div>{receiver.username}</div>
                                ) : (
                                  <div>You</div>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </ScrollToBottom>
              <div className="sending-message-section">
                <TextField
                  size="small"
                  className="message-input-field"
                  name="password"
                  label="Enter message..."
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    e.key === "Enter" && sendMessage();
                  }}
                />
                <Button
                  variant="contained"
                  className="send-message-btn"
                  size="small"
                >
                  <MenuItem>Send<AiOutlineArrowUp className="arrow-up-icon"/></MenuItem>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Chats;
