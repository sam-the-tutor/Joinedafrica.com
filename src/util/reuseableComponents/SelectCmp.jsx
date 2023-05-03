import React, { useState } from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  Radio,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  FormControl,
} from "@mui/material/";
import { useNavigate } from "react-router-dom";
// import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import filterSubcategory from "../posts/subCategoryFiltering";

export function CheckboxCmp({ list }) {
  return (
    <FormGroup>
      {list.map((label, index) => (
        <FormControlLabel key={index} control={<Checkbox />} label={label} />
      ))}
    </FormGroup>
  );
}

export function ControlledRadioButtonsGroup({
  list,
  title,
  posts,
  setPosts,
  setLoading,
  subcategory,
}) {
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setLoading(true);
    const result = posts.filter((post) =>
      filterSubcategory(
        post,
        subcategory,
        event.target.value,
        title.replaceAll(" ", "_")
      )
    );
    setPosts(result);
    setLoading(false);
  };

  return (
    <List>
      <FormLabel id="demo-controlled-radio-buttons-group">{title}</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {list.map((condition, index) => (
          <FormControlLabel
            key={index}
            value={condition}
            control={<Radio />}
            label={condition}
          />
        ))}
      </RadioGroup>
    </List>
  );
}
