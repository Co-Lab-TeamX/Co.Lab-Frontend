import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateTime } from "luxon";
import ScrollToBottom from "react-scroll-to-bottom";
import io from "socket.io-client";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import "./chats.css";

const socket = io.connect("http://localhost:4000");

function Chats() {
  const { sender_id, receiver_id } = useParams();
  // receiver_id -> user
  const [receiver, setReceiver] = useState({});
  const [sender, setSender] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  async function getChatData() {
    const response = await fetch(
      `http://localhost:4000/chats/${sender_id}/${receiver_id}`
    );
    const data = await response.json();
    setMessages(data);
  }

  async function getReceiverData() {
    const response = await fetch(`http://localhost:4000/users/${receiver_id}`);
    const data = await response.json();
    setReceiver(data.data[0]);
  }

  async function getSenderData() {
    const response = await fetch(`http://localhost:4000/users/${sender_id}`);
    const data = await response.json();
    setSender(data.data[0]);
  }

  useEffect(() => {
    if (!receiver_id) return;
    getReceiverData();
    getSenderData();
    getChatData();
  }, [receiver_id]);

  useEffect(() => {
    socket.on("receive_message", (payload) => {
      console.log('payload', payload)
      getChatData();
    });
  }, [socket]);

  const navigate = useNavigate();

  function sendMessage(e) {
    if (newMessage.length === 0) return;

    async function postChat() {
      const response = await fetch(
        `http://localhost:4000/chats/${sender_id}/${receiver_id}`,
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
              <img className="contact-profile-pic" src={sender.profile_pic} />
              <div className="chatting-with">Chat With {sender.username}</div>
            </div>
            <div className="horizontal-row"></div>
            <div className="chat-box">
              <div className="entire-message">
                <ScrollToBottom className="message-container">
                  {messages.map((message) => {
                    return (
                      <div className="each-message">
                        <div
                          className="message"
                          id={sender.id === message.sender_id ? "you" : "other"}
                        >
                          <div
                            id={
                              sender.id === message.sender_id ? "you" : "other"
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
                                  <div>{sender.username}</div>
                                ) : (
                                  <div>You</div>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </ScrollToBottom>
              </div>
            </div>
            <div className="sending-message-section">
              <input
                value={newMessage}
                className="message-input"
                type="message"
                placeholder="Type your message here"
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  e.key === "Enter" && sendMessage();
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chats;
