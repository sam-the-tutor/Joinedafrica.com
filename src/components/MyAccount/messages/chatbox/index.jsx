import { Grid, Divider, TextField, Button } from "@mui/material";
import React from "react";

export default function Chatbox() {
  return (
    <Grid item xs={9}>
      {/* <List style={{ height: "70vh", overflowY: "auto" }}>
        {myMessages.length == 0 && (
          <Typography style={{ textAlign: "center" }}>
            Click on friend to view messages
          </Typography>
        )}

        {myMessages.length > 0 &&
          myMessages.map((message, index) => (
            <div key={index} id={index}>
              <ListItem>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText
                      //my messages i send will ALWAYS have secondReceiver's length > 0
                      //because that is the other users principal
                      align={
                        message.secondReceiver.length > 0 ? "right" : "left"
                      }
                      primary={message.messageContent}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ListItemText
                      align={
                        message.secondReceiver.length > 0 ? "right" : "left"
                      }
                      secondary={message.time}
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </div>
          ))}
        <div ref={messageEndRef} />
      </List> */}
      <Divider />
      <Grid container style={{ padding: "20px" }}>
        <Grid item xs={11}>
          <TextField
            id="outlined-basic-email"
            label="Enter message..."
            fullWidth
            onChange={(event) => setConveration(event.target.value)}
          />
        </Grid>
        <Grid item xs={1} align="right">
          <Button
            variant="outlined"
            //   onClick={sendMessage}
          >
            SEND
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
