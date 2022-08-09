import Breadcrumbs from "@mui/material/Breadcrumbs";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import { useEffect, useState, useContext } from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import { FaStarHalfAlt, FaWeightHanging } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import AppContext from "../../context/appContext";
import Comments from "../../components/comments/Comments";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import "./itemsDetail.css";

function ItemsDetail() {
  const { user } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('')
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
    e.preventDefault()
    const newCommentData = {
      comment_body: newComment,
      user_id: user.id,
      post_id: post_id,
    };
    const result = await fetch(`http://localhost:4000/posts/${post_id}/comments`, 
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCommentData)
    })

    const parsed = await result.json()
    parsed.username = user.username
    parsed.profile_pic = user.profile_pic
    setComments([parsed.data, ...comments])
    setNewComment('')
  }

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

  // console.log(comments[0].comment_body);
  return (
    <div>
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
      <div>
        <div className="item-image-and-right-side">
          <img className="item-image" src={singlePost.image} />
          <div className="right-side">
            <div className="post-title">{singlePost.title}</div>
            <div>{singlePost.location}, NY</div>
            <div className="item-details">Item Details</div>
            <div className="item-details-specs">
              <div className="calender-icon">
                <AiOutlineCalendar />
              </div>
              <div>{DateTime.fromISO(singlePost.time_posted).toRelative()}</div>
            </div>
            <div className="item-details-specs">
              <div className="weight-icon">
                <FaWeightHanging />
              </div>
              <div>50Lbs</div>
            </div>
            <div className="item-details-specs">
              <div className="condition-icon">
                <FaStarHalfAlt />
              </div>
              <div>Slightly Used</div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="bottom-portion">
        <div className="description">
          <div className="description-heading">Description</div>
          <div className="description-text">{singlePost.description}</div>
        </div>
        <div className="bottom-right-portion">
          <div className="posted-by">Posted By</div>
          <div className="poster-info">
            <img
              className="postProfileImg"
              src={singlePost.profile_pic}
              alt=""
            />
            <div>{singlePost.username}</div>
          </div>
          <Button
            variant="contained"
            className="message-poster-btn"
            size="small"
          >
            <MenuItem
              className="message-poster-text"
              onClick={(e) => navigate("/")}
            >
              Message Poster
            </MenuItem>
          </Button>
        </div>
      </div>
      <div className="comment-section">
        <div className="recent-comments-text">Recent Comments</div>
      </div>
      <div className="details-comment">
        {comments &&
          comments.map((comment) => (
            <Comments key={comment.id} comment={comment} />
          ))}
      </div>
      <div className="view-more-comments-btn-container">
        <Button
          variant="contained"
          className="view-more-comments-btn"
          size="small"
        >
          View Comments
        </Button>
      </div>
      <div className="post-comment">
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <img className="postProfileImg" src={singlePost.profile_pic} />
          <TextField onChange={(e) => setNewComment(e.target.value)} id="input-with-sx" label="Comment..." variant="standard" />
        </Box>
        <Button variant="contained" className="add-comment-btn" size="small" onClick={(e) => addComment(e)}>
          Comment
        </Button>
      </div>
      <Footer />
    </div>
  );
}

export default ItemsDetail;
