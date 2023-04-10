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
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";

export function CheckboxCmp({ list }) {
  return (
    <FormGroup>
      {list.map((label, index) => (
        <FormControlLabel key={index} control={<Checkbox />} label={label} />
      ))}
    </FormGroup>
  );
}

export function RadioButtonCmp({ list, title }) {
  const [checked, setChecked] = useState([0]);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>{title}</ListSubheader>}
    >
      {list.map((condition, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton
            role={undefined}
            onClick={handleToggle(condition)}
            dense
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(condition) !== -1}
                tabIndex={-1}
                disableRipple
              />
            </ListItemIcon>
            <ListItemText id={index} primary={condition} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
