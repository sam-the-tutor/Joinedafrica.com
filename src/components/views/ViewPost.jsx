import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import { post as postCanister } from "../../declarations/post";
import { conversation } from "../../declarations/conversation";
import { useParams } from "react-router";
import Header from "../appStructure/Header";
import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";
import CarouselCmp from "../../util/reuseableComponents/CarouselCmp";
import {
  createObjectURLFromArrayOfBytes,
  extractProductSpecification,
  getFromSessionStorage,
} from "../../util/functions";
import { getFileFromPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import { MessageCmp } from "../../styling/views/ViewPost";
import { getErrorMessage } from "../../util/ErrorMessages";
import { Principal } from "@dfinity/principal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  getAuthenticatedConversationUser,
  getAuthenticatedMessageNotificationWorker,
} from "../../util/auth";

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
          images.push(createObjectURLFromArrayOfBytes(file._content));
        })
      );
      setPostImages(images);
      setProductSpecification(extractProductSpecification(response.ok));
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
      //send the message to the other friends
      const chatMessage = {
        messageContent: userMessage,
        sender: Principal.fromText(loggedInUserPrincipalId),
        mainReceiver: post.creatorOfPostId,
        time: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        secondReceiver: "",
      };
      //send notification message to the creators posts notification
      const authenticatedWorker =
        await getAuthenticatedMessageNotificationWorker();
      await authenticatedWorker.sendNotification(chatMessage);
      //create a conversation between me and the creator of post.. also send the message there too
      const authenticatedUser = await getAuthenticatedConversationUser();
      const result = await authenticatedUser.sendMessage(chatMessage);
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
      <Header />
      <Container
        style={{
          marginBottom: "100px",
          marginTop: "100px",
        }}
      >
        {loading ? (
          LoadingCmp(loading)
        ) : (
          <>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              {/* right component */}
              <Box style={{ width: "600px" }}>
                <CarouselCmp images={postImages} />
                <Box style={{ margin: "30px 0" }}>
                  <Box style={{ marginBottom: "20px" }}>
                    <Typography gutterBottom>{post.productTitle}</Typography>
                    <Typography style={{ color: "#37a864" }}>
                      {post.amount} ckBTC
                    </Typography>
                  </Box>

                  {Object.entries(productSpecification).map(
                    ([specification, value], index) => (
                      <Box
                        style={{
                          display: "flex",
                          color: "rgba(255, 255, 255, 0.7)",
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
                    <Typography variant="h6" style={{ margin: "20px 0" }}>
                      Description
                    </Typography>
                    <Typography>{post.productDescription}</Typography>
                  </Box>
                </Box>
              </Box>
              {/* left component */}
              <MessageCmp>
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
              </MessageCmp>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}
