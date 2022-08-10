import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { MdLocationOn } from "react-icons/md";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";
import "./register.css"

function Register() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
      email: email,
    };

    const result = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });
    const parsed = await result.json();
    // navigate("/login", { replace: true });
    handleLogin(e)
    navigate("/feed", { replace: true });

  };

  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password,
    };

    async function loginUser() {
      const res = await fetch(`http://localhost:4000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();
      if (!data.token) {
        return;
      }

      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.user));
      window.localStorage.setItem("isLoggedIn", true)

      setUser(data.user);
      navigate("/feed");
    }
    loginUser();
    setEmail("");
    setPassword("");
  };

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Free Up
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  const theme = createTheme();

  return (
    <>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="sign-in-logo-and-name">
                <Typography className="pin">
                  <MdLocationOn />
                </Typography>
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
                  onClick={(e) => navigate("/")}
                >
                  Free
                  <Typography className="up">Up</Typography>
                </Typography>
              </div>
         
          <Box
            component="form"
            noValidate
            onSubmit={handleSignup}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} onChange={(e) => setUsername(e.target.value)}>
              <Typography className="register-sign-up-text" component="h1" variant="h5">
            Sign up
          </Typography>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  label="User Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} onChange={(e) => setEmail(e.target.value)}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12} onChange={(e) => setPassword(e.target.value)}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
              <Button
                className="sign-in-btn"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2}}
                onClick={handleSignup}
              >
                Sign Up
              </Button>

            <Grid container className="signIn">
              <Grid item className="already-have-an-account">
                <div className="link-to-sign-in-page" onClick={(e) => navigate('/login')}>
                  Already a member? Sign in
                </div>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  )
}

export default Register