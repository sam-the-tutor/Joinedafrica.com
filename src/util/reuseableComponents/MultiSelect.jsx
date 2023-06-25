import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

/**
 * MultiSelect is used to select from a list of elements
 * @param {name, listOfElements, clickedValue}  The name of the multi select, the list of elements to select from and
 * clicked value gets the value of what was clicked
 * @returns a list of select elements
 */
export function MultiSelect({ name, listOfElements, clickedValue }) {
  return (
    <Box>
      <FormControl fullWidth>
        <InputLabel>{name}</InputLabel>
        <Select
          defaultValue=""
          label={name}
          required
          onChange={(event) => clickedValue(event.target.value)}
        >
          {listOfElements.map((name, index) => (
            <MenuItem value={name} key={index}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
