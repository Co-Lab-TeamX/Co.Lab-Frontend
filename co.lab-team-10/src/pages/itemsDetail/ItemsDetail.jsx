import { Container, Grid, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
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
import Modal from "@mui/material/Modal";
import warningIcon from "../../images/CircleWavyWarning.svg";

function ItemsDetail() {
  const { user, setIsAuth, setUser } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [singlePost, setSinglePost] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userContacts, setUserContacts] = useState([]);
  const { post_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    fetchUserContacts();
  }, []);

  const fetchUserContacts = async () => {
    const result = await fetch(
      `http://localhost:4000/details/messages/${user.id}`
    );
    const parsed = await result.json();
    setUserContacts(parsed);
  };

  // Prevent losing user on refresh
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
    fetch(`http://localhost:4000/posts/${post_id}`)
      .then((response) => response.json())
      .then((data) => setSinglePost(data.data));
  }, [post_id]);

  useEffect(() => {
    fetch(`http://localhost:4000/posts/${post_id}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data.data));
  }, []);
  // useEffect(() => {
  //   if (!post_id) return;
  //   fetch(`https://colab-free-up.herokuapp.com/posts/${post_id}`)
  //     .then((response) => response.json())
  //     .then((data) => setSinglePost(data.data));
  // }, [post_id]);

  // useEffect(() => {
  //   fetch(`https://colab-free-up.herokuapp.com/posts/${post_id}/comments`)
  //     .then((response) => response.json())
  //     .then((data) => setComments(data.data));
  // }, []);

  const addComment = async (e) => {
    e.preventDefault();
    const newCommentData = {
      comment_body: newComment,
      user_id: user.id,
      post_id: post_id,
    };

    if (newCommentData.comment_body === "") return;

    const result = await fetch(
      `http://localhost:4000/posts/${post_id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCommentData),
      }
    );
    // const result = await fetch(
    //   `https://colab-free-up.herokuapp.com/posts/${post_id}/comments`,
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(newCommentData),
    //   }
    // );
    const parsed = await result.json();
    parsed.data.username = user.username;
    parsed.data.profile_pic = user.profile_pic;
    setComments([parsed.data, ...comments]);
    setNewComment("");
  };

  // useEffect(() => {
  //   if (!post_id) return;
  //   fetch(`https://colab-free-up.herokuapp.com/posts/${post_id}`)
  //     .then((response) => response.json())
  //     .then((data) => setSinglePost(data.data));
  // }, [post_id]);
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
    border: "2px solid #02a7a7",
    boxShadow: 24,
  };

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

        {/* main content */}
        <div className="item-detail-main-container">
          <Container className="item-detail-main-container">
            <Grid container className="item-detail-container">
              <Grid item xs="12" md="9" className="item-grid grid-1">
                <img
                  className="item-image1"
                  src={singlePost.upload ? singlePost.upload : singlePost.image}
                />
                {/* on phone sizes the display is none, tablet is block */}
                <div className="tablet-description">
                  <h2>Description</h2>
                  <p>{singlePost.description}</p>
                </div>
              </Grid>

              <Grid xs="12" md="3" className="grid-2">
                <Grid item xs="12" className="item-detail-basic-info">
                  <h2>{singlePost.title}</h2>
                  {/* { singlePost.location }  */}
                  <h4>{singlePost.location} NY</h4>
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

                {/* on phone sizes the display is block, tablet is none */}
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
                      <Rating name="read-only" value={4} readOnly />
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
          <div className="top-portion-view-messages">
            <div className="view-messages-text">Messages</div>
          </div>
          <div className="horizontal-row"></div>
          <div className="chat-box">
            {userContacts.map((contact) => (
              <>
                <div
                  className="each-contact-view-message"
                  onClick={(e) => navigate(`/chats/${contact.id}/${user.id}`)}
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
                          </Box>
                        </Modal>
                        <Button
                          variant="contained"
                          className="message-poster-btn"
                          // onClick={(e) =>
                          //   navigate(`/details/messages/${user.id}`)
                          // }
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
                          navigate(`/chats/${singlePost.user_id}/${user.id}`)
                        }
                      >
                        Message Poster
                      </Button>
                    )}
                  </div>
                </Grid>
              </Grid>

              {/* bottom section for tablet */}
              <Grid item xs="12">
                <div className="item-post-comment">
                  <Box>
                    {/* <img className="postProfileImg" src={singlePost.profile_pic} /> */}
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
                {/* <h3 className="recent-comments-text">Recent Comments</h3> */}
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
