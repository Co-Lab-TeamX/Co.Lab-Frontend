import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";
import loginPicture from "../../images/signup-pic-freeUp.png";
import { MdLocationOn } from "react-icons/md";
import "./newLogin.css";

function NewLogin() {
  const { setUser, setIsAuth, user } = useContext(AppContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter login information.")
      return;
    }

    const loginData = {
      email,
      password,
    };

    async function loginUser() {
      // const res = await fetch(`http://localhost:4000/login`, {
      const res = await fetch(`https://colab-free-up.herokuapp.com/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await res.json();

      if (!data.token) {
        setErrorMessage(data.message);
        setIsAuth(false);
        return;
      }

      // async function loginUser() {
      //   const res = await fetch(`https://colab-free-up.herokuapp.com/login`, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(loginData),
      //   });
      //   const data = await res.json();
      //   if (!data.token) {
      //     setIsAuth(false);
      //     return;
      //   }

      window.localStorage.setItem("token", data.token);
      window.localStorage.setItem("user", JSON.stringify(data.user));
      window.localStorage.setItem("isLoggedIn", true)

      setIsAuth(true);
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
          FreeUP
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
        <Grid container component="main" sx={{ height: "100vh" }}>
          <CssBaseline />
          <Grid
            className="log-in-picture"
            item
            xs={0}
            sm={4}
            md={7}
            sx={{
              backgroundImage: `url(${loginPicture})`,
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
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
                onSubmit={handleLogin}
                sx={{ mt: 1 }}
              >
                <div className="sign-in-text">
                  Sign in
                </div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />

                {/* Error Message */}
                {errorMessage && (
                  <Box sx={{ marginTop: 1, color: 'red' }}>
                    {errorMessage}
                  </Box>
                )}

                <Button
                  className="sign-in-btn"
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, bgcolor: "#02A7A7" }}
                  onClick={handleLogin}
                >
                  Sign In
                </Button>
                <Grid container className="signIn">
                  <Grid item className="already-have-an-account">
                    <div
                      className="link-to-signup-page"
                      onClick={(e) => navigate("/register")}
                    >
                      {"Not a member? Sign Up"}
                    </div>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 3 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default NewLogin;
