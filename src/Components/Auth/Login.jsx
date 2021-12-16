import { useState, useEffect } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AuthLogin } from "../../Redux/Actions/auth";
import LoginIcon from "@mui/icons-material/LoginRounded";
import { ArrowBack } from "@mui/icons-material";
import { useSnackBar } from "../../Context/snackbarContext";

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginError = useSelector((state) => state?.error?.error?.message);
  const authToken = useSelector((state) => state?.auth?.token);

  const UserLogin = () => {
    if (username === "" || password === "") {
      setSnackBarOpen(true);
      setSnackBarMessage("Provide credentials to login");
    } else {
      dispatch(AuthLogin({ username, password }));
    }
  };

  useEffect(() => {
    if (loginError) {
      setSnackBarOpen(true);
      setSnackBarMessage("Unable to Sign In");
    }
    if (authToken) {
      history.push("/");
    }
  }, [loginError, setSnackBarOpen, setSnackBarMessage, history, authToken]);

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
        Login
      </p>

      <TextField
        type="text"
        label="Username"
        margin="normal"
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextField
        type="password"
        label="Password"
        variant="standard"
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button
        variant="contained"
        disableElevation
        endIcon={<LoginIcon />}
        onClick={UserLogin}
        sx={{
          margin: "1rem 0",
          borderRadius: "2rem",
          textTransform: "capitalize",
          fontSize: "1rem",
        }}
      >
        Log In
      </Button>
      <Link to="/signup" style={{ margin: "0 auto", fontFamily: "Roboto" }}>
        Do not have an account? Signup here
      </Link>
    </Box>
  );
}

export default Login;
