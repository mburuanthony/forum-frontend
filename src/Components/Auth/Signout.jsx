import { Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogOut } from "../../Redux/Actions/auth";
import { useSnackBar } from "../../Context/snackbarContext";

function Signout() {
  const dispatch = useDispatch();

  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();

  const logoutError = useSelector((state) => state?.auth?.error?.message);
  const UserSignOut = () => {
    dispatch(AuthLogOut());
    if (logoutError) {
      setSnackBarOpen(true);
      setSnackBarMessage("Unable to Sign out");
    } else {
      setSnackBarOpen(true);
      setSnackBarMessage("You were signed out");
    }
  };

  return (
    <Button
      variant="contained"
      disableElevation
      endIcon={<ExitToApp />}
      onClick={UserSignOut}
      sx={{
        position: "fixed",
        top: "10px",
        right: "10px",
        textTransform: "capitalize",
      }}
    >
      Sign Out
    </Button>
  );
}

export default Signout;
