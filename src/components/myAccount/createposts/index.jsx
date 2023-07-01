import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { getCategoryNames, getSubcategory } from "./listOfCategories";
import { PostImage } from "./style";

import { MultiSelect } from "../../../util/reuseableComponents/MultiSelect";

import { getErrorMessage } from "../../../util/ErrorMessages";
import { LoadingCmp } from "../../../util/reuseableComponents/LoadingCmp";
import { getSuccessSnackbarCmp, handleSubmit } from "./util";
import { CreatePostSpecificationForm } from "./util/createPostSpecification";

export default function CreatePost() {
  const [productSpecification, setProductSpecification] = useState({});
  const [generalProductInformation, setGeneralProductInformation] = useState({
    Images: [],
  });
  const [loading, setLoading] = useState(false);
  const [snackbarCmp, setSnackbarCmp] = useState(null);

  const theme = useTheme();

  const ismediumScreenSizeAndBelow = useMediaQuery(
    theme.breakpoints.down("md")
  );

  function addImages(newImage) {
    const Max_Number_of_Images = 3;
    if (generalProductInformation.Images.length < Max_Number_of_Images) {
      setGeneralProductInformation({
        ...generalProductInformation,
        Images: [...generalProductInformation.Images, newImage],
      });
    } else {
      alert("Maximum number of images reached");
    }
  }
  function removeImages(index) {
    setGeneralProductInformation({
      ...generalProductInformation,
      Images: generalProductInformation.Images.filter((_, i) => i !== index),
    });
  }

  async function submitPost(event) {
    event.preventDefault();
    const MAX_LENGTH_OF_DESCRIPTION = 150;
    if (
      generalProductInformation.Description.length < MAX_LENGTH_OF_DESCRIPTION
    ) {
      alert("Product description should be more than 149 characters");
      return;
    }
    setLoading(true);
    const result = await handleSubmit(
      generalProductInformation,
      productSpecification
    );

    if (result?.err) {
      alert(getErrorMessage(result.err));
    } else {
      setSnackbarCmp(getSuccessSnackbarCmp(setSnackbarCmp));
    }
    setLoading(false);
  }

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
            clickedValue={(Category) =>
              setGeneralProductInformation({
                ...generalProductInformation,
                Category,
                Subcategory: "",
              })
            }
          />
          <MultiSelect
            name="sub-category"
            listOfElements={getSubcategory(generalProductInformation.Category)}
            clickedValue={(Subcategory) =>
              setGeneralProductInformation({
                ...generalProductInformation,
                Subcategory,
              })
            }
          />
          <TextField
            required
            label="Country"
            fullWidth
            placeholder="Nigeria"
            style={{ margin: "30px 0" }}
            variant="outlined"
            onChange={(e) =>
              setGeneralProductInformation({
                ...generalProductInformation,
                Location: e.target.value,
              })
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
              onChange={(e) => addImages(e.target.files[0])}
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
          {generalProductInformation.Images.map((image, index) => (
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
                src={URL.createObjectURL(image)}
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
                onClick={() => removeImages(index)}
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
            onChange={(e) =>
              setGeneralProductInformation({
                ...generalProductInformation,
                Title: e.target.value,
              })
            }
          />
          <TextField
            required
            type="number"
            name="setAmount"
            inputProps={{ min: "0", step: "any" }}
            onChange={(e) =>
              setGeneralProductInformation({
                ...generalProductInformation,
                Amount: e.target.value,
              })
            }
            label="Price (BTC)"
          />
          {generalProductInformation.Subcategory?.length > 0 && (
            <CreatePostSpecificationForm
              subcategory={generalProductInformation.Subcategory}
              setProductSpecification={setProductSpecification}
            />
          )}
          <TextField
            required
            name="Product description"
            variant="outlined"
            multiline
            rows={7}
            placeholder="What other details do you want buyers to know about?"
            onChange={(e) =>
              setGeneralProductInformation({
                ...generalProductInformation,
                Description: e.target.value,
              })
            }
          />
        </Stack>
      </Box>
      <Box style={{ marginTop: "40px", marginBottom: "30px" }}>
        <Button variant="outlined" endIcon={<SendIcon />} type="submit">
          Create post
        </Button>
      </Box>
      {LoadingCmp(loading)}
      {snackbarCmp}
    </Box>
  );
}
