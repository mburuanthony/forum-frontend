import { useState } from "react";
import { Box, Modal, Button, TextField, Typography } from "@mui/material";
import { CancelRounded, Forum } from "@mui/icons-material";
import { colors } from "../../Styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { CreateForum, ViewForums } from "../../Redux/Actions/forums";
import { useSnackBar } from "../../Context/snackbarContext";
import { useHistory } from "react-router-dom";

function ForumModal() {
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => {
    setTitle("");
    setMessage("");
    setModalOpen(false);
  };

  const authuser = useSelector((state) => state?.auth?.token);

  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();

  const addForum = () => {
    if (authuser) {
      dispatch(CreateForum({ title, message }));
      setSnackBarOpen(true);
      setSnackBarMessage("Forum Created");
      setModalOpen(false);
      setTitle("");
      setMessage("");
      setTimeout(() => {
        dispatch(ViewForums());
      }, 3500);
    } else {
      setSnackBarOpen(true);
      setSnackBarMessage("Sign In to Create forum");
      history.push("/login");
    }
  };

  const { primary, boxShadowColor } = colors;
  const modalstyle = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -10%)",
    width: "24rem",
    bgcolor: primary,
    border: 0,
    borderRadius: "6px",
    boxShadow: boxShadowColor,
    p: 3,
  };

  return (
    <Box>
      <Button
        variant="contained"
        disableElevation
        endIcon={<Forum />}
        onClick={handleOpen}
        sx={{ textTransform: "capitalize" }}
      >
        Create Forum
      </Button>

      <Modal
        open={modalOpen}
        onclose={handleClose}
        aria-labelledby="forum-modal"
        aria-describedby="create-forum-modal"
      >
        <Box sx={modalstyle}>
          <Typography>Create Forum</Typography>
          <input
            type="file"
            id="image"
            style={{ display: "none" }}
            accept="image/*"
          />

          <TextField
            variant="standard"
            fullWidth
            required
            margin="dense"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            variant="standard"
            fullWidth
            required
            margin="dense"
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <Box
            width="fit-content"
            display="flex"
            alignItems="center"
            margin="1rem auto"
          >
            <Button
              variant="contained"
              disableElevation
              endIcon={<Forum />}
              sx={{
                borderRadius: "25px",
                margin: "0 20px 0 0",
                textTransform: "capitalize",
              }}
              disabled={title === "" || message === "" ? true : false}
              onClick={addForum}
            >
              Create
            </Button>
            <Button
              endIcon={<CancelRounded />}
              sx={{ textTransform: "capitalize" }}
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default ForumModal;
