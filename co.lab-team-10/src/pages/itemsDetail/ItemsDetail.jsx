import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import "./itemsDetail.css";

function ItemsDetail() {
  const { post_id } = useParams();
  const [singlePost, setSinglePost] = useState({});

  useEffect(() => {
    if (!post_id) return;
    fetch(`http://localhost:4000/posts/${post_id}`)
      .then((response) => response.json())
      .then((data) => setSinglePost(data.data));
  }, [post_id]);

  const navigate = useNavigate();

  console.log(singlePost);
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
        {singlePost.title}
        {singlePost.description}
        {singlePost.title}
      </div>
    </div>
  );
}

export default ItemsDetail;
