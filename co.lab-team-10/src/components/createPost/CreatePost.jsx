import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { MdLocationOn } from "react-icons/md";
import AppContext from "../../context/appContext.jsx";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import "./createPost.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function CreatePost() {
  const { user, setPosts, posts } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createNewPost = async (e) => {
    e.preventDefault();
    const newPostData = {
      user_id: user.id,
      title,
      description,
      image,
      location: "",
    };

    if (newPostData.title === "" || newPostData.image === "") {
      handleClose();
      return;
    }
    const result = await fetch("http://localhost:4000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPostData),
    });

    const parsed = await result.json();
    console.log(parsed)
    setPosts([parsed.data, ...posts]);

    setTitle("");
    setDescription("");
    setImage("");
    handleClose();
  };

  const navigate = useNavigate();

  return (
    <>
      {user && (
        <div className="open-modal-btn">
          <Button variant="contained" className="create-post-btn" size="small">
              <div
                className="nav-link"
                onClick={handleOpen}
              >
                Add Listing
              </div>
              </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="post-logo-and-name">
                  <Typography component="h1" variant="h5">
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      <Typography></Typography>
                      <Typography
                        className="logo-and-name"
                        variant="h5"
                        noWrap
                        component="a"
                        sx={{
                          mr: 2,
                          display: { xs: "flex" },
                          flexGrow: 1,
                          fontFamily: "poppins",
                          fontWeight: 700,
                          color: "#455a64",
                          textDecoration: "none",
                        }}
                      >
                        <Typography className="pin">
                        <MdLocationOn />
                        </Typography>
                        Free
                        <Typography className="up">Up</Typography>
                      </Typography>
                    </Typography>
                  </Typography>
                </div>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid
                    container
                    spacing={2}
                    sx={{ borderColor: "error.main" }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{ borderColor: "error.main" }}
                      onChange={(e) => setTitle(e.target.value)}
                    >
                      <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="Title"
                        autoFocus
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      onChange={(e) => setDescription(e.target.value)}
                    >
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Description"
                        name="email"
                        autoComplete="email"
                      />
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      onChange={(e) => setImage(e.target.value)}
                    >
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Image"
                        id="image"
                        autoComplete="new-password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    className="post-btn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={createNewPost}
                  >
                    Create Listing
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </div>
      )}{" "}
      {!user && (
        <div className="open-modal-btn">
          <div className="modal-title">
            <Button onClick={handleOpen} className="modal-title">
              Create Posting
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                SIGN IN TO POST LISTING
              </Typography>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
}

export default CreatePost;