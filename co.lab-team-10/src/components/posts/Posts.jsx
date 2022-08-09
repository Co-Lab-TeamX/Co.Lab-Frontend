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
import checkIcon from '../../images/CircleWavyCheck.svg'
import warningIcon from '../../images/CircleWavyWarning.svg'

function Posts({ post }) {
  const { user, setUser } = useContext(AppContext);

  const navigate = useNavigate();

  return (

    <Grid item xs='12' md='4' className="item-card-grid-container">
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
                  <img src={warningIcon} alt="warning-icon" />
                  <h3>Immediate Pickup</h3>
                </div>
                <h4>posted</h4>
              </div>
              <Typography gutterBottom variant="h6" component="div">
                {/* {post.title} */}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* {post.location} */}
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
