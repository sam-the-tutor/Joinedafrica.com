import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PropTypes } from "prop-types";

import { post } from "../../../../declarations/post";
import { getErrorMessage } from "../../../../util/ErrorMessages";
import PostingCard from "../../../../util/reuseableComponents/PostingCard";

function SimilarProducts({
  category,
  subcategory,
  currentPostId,
  setShouldReloadViewPostCmp = () => {},
}) {
  const [similarproducts, setSimilarProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function init() {
      setIsLoading(true);
      const subcategoryProducts = await post.getAllPostingsInSubcategory(
        category,
        subcategory
      );
      if (subcategoryProducts?.err) {
        alert(getErrorMessage(subcategoryProducts.err));
      } else {
        setSimilarProducts(
          subcategoryProducts.ok.filter(
            (product) => product.PostId != currentPostId
          )
        );
      }
      setIsLoading(false);
    }
    if (category && subcategory) {
      init();
    }
  }, []);
  return (
    <Box>
      <Typography variant="h5" sx={{ m: "30px 0" }}>
        Similar Products
      </Typography>
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid container spacing={{ xs: 2 }}>
          {similarproducts.map((product, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <PostingCard
                post={product}
                canOnlyMeSeeThisPost={false}
                setShouldReloadViewPostCmp={setShouldReloadViewPostCmp}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default SimilarProducts;

SimilarProducts.propTypes = {
  category: PropTypes.string,
  subcategory: PropTypes.string,
  currentPostId: PropTypes.string,
  setShouldReloadViewPostCmp: PropTypes.func,
};
