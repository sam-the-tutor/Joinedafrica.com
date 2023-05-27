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
import { post } from "../../../authentication/post";
import { getCategoryNames } from "./listOfCategories";

// import { getFromSessionStorage,  } from "../../util/functions";
// import { uploadFileToPostAssetCanister } from "../../util/postAssetCanisterFunctions";
// import { CreatePostSpecificationForm } from "../../util/posts/CreatePostSpecificationForm";
// import getPostSpecificationFromForm from "../../util/posts/GetPostSpecificationFromForm";
// import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";

// import SnackbarCmp from "../../SnackbarCmp";
// import { getErrorMessage } from "../../../util/ErrorMessages";
// import { getFromSessionStorage, getUniqueId } from "../../../util/functions";

import { state as initialState } from "./state";
import { MultiSelect } from "../../../util/reuseableComponents/MultiSelect";
import reducer from "./reducer";
import { getSubcategory } from "./listOfCategories";

export default function CreatePost() {
  const theme = useTheme();
  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isLoading, setIsLoading] = useState(false);

  //maximum length of characters and number of images
  const MAXIMUM_NUMBER_OF_IMAGES = 3;
  const MAX_LENGTH_OF_DESCRIPTION = 150;

  function setCategoryName(value) {
    dispatch({ type: "setCategoryName", value });
    setListOfSubcategories(getSubcategory(value));
  }
  function setListOfSubcategories(value) {
    dispatch({ type: "setListOfSubcategories", value });
  }
  function setSelectedSubcategory(value) {
    dispatch({ type: "setSelectedSubcategory", value });
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      //  onSubmit={createPost}
    >
      <Box>
        <Typography style={{ marginBottom: "10px" }}>
          Product category
        </Typography>
        <Stack spacing={2}>
          <MultiSelect
            name="Product category"
            listOfElements={getCategoryNames()}
            clickedValue={(categoryName) => setCategoryName(categoryName)}
          />
          <MultiSelect
            name="sub-category"
            listOfElements={state.subCategories}
            clickedValue={(subcategoryName) =>
              setSelectedSubcategory(subcategoryName)
            }
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
              //   onChange={addImages}
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
                // src={URL.createObjectURL(file)}
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
                // onClick={() => removeImage(index)}
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
            // onChange={(e) => setProductTitle(e.target.value)}
          />
          <TextField
            required
            type="number"
            inputProps={{ min: "0", step: "any" }}
            // onChange={(e) => setAmount(e.target.value)}
            label="Price (USDT)"
          />
          {/* {CreatePostSpecificationForm(
            selectedSubcategory,
            setYearOfManufacture,
            setModel,
            setGender,
            setIsFurnished,
            setHasParkingSpace,
            setNumberOfPlots,
            setColour,
            setCondition,
            setIsRegistered,
            setTransmission,
            setType,
            setOperatingSystem,
            setProcessor,
            setDisplay,
            setStyle,
            setBedrooms,
            setStorageCapacity,
            setStorageType,
            setRAM,
            setBrand,
            setBathrooms,
            setFormation,
            setDisplayType,
            setFormulation
          )} */}
          <TextField
            required
            label="Product description"
            variant="outlined"
            multiline
            rows={7}
            placeholder="What other details do you want buyers to know about?"
            // onChange={(e) => setProductDescription(e.target.value)}
          />
        </Stack>
      </Box>
      <Box style={{ marginTop: "40px" }}>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          type="submit"
          //   disabled={isLoading}
        >
          Create post
        </Button>
      </Box>
      {/* {isLoading && LoadingCmp(isLoading)}
      {showSnackbarCmp} */}
    </Box>
  );
}
