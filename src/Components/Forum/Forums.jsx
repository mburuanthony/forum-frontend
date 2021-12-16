import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { ViewForums } from "../../Redux/Actions/forums";
import Forum from "./Forum";
import ForumModal from "./ForumModal";

function Forums() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewForums());
  }, [dispatch]);

  const forums = useSelector((state) => state?.forums?.forums);

  return (
    <Box>
      <ForumModal />
      <Grid container direction="column">
        <Grid item sx={{ width: "30rem" }}>
          {forums.map((forum) => (
            <Forum
              key={forum?.id}
              forum_id={forum?.id}
              cretedBy={forum?.created_by?.username}
              title={forum?.title}
              message={forum?.message}
              image={forum?.media}
              dateCreated={forum?.date_created}
              lastEdit={forum?.last_edit}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Forums;
