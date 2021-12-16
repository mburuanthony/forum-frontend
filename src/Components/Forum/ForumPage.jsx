import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetForum } from "../../Redux/Actions/forums";
import { ViewComments } from "../../Redux/Actions/comments";
import Comment from "./Comment";
import CreateComment from "../Comments/CreateComment";
import { colors } from "../../Styles/colors";
import { ArrowBack, Share } from "@mui/icons-material";
import { useHistory, useLocation } from "react-router-dom";
import { useSnackBar } from "../../Context/snackbarContext";

function ForumPage() {
  const { forum_id } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    dispatch(GetForum({ forum_id }));
    dispatch(ViewComments({ forum_id }));
  }, [dispatch, forum_id]);

  const forum = useSelector((state) => state?.forums?.forum);
  const forumComments = useSelector((state) => state?.comments?.comments);

  const { boxShadowColor, primary, lightDarkBgColor } = colors;

  const matches = useMediaQuery("(max-width:670px)");

  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();
  const copyLink = () => {
    navigator.clipboard.writeText(
      `https://forum-frontend.netlify.app${location.pathname}`
    );
    setSnackBarOpen(true);
    setSnackBarMessage("Link copied to clipboard");
  };

  return (
    <Box
      width={matches ? "100%" : "40rem"}
      margin={matches ? "0" : "1rem auto"}
      padding={matches ? "4px 0" : "4px"}
      sx={{
        backgroundColor: primary,
        boxShadow: boxShadowColor,
        borderRadius: "6px",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "4px 0 12px 0",
        }}
      >
        <Box display="flex" alignItems="center">
          <ArrowBack
            onClick={() => history.push("/")}
            sx={{ cursor: "pointer", margin: "0 10px 0 0" }}
          />
          {forum?.title}
        </Box>

        <Share
          sx={{
            cursor: "pointer",
            color: lightDarkBgColor,
            fontSize: "1.2rem",
          }}
          onClick={copyLink}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Grid container maxHeight="80vh" width="100%" overflow="auto">
          <Grid item width="100%" padding="4px 4px 0 4px">
            {forumComments?.map((reply) => (
              <Comment
                key={reply?.id}
                forum_id={forum_id}
                reply_id={reply?.id}
                reply_by={reply?.reply_by?.username}
                message={reply?.message}
                image={reply?.media}
                dateReplied={reply?.date_replied}
              />
            ))}
          </Grid>
        </Grid>

        <CreateComment forum_id={forum_id} />
      </Box>
    </Box>
  );
}

export default ForumPage;
