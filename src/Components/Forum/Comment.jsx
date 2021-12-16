import { Typography, Box } from "@mui/material";
import { DeleteRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteComment, ViewComments } from "../../Redux/Actions/comments";
import { useSnackBar } from "../../Context/snackbarContext";
import { colors } from "../../Styles/colors";
import { formatDistanceToNow } from "date-fns";

function Comment(props) {
  const { forum_id, reply_id, reply_by, message, image, dateReplied } = props;

  const dispatch = useDispatch();
  const authuser = useSelector((state) => state?.auth?.user);

  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();
  const deleteReply = () => {
    dispatch(DeleteComment({ forum_id, comment_id: reply_id }));
    setSnackBarOpen(true);
    setSnackBarMessage("Comment Deleted");
    setTimeout(() => {
      dispatch(ViewComments({ forum_id }));
    }, 3500);
  };

  const dateFormatted = formatDistanceToNow(new Date(dateReplied), {
    addSuffix: true,
    includeSeconds: true,
  });

  const { lightDarkBgColor, lightText, primaryLight } = colors;

  return (
    <Box
      margin="0 20px 16px 0"
      width="100%"
      padding="4px 0"
      border={0}
      borderBottom={`1px solid ${primaryLight}`}
    >
      {authuser?.username === reply_by && (
        <DeleteRounded
          sx={{
            cursor: "pointer",
            float: "right",
            color: lightText,
            transition: "all ease .4s",
            "&:hover": {
              color: lightDarkBgColor,
            },
          }}
          onClick={deleteReply}
          titleAccess="Delete this reply"
        />
      )}
      <Box display="flex" alignItems="center">
        <Typography fontSize="1rem" fontWeight={600} fontFamily="Roboto">
          {reply_by ?? "account-deleted"}
        </Typography>
        <Typography fontSize="12px" sx={{ margin: "0 0 0 6px" }}>
          {dateFormatted}
        </Typography>
      </Box>
      <Box>
        {message && <span>{message}</span>}
        {image && <img src={image} alt={message} />}
      </Box>
    </Box>
  );
}

export default Comment;
