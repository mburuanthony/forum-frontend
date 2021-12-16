import { Box, Typography, useMediaQuery } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { colors } from "../../Styles/colors";
import { DeleteRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { DeleteForum, ViewForums } from "../../Redux/Actions/forums";
import { useSnackBar } from "../../Context/snackbarContext";

function Forum(props) {
  const { forum_id, cretedBy, title, message, image, dateCreated, lastEdit } =
    props;

  const dispatch = useDispatch();
  const history = useHistory();
  const authuser = useSelector((state) => state?.auth?.user);

  const formattedDate = formatDistanceToNow(new Date(dateCreated), {
    addSuffix: true,
    includeSeconds: true,
  });

  const { setSnackBarOpen, setSnackBarMessage } = useSnackBar();
  const CancelForum = () => {
    dispatch(DeleteForum({ forum_id }));
    setSnackBarOpen(true);
    setSnackBarMessage("Forum Deleted");
    setTimeout(() => {
      dispatch(ViewForums());
    }, 3500);
  };

  const matches = useMediaQuery("(max-width:670px)");

  const {
    primary,
    boxShadowColor,
    darkBgColor,
    primaryLight,
    lightDarkBgColor,
    lightText,
  } = colors;

  return (
    <Box
      width={matches ? "22rem" : "100%"}
      margin="10px 0"
      style={{
        padding: "2px 4px 2px 0",
        border: 0,
        borderRadius: "8px",
        backgroundColor: primary,
        boxShadow: boxShadowColor,
        cursor: "pointer",
      }}
      onClick={() => history.push(`/forum/${forum_id}`)}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Link
            style={{
              fontSize: "1rem",
              color: darkBgColor,
              textDecoration: "none",
              padding: "2px 4px 2px 2px",
              border: 0,
              borderBottom: `1px solid ${primaryLight}`,
              borderRadius: "0",
              fontFamily: "Roboto",
            }}
            to={`/forum/${forum_id}`}
          >
            {title}
          </Link>

          <span
            style={{
              display: "flex",
              alignItems: "center",
              margin: "0 0 0 30px",
              fontFamily: "Roboto",
            }}
          >
            {formattedDate}
            {dateCreated !== lastEdit && (
              <Typography
                fontSize="12px"
                sx={{
                  width: "fit-content",
                  padding: "0 4px",
                  textDecoration: "underline",
                  borderRadius: "0.5rem",
                }}
              >
                edited
              </Typography>
            )}
          </span>
        </p>

        {authuser?.username === cretedBy && (
          <DeleteRounded
            sx={{
              cursor: "pointer",
              color: lightText,
              transition: "all ease .4s",
              "&:hover": {
                color: lightDarkBgColor,
              },
            }}
            onClick={CancelForum}
          />
        )}
      </Box>
      <hr style={{ border: `1px solid ${primaryLight}` }} />
      {message && <p style={{ padding: "2px 0", margin: "4px" }}>{message}</p>}
      {image && <img src={image} alt={title} />}
    </Box>
  );
}

export default Forum;
