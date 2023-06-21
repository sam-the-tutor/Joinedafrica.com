import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { PropTypes } from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router";

import { AppContext } from "../../../context";
import { post as postCanister } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { getFromSessionStorage } from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import {
  extractProductSpecification,
  getPostImages,
  sendMessage,
} from "./util";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [postImages, setPostImages] = useState([]);
  const [productSpecification, setProductSpecification] = useState({});

  useEffect(() => {
    async function getPost() {
      setLoading(true);
      let response = await postCanister.getPost(postId);
      if (response?.ok) {
        setPost(response.ok);
      } else {
        alert(getErrorMessage(response.err));
        setLoading(false);
        return;
      }
      const images = await getPostImages(response.ok);
      setPostImages(images);
      setProductSpecification(extractProductSpecification(response.ok));
      setLoading(false);
    }
    getPost();
  }, []);

  return (
    <Box>
      <Toolbar />
      <Container
        style={{
          marginBottom: "100px",
          marginTop: "50px",
        }}
      >
        {loading ? (
          LoadingCmp(loading)
        ) : (
          <>
            <Grid container spacing={3}>
              <LeftComponent
                post={post}
                postImages={postImages}
                productSpecification={productSpecification}
              />
              <RightComponent post={post} />
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
function RightComponent({ post }) {
  const [userMessage, setUserMessage] = useState("");
  const { firebaseDB } = useContext(AppContext);
  const [sendMessageProgress, setSendMessageProgress] = useState(null);

  // sending message to the creator of the post
  async function handleMessage() {
    if (sessionStorage.getItem("principalId") == null) {
      //user has to login or create a profile before they can message someoone
      alert(
        "You have to log in or create a profile to be able to send a message"
      );
      return;
    }
    const loggedInUserPrincipalId = getFromSessionStorage("principalId", true);
    if (post.creatorOfPostId == loggedInUserPrincipalId) {
      alert("You can't message youself!");
    } else {
      setSendMessageProgress(
        <Box>
          <CircularProgress size={35} />
          <Typography>Sending...</Typography>
        </Box>
      );
      const result = await sendMessage(userMessage, firebaseDB, post);
      if (result?.err) {
        alert("error");
      } else {
        setSendMessageProgress(
          <Box>
            <CheckCircleIcon fontSize="medium" />
            <Typography>Message sent</Typography>
          </Box>
        );
      }
    }
  }

  return (
    <Grid item md={3} xs={12}>
      <Box style={{ display: "flex", flexDirection: "column" }}>
        <TextField
          placeholder="Send a message to the creator of the post."
          multiline
          rows={7}
          style={{ marginBottom: "15px" }}
          onChange={(event) => setUserMessage(event.target.value)}
        />
        <Button
          variant="outlined"
          style={{ height: "50px" }}
          onClick={handleMessage}
        >
          {sendMessageProgress || "Send message"}
        </Button>
      </Box>
    </Grid>
  );
}
function LeftComponent({ post, postImages, productSpecification }) {
  return (
    <Grid item md={9} xs={12}>
      <Box style={{ marginBottom: "20px" }}>
        <Typography variant="h5" gutterBottom>
          {post.productTitle}
        </Typography>
        <Typography variant="h6" style={{ color: "#37a864" }}>
          {post.amount} BTC
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
        {Object.entries(productSpecification).map(
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
          <Typography>{post.productDescription}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}
RightComponent.propTypes = {
  post: PropTypes.object,
};

LeftComponent.propTypes = {
  post: PropTypes.object,
  postImages: PropTypes.array,
  productSpecification: PropTypes.object,
};
