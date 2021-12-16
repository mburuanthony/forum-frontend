import { useState } from "react";
import { Box, Button, useMediaQuery } from "@mui/material";
import { SendRounded } from "@mui/icons-material";
import { colors } from "../../Styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { AddComment, ViewComments } from "../../Redux/Actions/comments";
import { useHistory } from "react-router-dom";
import { useSnackBar } from "../../Context/snackbarContext";

function CreateComment(props) {
  const { forum_id } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();
  const authUser = useSelector((state) => state?.auth?.token);

  const [message, setMessage] = useState("");

  const submitComment = () => {
    if (authUser) {
      dispatch(AddComment({ forum_id, message }));
      setMessage("");
      setSnackBarOpen(true);
      setSnackBarMessage("Comment sent");
      setTimeout(() => {
        dispatch(ViewComments({ forum_id }));
      }, 3500);
    } else {
      setSnackBarOpen(true);
      setSnackBarMessage("Sign In to comment");
      history.push("/login");
    }
  };

  const { primary, primaryLight } = colors;

  const matches = useMediaQuery("(max-width:670px)");

  return (
    <Box display="flex" flexDirection="column">
      <Box
        padding={matches ? "0 4px 0 4px" : "6px 0 6px 0"}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          height: "3rem",
          backgroundColor: primary,
          border: 0,
          borderTop: `1px solid ${primaryLight}`,
        }}
      >
        <input
          placeholder="Send your comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{
            width: "85%",
            height: "80%",
            margin: "0 0 0 10px",
            border: 0,
            outline: "none",
            fontSize: "14px",
          }}
        />

        <Button
          endIcon={<SendRounded />}
          sx={{ margin: "0 8px 0 6px", textTransform: "capitalize" }}
          disableElevation
          onClick={submitComment}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
}

export default CreateComment;
