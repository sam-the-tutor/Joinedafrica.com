import { Principal } from "@dfinity/principal";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState, useReducer } from "react";
import { useTheme } from "@mui/material/styles";
import { PostImage } from "./style";
import { post } from "../../../canisters/post";
import {
  getCategoryNames,
  getSubcategory,
  getCities,
} from "./listOfCategories";

import { state as initialState } from "./state";
import { MultiSelect } from "../../../util/reuseableComponents/MultiSelect";
import reducer from "./reducer";

import { CreatePostSpecificationForm } from "./util/createPostSpecification";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { submitForm } from "./util";

export default function CreatePost() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [formValues, setFormValues] = useState({});
  const [productTitle, setProductTitle] = useState("");
  const [country, setCountry] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImage] = useState([]);
  const theme = useTheme();

  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  const [state, dispatch] = useReducer(reducer, initialState);

  //maximum length of characters and number of images
  function setState(type, value) {
    dispatch({ type, value });
  }

  function submitPost(event) {
    event.preventDefault();
    // console.log("My state : ", state);
    console.log("My formValues : ", formValues);
    console.log("My category : ", category);
    console.log("My subcategory : ", subcategory);
    // submitForm(state, setState);
  }
  // onSubmit={handleSubmit(submitPost)}
  return (
    <Box component="form" onSubmit={submitPost}>
      <Box>
        <Typography style={{ marginBottom: "10px" }}>
          Product category
        </Typography>
        <Stack spacing={2}>
          <MultiSelect
            name="Product category"
            listOfElements={getCategoryNames()}
            clickedValue={(selectedCategory) => setCategory(selectedCategory)}
          />
          <MultiSelect
            name="sub-category"
            listOfElements={getSubcategory(category)}
            clickedValue={(selectedSubcategory) =>
              setSubcategory(selectedSubcategory)
            }
          />
          <TextField
            label="Country"
            fullWidth
            placeholder="Nigeria"
            style={{ margin: "30px 0" }}
            variant="outlined"
            onChange={(e) => setCountry(e.target.value)}
          />
        </Stack>
      </Box>
      <Box style={{ marginBottom: "35px", marginTop: "35px" }}>
        <Typography style={{ marginBottom: "10px" }}>Add image(s)</Typography>
        <PostImage>
          <Box>
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={(e) => setState("selectedImages", e.target.files[0])}
              required
            />

            <Typography>
              Add some images. You can add up to 3 images. Jpeg or Png only.
            </Typography>
          </Box>
        </PostImage>
        <Divider />
        <Stack
          direction={ismediumScreenSizeAndBelow ? "column" : "row"}
          spacing={2}
          style={{ marginTop: "20px" }}
        >
          {state.selectedImages.map((file, index) => (
            <Box
              key={index}
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "black",
                position: "relative",
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt="Posting preview"
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: "0.7",
                }}
              />
              <ClearIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  cursor: "pointer",
                }}
                fontSize="large"
                onClick={() => setState("removeImage", index)}
              />
            </Box>
          ))}
        </Stack>
      </Box>
      <Box>
        <Typography style={{ marginBottom: "10px" }}>
          Product details
        </Typography>
        <Stack spacing={2}>
          <TextField
            required
            label="Product title"
            variant="outlined"
            name="setProductTitle"
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <TextField
            required
            type="number"
            name="setAmount"
            inputProps={{ min: "0", step: "any" }}
            onChange={(e) => setAmount(e.target.value)}
            label="Price (BTC)"
          />
          {subcategory.length > 0 && (
            <CreatePostSpecificationForm
              subcategory={subcategory}
              setFormValues={setFormValues}
            />
          )}
          <TextField
            required
            name="Product description"
            variant="outlined"
            multiline
            rows={7}
            placeholder="What other details do you want buyers to know about?"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
      </Box>
      <Box style={{ marginTop: "40px", marginBottom: "30px" }}>
        <Button variant="outlined" endIcon={<SendIcon />} type="submit">
          Create post
        </Button>
      </Box>
      {LoadingCmp(state.isLoading)}
      {state.showSnackbarCmp}
    </Box>
  );
}
