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

export function RadioButtonCmp({ list, title, category, subcategory }) {
  const [checked, setChecked] = useState([]);
  const [filter, setFilter] = useState([]);
  // const [checked1, setChecked1] = useState([]);
  const navigate = useNavigate();

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const newFilter = [...filter];

    if (currentIndex === -1) {
      newChecked.push(value);
      newFilter.push({ title: value });
    } else {
      newChecked.splice(currentIndex, 1);

      newFilter.splice(currentIndex, 1);
    }
    let searchKey = "filter" + title;
    // const x = [s:value];
    setChecked(newChecked);
    setFilter(newFilter);
    console.log(filter);
    // const url = new URL(window.location.href);
    const url = "/view/" + category + "/" + subcategory + "/search?";
    const params = new URLSearchParams(url.search);

    params.append(title, value);
    console.log(params);
    navigate(url + params);

    // setChecked([...checked, { [title]: value }]);
    // console.log(checked);
    // console.log(checked1);
    // const query = { sfasdf: asdfa };
    // console.log(window.location.href);
    // window.
    // navigate("view/" + title + "/" + value + "/search?" + title:value);
    // navigate("view/" + title + "/" + value + "/search?" + title=value)
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
            // id = '"filter_"+title' : condition
            onClick={handleToggle(condition)}
            // onClick={() => naviage("view/sdaf/sfsd/search?"+[filtertitle=condition)}
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
