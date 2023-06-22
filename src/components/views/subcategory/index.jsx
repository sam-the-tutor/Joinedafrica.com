import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { post } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { getFilterForSubcategory } from "../../myAccount/createposts/util/postFiltering";
import ViewFeed from "./feed";
import FilterPost from "./filter";
import LargeScreenLeftBar from "./largescreenleftbar";
import { BoxCmp } from "./style";

export default function ViewSubcategory() {
  const [loading, setLoading] = useState(false);
  const { categoryName, subcategoryName } = useParams();
  const [posts, setPosts] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const result = await post.getAllPostingsInSubcategory(
        categoryName,
        subcategoryName
      );
      if (result?.err) {
        alert(getErrorMessage(result.err));
      } else {
        setPosts(result.ok);
      }
      setLoading(false);
    }
    init();
  }, []);
  return (
    <Box>
      <BoxCmp>
        <LargeScreenLeftBar
          getFilterForSubcategory={getFilterForSubcategory}
          subcategoryName={subcategoryName}
        />
        <ViewFeed
          posts={posts}
          subcategoryName={subcategoryName}
          loading={loading}
          setMobileOpen={setMobileOpen}
        />
      </BoxCmp>
      {/* filter posts in smaller screen size */}
      <FilterPost
        open={mobileOpen}
        close={() => setMobileOpen(false)}
        categoryName={categoryName}
        subcategoryName={subcategoryName}
        posts={posts}
        setPosts={setPosts}
        setLoading={setLoading}
      />
    </Box>
  );
}
