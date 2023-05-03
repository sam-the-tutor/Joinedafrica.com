import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  List,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material/";
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
/**
 *  ControlledRadioButtonsGroup filters the subcategory of postings based on the checkbox the user selects
 */
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
