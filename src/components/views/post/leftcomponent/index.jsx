import { Box, Grid, Paper, Typography } from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";
import ReactImageGallery from "react-image-gallery";
import CreateSpecification from "./createSpecification";

export default function LeftComponent({
  post,
  postImages,
  productSpecification,
  isUserAdmin = false,
}) {
  return (
    <Grid item md={9} xs={12}>
      <Box style={{ marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          {post.Title}
        </Typography>
        <Typography variant="h6" style={{ color: "#37a864" }}>
          {post.Amount} BTC
        </Typography>
      </Box>
      <ReactImageGallery items={postImages} />
      <Box style={{ margin: "30px 0", padding: "24px" }} component={Paper}>
        <Typography
          variant="h6"
          style={{
            margin: "20px 0",
            color: "rgba(255, 255, 255, 0.7)",
          }}
        >
          Specification
        </Typography>

        {isUserAdmin &&
          CreateSpecification(
            Object.entries(post).filter(
              ([attribute]) =>
                attribute == "Date" ||
                attribute == "Location" ||
                attribute == "Category" ||
                attribute == "Subcategory"
            )
          )}

        {CreateSpecification(Object.entries(productSpecification))}
        <Box>
          <Typography
            variant="h6"
            style={{
              margin: "20px 0",
              color: "rgba(255, 255, 255, 0.7)",
            }}
          >
            Description
          </Typography>
          <Typography>{post.Description}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}

LeftComponent.propTypes = {
  post: PropTypes.object,
  postImages: PropTypes.array,
  productSpecification: PropTypes.object,
  isUserAdmin: PropTypes.bool,
};
