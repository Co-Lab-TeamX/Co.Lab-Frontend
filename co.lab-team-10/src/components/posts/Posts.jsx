import React from "react";
import "./posts.css";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Posts({ post }) {
  return (
    <div className="card-container">
    <Card sx={{ maxWidth: 345 }}>
        <div className="item-div">
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
          </Typography>
        </CardContent>
      </CardActionArea>
      </div>
    </Card>
    </div>
  );
}

export default Posts;
