import { Container, Grid, Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
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
import warningIcon from "../../images/CircleWavyWarning.svg";
import "./itemsDetail.css";

function ItemsDetail() {
  const { user } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [singlePost, setSinglePost] = useState({});
  const { post_id } = useParams();

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

  const addComment = async (e) => {
    e.preventDefault();
    const newCommentData = {
      comment_body: newComment,
      user_id: user.id,
      post_id: post_id,
    };

    if (newCommentData.comment_body === '') return 

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
    const parsed = await result.json();
    parsed.data.username = user.username;
    parsed.data.profile_pic = user.profile_pic;
    setComments([parsed.data, ...comments]);
    setNewComment("");
  };

  //   useEffect(() => {
  //     if (!post_id) return;
  //     fetch(`https://colab-free-up.herokuapp.com/posts/${post_id}`)
  //       .then((response) => response.json())
  //       .then((data) => setSinglePost(data.data));
  //   }, [post_id]);
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

  const navigate = useNavigate();

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
                <img className="item-image" src={singlePost.image} />
                {/* on phone sizes the display is none, tablet is block */}
                <div className="tablet-description">
                  <h2>Description</h2>
                  {/* <p>{singlePost.description}</p> */}
                  <p>
                    {singlePost.description}
                  </p>
                </div>
              </Grid>

              <Grid xs="12" md="3" className="grid-2">
                <Grid item xs="12" className="item-detail-basic-info">
                  <h2>{singlePost.title}</h2>
                  {/* { singlePost.location }  */}
                  <h4>{singlePost.location} NY</h4>
                  <div className="pick-up-container">
                    <img src={warningIcon} alt="warning-icon" />
                    <h3>Immediate Pickup</h3>
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
                <Grid item xs="12" className="item-description">
                  <h2>Description</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Officiis illum deleniti provident minima reiciendis quidem
                    omnis optio distinctio quaerat accusantium?
                  </p>
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
                      <Rating name="read-only" value={4} readOnly />
                    </div>
                  </div>
                  <div className="message-poster-btn-container">
                    <Button
                      variant="contained"
                      className="message-poster-btn"
                      size="small"
                    >
                      <MenuItem
                        className="message-poster-text"
                        onClick={(e) => navigate(`/chats/${singlePost.id}/${user.id}`)}
                      >
                        Message Poster
                      </MenuItem>
                    </Button>
                  </div>
                </Grid>
              </Grid>

              {/* bottom secttin for tablet */}
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
                <h3 className="recent-comments-text">Recent Comments</h3>
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
