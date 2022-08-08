import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Grid } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { MdLocationOn } from "react-icons/md";
import AppContext from "../../context/appContext.jsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Posts({ post }) {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  //   height: 172.1197967529297px;
  // width: 298.9448547363281px;
  // left: 0px;
  // top: 0px;
  // border-radius: 0px;

  return (

    <Grid item xs='8'>
      {/* sx={{ maxWidth: 345 }} */}
      {/* onClick={(e) => console.log(post)} */}
      <Card className="item-card">
        <div onClick={(e) => navigate(`/details/${post.id}`)} >
          <CardActionArea>
            <CardMedia
              className="post-images"
              width="300px"
              height="172px"
              component="img"
              image={post.image}
              alt="post_image"
            />
            <CardContent>
              <div className="card-content-1">
                <h3>{post.title}</h3>
                <h4>location</h4>
              </div>
              <div className="card-content-2">
                <div className="pick-up-container">
                  <h4>icon-</h4>
                  <h4>pick up type</h4>
                </div>
                <h4>posted</h4>
              </div>
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
      </Card>
    </Grid >
  );
}

export default Posts;
