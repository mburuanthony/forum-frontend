import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";
import { AuthSignup } from "../../Redux/Actions/auth";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useSnackBar } from "../../Context/snackbarContext";

function Signup() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const signupError = useSelector((state) => state?.error?.error?.message);
  const authToken = useSelector((state) => state?.auth?.token);

  const CreateUser = () => {
    if (password !== confPassword) {
      setSnackBarOpen(true);
      setSnackBarMessage("Passwords do not match");
    } else if (
      username === "" ||
      email === "" ||
      password === "" ||
      confPassword === ""
    ) {
      setSnackBarOpen(true);
      setSnackBarMessage("Fill in required fields to Sign Up");
    } else {
      dispatch(AuthSignup({ username, email, password }));
    }
  };

  useEffect(() => {
    if (signupError?.username) {
      setSnackBarOpen(true);
      setSnackBarMessage("Username already taken");
    }
    if (signupError?.email) {
      setSnackBarOpen(true);
      setSnackBarMessage("Email already taken");
    }
    if (signupError?.username && signupError?.email) {
      setSnackBarOpen(true);
      setSnackBarMessage("Username and Email already taken");
    }
    if (authToken) {
      history.push("/");
    }
  }, [signupError, setSnackBarOpen, setSnackBarMessage, history, authToken]);

  return (
    <Box
      sx={{
        width: "22rem",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ display: "flex", alignItems: "center" }}>
        <ArrowBack
          onClick={() => history.push("/")}
          sx={{ cursor: "pointer", margin: "0 10px 0 0" }}
        />
        Signup
      </p>
      <TextField
        type="text"
        label="Username"
        variant="standard"
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <TextField
        type="email"
        label="Email"
        variant="standard"
        margin="none"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <TextField
        type="password"
        label="Password"
        variant="standard"
        margin="none"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <TextField
        type="password"
        label="Confirm Password"
        variant="standard"
        margin="none"
        value={confPassword}
        onChange={(e) => setConfPassword(e.target.value)}
      />
      <br />
      <Button
        variant="contained"
        disableElevation
        endIcon={<ArrowForward />}
        onClick={CreateUser}
        sx={{ borderRadius: "2rem", textTransform: "capitalize" }}
      >
        Sign Up
      </Button>
      <Link to="/login" style={{ margin: "1rem auto", fontFamily: "Roboto" }}>
        Have an account account? LogIn here
      </Link>
    </Box>
  );
}

export default Signup;
