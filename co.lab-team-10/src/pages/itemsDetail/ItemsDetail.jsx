import { Container, Grid, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import { useContext, useEffect, useState } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaStarHalfAlt, FaWeightHanging } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../../components/comments/Comments";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import AppContext from "../../context/appContext";
import checkIcon from "../../images/CircleWavyCheck.svg";
import warningIcon from "../../images/CircleWavyWarning.svg";

function ItemsDetail() {
  const { user, setIsAuth, setUser } = useContext(AppContext);
  const { post_id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [singlePost, setSinglePost] = useState({});
  const [open, setOpen] = useState(false);
  const [userContacts, setUserContacts] = useState([]);

  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchUserContacts();
  }, []);

  const fetchUserContacts = async () => {
    const result = await fetch(
      `https://colab-free-up.herokuapp.com/details/${post_id}/${user.id}`
    );
    const parsed = await result.json();
    setUserContacts(parsed);
  };

  useEffect(() => {
    const loggedIn = window.localStorage.getItem("isLoggedIn");

    if (loggedIn) {
      const user = JSON.parse(window.localStorage.getItem("user"));
      setIsAuth(true);
      setUser(user);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (!post_id) return;
    fetch(`https://colab-free-up.herokuapp.com/posts/${post_id}`)
      .then((response) => response.json())
      .then((data) => setSinglePost(data.data));
  }, [post_id]);

  useEffect(() => {
    fetch(`https://colab-free-up.herokuapp.com/posts/${post_id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data.data));
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    const newCommentData = {
      comment_body: newComment,
      user_id: user.id,
      post_id: post_id,
    };

    if (newCommentData.comment_body === "") return;

    const result = await fetch(
      `https://colab-free-up.herokuapp.com/posts/${post_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      }
    );
    const parsed = await result.json();
    parsed.data.username = user.username;
    parsed.data.profile_pic = user.profile_pic;
    setComments([parsed.data, ...comments]);
    setNewComment("");
  };

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

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #a6a6a6",
    boxShadow: 24,
    borderRadius: 2,
  };

const handleViewProfile = e => {
  const ID = singlePost.user_id
  navigate(`/profile/${ID}`)
}

  return (
    <>
      <div className="item-detail-page-container">
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
            <Typography color="text.primary">{singlePost.title}</Typography>
          </Breadcrumbs>
        </div>
        <div className="item-detail-main-container">
          <Container className="item-detail-main-container">
            <Grid container className="item-detail-container">
              <Grid item xs="12" md="9" className="item-grid grid-1">
                <img
                  className="item-image1"
                  src={singlePost.upload ? singlePost.upload : singlePost.image}
                />
                <div className="tablet-description">
                  <h2>Description</h2>
                  <p>{singlePost.description}</p>
                </div>
              </Grid>

              <Grid xs="12" md="3" className="grid-2">
                <Grid item xs="12" className="item-detail-basic-info">
                  <h2>{singlePost.title}</h2>
                  {singlePost.pickup_type === "drop-off" ? (
                    <>
                      <h4>
                        {singlePost.street_address}, {singlePost.location}
                      </h4>
                    </>
                  ) : (
                    <>
                      <h4>{singlePost.location}</h4>
                    </>
                  )}
                  <Tooltip
                  id={singlePost.pickup_type === "drop-off" ? "drop-off-type" : "pickup-type"}
                    title={
                      singlePost.pickup_type === "drop-off"
                        ? "This item will be left outside the donator's residence. Hurry quickly to grab this item, first come first serve!"
                        : "This item will need a scheduled pickup time with the donator. Please message the donator for a suitable time!"
                    }
                    arrow
                    PopperProps={{
                      sx: {
                        "& .MuiTooltip-tooltip": {
                          border: "solid black 1px",
                          color: "black",
                          backgroundColor: "white",
                          fontSize: "15px",
                          fontFamily: "poppins",
                          padding: "10px",
                        },
                      },
                    }}
                  >
                    <div className="pick-up-container">
                      {singlePost.pickup_type === "drop-off" ? (
                        <>
                          <img src={warningIcon} alt="warning-icon" />
                          <h3>Immediate Pickup</h3>
                        </>
                      ) : (
                        <>
                          <img src={checkIcon} alt="check-icon" />
                          <h3>Schedule Pickup</h3>
                        </>
                      )}
                    </div>
                  </Tooltip>
                </Grid>

                <Grid item xs="12">
                  <div className="item-basic-details">
                    <h3>Item Details</h3>
                    <div className="item-stats-container">
                      <div className="item-stat-container">
                        <AiOutlineCalendar className="stat-icon" />
                        <h4>
                          {" "}
                          {DateTime.fromISO(
                            singlePost.time_posted
                          ).toRelative()}
                        </h4>
                      </div>
                      <div className="item-stat-container middle-stat">
                        <FaWeightHanging className="stat-icon" />
                        <h4>{singlePost.weight} Lbs</h4>
                      </div>
                      <div className="item-stat-container">
                        <FaStarHalfAlt className="stat-icon" />
                        <h4>{singlePost.condition}</h4>
                      </div>
                    </div>
                  </div>
                </Grid>

                <Grid item xs="12" className="item-contact">
                  <h3>Posted by</h3>
                  <div className="avatar-container">
                    <div className="img-section">
                      <img
                        className="poster-profile-pic"
                        src={singlePost.profile_pic}
                      />
                    </div>
                    <div className="username-and-rating">
                      <h4 className="comment-username">
                        {singlePost.username}
                      </h4>
                    </div>
                  </div>
                  <div className="message-poster-btn-container">
                    {user.id === singlePost.user_id ? (
                      <>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            <div className="holder-view-messages">
                              <div className="grid-item-view-messages">
                                <div className="chat-box">
                                  {userContacts.map((contact) => (
                                    <div
                                      className="message-grid-holder"
                                      onClick={(e) =>
                                        navigate(
                                          `/chats/${singlePost.id}/${contact.user_id}/${user.id}`
                                        )
                                      }
                                    >
                                      <div className="user-profile-pic-holder">
                                        <img
                                          src={contact.profile_pic}
                                          className="contact-profile-pic-messages"
                                        />
                                      </div>
                                      <div className="right-side-messages-holder">
                                        <div className="top-portion-messages">
                                          <div className="top-left-username">
                                            {contact.username}
                                          </div>
                                          <div className="last-sent-message-time">
                                            {DateTime.fromISO(
                                              contact.time_posted
                                            ).toRelative()}
                                          </div>
                                        </div>
                                        <div className="last-sent-message-holder">
                                          <div className="last-sent-message-body">
                                            {contact.message_body}
                                          </div>
                                        </div>
                                        <div className="horizontal-divider-messages"></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </Box>
                        </Modal>
                        <Button
                          variant="contained"
                          className="message-poster-btn"
                          onClick={handleOpen}
                        >
                          View Messages
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        className="message-poster-btn"
                        onClick={(e) =>
                          navigate(
                            `/chats/${singlePost.id}/${user.id}/${singlePost.user_id}`
                          )
                        }
                      >
                        Message {singlePost.username}
                      </Button>
                    )}
                    <Button variant="contained" className="message-poster-btn" onClick={(e) => handleViewProfile(e)}>View Profile</Button>
                  </div>
                </Grid>
              </Grid>
              <Grid item xs="12">
                <div className="item-post-comment">
                  <Box>
                    <TextField
                      onChange={(e) => setNewComment(e.target.value)}
                      id="comment-input"
                      label="Comment..."
                      variant="standard"
                      htmlFor="comment-input"
                      value={newComment}
                    />
                  </Box>
                  <Button
                    variant="contained"
                    className="add-comment-btn"
                    size="small"
                    onClick={(e) => addComment(e)}
                  >
                    Comment
                  </Button>
                </div>
              </Grid>

              <Grid item xs="12" className="item-comments">
                {comments.length === 0 ? (
                  <h3 className="recent-comments-text">
                    Be the first to comment!
                  </h3>
                ) : (
                  <h3 className="recent-comments-text">Recent Comments</h3>
                )}
                <div className="details-comment">
                  {comments &&
                    comments.map((comment) => (
                      <Comments key={comment.id} comment={comment} />
                    ))}
                </div>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ItemsDetail;
