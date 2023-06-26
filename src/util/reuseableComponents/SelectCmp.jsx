import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  List,
  Radio,
  RadioGroup,
} from "@mui/material/";
import React from "react";
import filterSubcategory from "../../components/myAccount/createposts/util/subCategoryFiltering";

/**
 *  ControlledRadioButtonsGroup lists options to filter postings and also keeps track of the users selected filter
 *  options
 */
export function ControlledRadioButtonsGroup({ list, title, setFilterOptions }) {
  const handleChange = (event) => {
    setFilterOptions((previousFilterOptions) => ({
      ...previousFilterOptions,
      [title.replaceAll(" ", "_")]: event.target.value,
    }));
  };
  return (
    <List>
      <FormLabel>{title}</FormLabel>
      <RadioGroup onChange={handleChange}>
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
