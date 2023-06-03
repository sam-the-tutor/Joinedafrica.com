import React from "react";
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


export default function Content() {
  return (
    <Card sx={{ width: "250px" }}>
      <CardMedia
        src="https://picsum.photos/id/0/5000/3333"
        height="200"
        component="img"
      />

      <Divider />
      <CardActions>

      <Grid container>
        <Grid item xs={12}>
        <Typography>
            Laptop 2019-edition 4gb Ram  Laptop 2019-edition 4gb Ram
        </Typography>
        </Grid>
  
      <Grid item xs={12} sx={{ display: "flex" }}>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <Typography sx={{marginTop: "10px",marginLeft:"15px"}}>
            15 USDT
        </Typography>
        </Grid>
        <Grid item xs={10}>
        <Button fullWidth={true} variant="outlined" sx={{textAlign:"center"}}>View</Button>
        </Grid>
       </Grid>
      </CardActions>
    </Card>
  );
}
