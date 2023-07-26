import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function WhyJoinedAfrica() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Direct Communication</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Transparency and direct communication are key components of Joined
            Africa. Our built-in messaging application enables buyers to
            directly connect with sellers, fostering open and personalized
            conversations. This direct communication ensures that buyers can
            obtain accurate information about the products they are interested
            in.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Wide Range of Categories</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Joined Africa offers a diverse range of categories, catering to
            various interests and needs. Whether you're searching for
            properties, electronics, fashion, vehicles, or more, you can easily
            navigate through our platform to find what you're looking for. Our
            extensive category selection ensures that you have access to a wide
            variety of products.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Effortless Posting</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            We understand the importance of simplicity and efficiency when it
            comes to posting your products. Joined Africa provides a
            user-friendly interface that allows sellers to create posts quickly
            and effortlessly. With just a few steps, you can showcase your
            items, set a crypto-price, and provide a necessary information
            related to your product.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Crypto Currency Convenience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Joined Africa makes it easy for sellers to advertise their products
            using crypto currency, offering a modern and secure platform that
            keeps up with digital transactions.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
