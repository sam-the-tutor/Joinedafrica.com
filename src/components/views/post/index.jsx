import { Box, Container, Grid, Toolbar, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router";

import { post as postCanister } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import LeftComponent from "./leftcomponent";
import RightComponent from "./rightcomponent";
import { getPostImages } from "./leftcomponent/util";
import { extractProductSpecification } from "./util";
import { getFromSessionStorage, isAdmin } from "../../../util/functions";
import { publishPost, rejectPost } from "../../admin/util";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [postImages, setPostImages] = useState([]);
  const [productSpecification, setProductSpecification] = useState({});

  const isUserAdmin = isAdmin(getFromSessionStorage("principalId", true));
  const [adminAction, setAdminAction] = useState(false);

  async function publishPostToMarketplace() {
    setAdminAction(true);
    await publishPost(post);
    setAdminAction(false);
  }
  async function removePostFromReview() {
    setAdminAction(true);
    await rejectPost(post);
    setAdminAction(false);
  }
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
                isUserAdmin={isUserAdmin}
                postImages={postImages}
                ProductSpecification={productSpecification}
              />
              {!isUserAdmin && <RightComponent post={post} />}
            </Grid>
            {isUserAdmin && (
              <>
                <Button
                  style={{ color: "#37a864" }}
                  onClick={() => publishPostToMarketplace()}
                >
                  Publish Post
                </Button>
                <Button
                  style={{ color: "red" }}
                  onClick={() => removePostFromReview()}
                >
                  {" "}
                  Reject Post
                </Button>
                {LoadingCmp(adminAction)}
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
