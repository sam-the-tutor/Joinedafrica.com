import React,{useEffect, useState} from "react";
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  Divider,
  CardActions,
  IconButton,
  Grid,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { getFileFromPostAssetCanister } from "../../canisters/post_assets";
import {createObjectURLFromArrayOfBytes  } from "../../util/functions"




export default function Content({post}) {

  const [postCardDisplayImage, setPostCardDisplayImage] = useState(null);

  useEffect(() => {
    async function loadPost() {
      const file = await getFileFromPostAssetCanister(post.images[0]);
      setPostCardDisplayImage(createObjectURLFromArrayOfBytes(file._content));
    }
    loadPost();
  }, []);

  return (
    <Card sx={{ width: "250px", margin: 1 }}>
      <CardMedia
        src={postCardDisplayImage}
        height="200"
        sx={{objectFit: "contain"}}
        component="img"
      />

      <Divider />
      <CardActions>
        <Grid container>
          <Grid item xs={12}>
            <Typography>
              Laptop 2019-edition 4gb Ram Laptop 2019-edition 4gb Ram
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: "flex" }}>
            <IconButton>
              <FavoriteBorderIcon />
            </IconButton>
            <Typography sx={{ marginTop: "10px", marginLeft: "15px" }}>
              15 BTC
            </Typography>
          </Grid>
          <Grid item xs={10}>
            <Button
              fullWidth={true}
              variant="outlined"
              sx={{ textAlign: "center" }}
            >
              View
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
}
