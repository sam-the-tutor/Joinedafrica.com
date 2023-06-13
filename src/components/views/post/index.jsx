import { Principal } from "@dfinity/principal";
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
import React, { useEffect, useState, useContext } from "react";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from "react-router";

import { conversation } from "../../../canisters/conversation";
import { getFileFromPostAssetCanister } from "../../../canisters/post_assets";
import { post as postCanister } from "../../../declarations/post";
import { getErrorMessage } from "../../../util/ErrorMessages";
import { ref, set, push } from "firebase/database";
import {
  createObjectURLFromArrayOfBytes,
  getFromSessionStorage,
} from "../../../util/functions";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { extractProductSpecification } from "./util";
// import {AppContext} from "../../../../"
import { AppContext } from "../../../context";
/**
 * When the user clicks on a specific post, this component is responsible for displaying all required information about the post
 * @returns returns all required information about a selected post
 */
export default function ViewPost() {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [postImages, setPostImages] = useState([]);
  const [productSpecification, setProductSpecification] = useState({});
  const [sendMessageProgress, setSendMessageProgress] = useState(null);
  const [userMessage, setUserMessage] = useState("");
  const { firebaseDB } = useContext(AppContext);

  useEffect(() => {
    async function getPost() {
      setLoading(true);
      //getPost is accessible to very body, that's why we don't need to be authenticated to access it
      let response = await postCanister.getPost(postId);
      if (response?.ok) {
        setPost(response.ok);
      } else {
        alert(getErrorMessage(response.err));
        setLoading(false);
        return;
      }
      const images = [];
      //loading all the images of the posting
      await Promise.all(
        response.ok.images.map(async (image) => {
          //generating unique id each time for each image
          const file = await getFileFromPostAssetCanister(image);
          const url = createObjectURLFromArrayOfBytes(file._content);
          images.push({
            original: url,
            thumbnail: url,
          });
        })
      );
      setPostImages(images);
      setProductSpecification(extractProductSpecification(response.ok));
      console.log(productSpecification);
      setLoading(false);
    }
    getPost();
  }, []);

  // sending message to the creator of the post
  async function sendMessage() {
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
      //send the message to the other friend
      const chatMessage = {
        messageContent: userMessage,
        sender: Principal.fromText(loggedInUserPrincipalId),
        receiver: post.creatorOfPostId,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
      };
      const authenticatedUser = await conversation();
      const result = await authenticatedUser.sendMessage(chatMessage);
      //send message notification to the receiver
      const messageRef = ref(firebaseDB, post.creatorOfPostId.toText());
      set(push(messageRef), chatMessage);
      console.log(result);
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
              {/* right component */}
              <Grid item md={9} xs={12}>
                <Box style={{ marginBottom: "20px" }}>
                  <Typography variant="h5" gutterBottom>
                    {post.productTitle}
                  </Typography>
                  <Typography variant="h6" style={{ color: "#37a864" }}>
                    {post.amount} ckBTC
                  </Typography>
                </Box>
                <ReactImageGallery items={postImages} />
                <Box
                  style={{ margin: "30px 0", padding: "24px" }}
                  component={Paper}
                >
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
              {/* left component */}
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
                    onClick={sendMessage}
                  >
                    {sendMessageProgress || "Send message"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
