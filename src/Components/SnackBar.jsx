import { Snackbar } from "@mui/material";
import { useSnackBar } from "../Context/snackbarContext";

function SnackBar() {
  const { snackBarOpen, setSnackBarOpen, snackBarMessage } = useSnackBar();

  const handleCLose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={snackBarOpen}
      autoHideDuration={4500}
      message={snackBarMessage}
      onClose={handleCLose}
    />
  );
}

export default SnackBar;
