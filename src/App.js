import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Box } from "@mui/material";
import Signup from "./Components/Auth/Signup";
import Login from "./Components/Auth/Login";
import Signout from "./Components/Auth/Signout";
import Forums from "./Components/Forum/Forums";
import ForumPage from "./Components/Forum/ForumPage";
import { SnackBarProvider } from "./Context/snackbarContext";
import SnackBar from "./Components/SnackBar";
import { ProgressBarProvider } from "./Context/progressBarContext";
import { useDispatch, useSelector } from "react-redux";
import { GetAuthUser } from "./Redux/Actions/auth";

function App() {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state?.auth?.token);
  if (authToken) {
    dispatch(GetAuthUser());
  }

  return (
    <Box>
      <SnackBarProvider>
        <ProgressBarProvider>
          {authToken && <Signout />}
          <Router>
            <Switch>
              <Route path="/" exact component={Forums} />
              <Route path="/forum/:forum_id" component={ForumPage} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
            </Switch>
          </Router>
          <SnackBar />
        </ProgressBarProvider>
      </SnackBarProvider>
    </Box>
  );
}

export default App;
