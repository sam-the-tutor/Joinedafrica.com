import { Box, Button, Container, Grid, Toolbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router";

import { post as postCanister } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { getFromSessionStorage, isAdmin } from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { publishPost, rejectPost } from "../../admin/util";
import LeftComponent from "./leftcomponent";
import { getPostImages } from "./leftcomponent/util";
import RightComponent from "./rightcomponent";
import SimilarProducts from "./similarproducts";
import { extractProductSpecification } from "./util";

export default function ViewPost() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [postImages, setPostImages] = useState([]);
  const [productSpecification, setProductSpecification] = useState({});

  const [shouldReloadViewPostCmp, setShouldReloadViewPostCmp] = useState(false);
  const [adminAction, setAdminAction] = useState(false);
  let isUserAdmin = false;

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

  if (sessionStorage.getItem("principalId")) {
    isUserAdmin = isAdmin(getFromSessionStorage("principalId", true));
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
  }, [shouldReloadViewPostCmp]);

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
                productSpecification={productSpecification}
              />
              {!isUserAdmin && <RightComponent post={post} />}
            </Grid>
            {isUserAdmin ? (
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
            ) : (
              post && (
                <SimilarProducts
                  posts={post}
                  category={post.Category}
                  subcategory={post.Subcategory}
                  currentPostId={post.PostId}
                  setShouldReloadViewPostCmp={setShouldReloadViewPostCmp}
                />
              )
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
