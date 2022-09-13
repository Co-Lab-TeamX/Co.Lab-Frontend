import DeleteIcon from "@mui/icons-material/Delete";
import { CardActionArea, Grid, Tooltip } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { DateTime } from "luxon";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext.jsx";
import checkIcon from "../../images/CircleWavyCheck.svg";
import warningIcon from "../../images/CircleWavyWarning.svg";

function Posts({ post }) {
  const { user, setPosts, posts } = useContext(AppContext);

  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://colab-free-up.herokuapp.com/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const filtered = posts.filter((p) => p.id != post.id);
      setPosts(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item xs="12" md="4" className="item-card-grid-container">
      <Card className="item-card">
        <div onClick={(e) => navigate(`/details/${post.id}`)}>
          <CardActionArea>
            <CardMedia
              className="post-images"
              width="300px"
              height="172px"
              component="img"
              image={!post.upload ? post.image : post.upload}
              alt="post_image"
            />
            <CardContent>
              <div className="card-content-1">
                <h3>{post.title}</h3>
                <h4>{post.location}</h4>
              </div>
              <Tooltip
                title={
                  post.pickup_type === "drop-off"
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
                <div className="card-content-2">
                  <div className="pick-up-container">
                    {post.pickup_type === "drop-off" ? (
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
                  <h4>{DateTime.fromISO(post.time_posted).toRelative()}</h4>
                </div>
              </Tooltip>

              <Typography
                gutterBottom
                variant="h6"
                component="div"
              ></Typography>
              <Typography variant="body2" color="text.secondary"></Typography>
            </CardContent>
          </CardActionArea>
        </div>
        <div className="delete-btn">
          {post.user_id === user.id && (
            <IconButton aria-label="delete">
              <DeleteIcon
                className="delete-icon"
                type="submit"
                onClick={handleDelete}
              />
            </IconButton>
          )}
        </div>
      </Card>
    </Grid>
  );
}

export default Posts;
