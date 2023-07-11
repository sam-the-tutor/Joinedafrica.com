import { Box, Grid, Typography, Paper } from "@mui/material";
import { PropTypes } from "prop-types";
import React from "react";
import ReactImageGallery from "react-image-gallery";

export default function LeftComponent({
  post,
  postImages,
  ProductSpecification,
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
        {Object.entries(ProductSpecification).map(
          ([specification, value], index) => (
            <Box
              style={{
                display: "flex",
              }}
              key={index}
            >
              <Typography style={{ marginRight: "10px" }}>
                {specification.replaceAll("_", " ")} :
              </Typography>
              <Typography>{value}</Typography>
            </Box>
          )
        )}
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
};
