import React, {useRef, useState} from "react";
import { Box, Typography, TextField ,Toolbar, Button} from "@mui/material";
import emailjs from "@emailjs/browser";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { useNavigate } from "react-router-dom";

export default function Contactus() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayThankYou, setDisplayThankYou] = useState(false);

  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      first_name : firstName,
      last_name : lastName,
    email,
       message,
       to_email : 'joinedafrica@gmail.com',
       from_name : firstName + " " + lastName,
       from_email : email
    }
  emailjs.send('service_nt6ppc3', 'template_vnfynjw', data, "1vq_JEOR5WKAHBp0x")
      .then(function(response) {
        setMessage("");
        setIsLoading(false);
        setLastName("");
        setFirstName("");
        setEmail("");
        setDisplayThankYou(true);
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });

  }
  return (
    
    <Box>
      <Toolbar />
      <Typography variant="h4" sx = {{textAlign:"center", margin:{md:"40px 20px 20px 20px", xs : "20px"}}}>Anything you want us to know?</Typography>

      <form  onSubmit={submit} style = {{margin:"20px"}}>
        <TextField name="first_name" required label="first name" variant="outlined" type="text" onChange = {e => setFirstName(e.target.value)} style = {{width:"100%", marginBottom:"20px"}}/>
        <TextField name="last_name" required label="last name" variant="outlined" type="text"  onChange = {e => setLastName(e.target.value)} style = {{width:"100%", marginBottom:"20px"}}/>
        <TextField name="email" required label="Email"  onChange = {e => setEmail(e.target.value)} variant="outlined" style = {{width:"100%", marginBottom:"20px"}} type="email"/>
        <TextField
          label="Message"
          name = "message"
          onChange = {e => setMessage(e.target.value)}
          multiline
          style = {{width:"100%", marginBottom:"20px"}}
          rows={4}
          variant="outlined"
          required
        />
        <Button type="submit" variant="outlined" size="large" color="primary">Submit</Button>
      </form>
      {LoadingCmp(isLoading)}
      {displayThankYou && <Typography style = {{margin:"20px"}}>We have received your message. Thank you.</Typography>}
    </Box>
  );
}
