import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { createAuthenticatedActor } from "../../canisters/createActor";
import { canisterId, createActor } from "../../declarations/post";
import { getErrorMessage } from "../../util/ErrorMessages";

export default function Admin() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function init() {
      setLoading(true);
      const actor = await createAuthenticatedActor(canisterId, createActor);
      const result = await actor.getPostsOnReview();
      if (result?.err) {
        getErrorMessage(result.err);
      } else {
        setPosts(result.ok);
      }
      setLoading(false);
    }
    init();
  });
  return <Box>admin page</Box>;
}
