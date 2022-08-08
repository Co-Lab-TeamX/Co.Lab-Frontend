import React from "react";
import "./posts.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MdLocationOn } from "react-icons/md";
import AppContext from "../../context/appContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Posts({ post }) {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div className="card-container">
      <Card sx={{ maxWidth: 345 }} onClick={(e) => console.log(post)}>
        <div className="item-div">
          <div onClick={(e) => navigate(`/details/${post.id}`)} >
            <CardActionArea>
              <CardMedia
                className="post-images"
                height="300px"
                component="img"
                image={post.image}
                alt="post_image"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.location}
                  {/* {post.user_id === user.id && (
              <IconButton aria-label="delete">
                <MdLocationOn
                  className="delete-comment"
                  type="submit"
                  // onClick={handleDelete}
                />
              </IconButton>
            )} */}
                </Typography>
              </CardContent>
            </CardActionArea>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Posts;
