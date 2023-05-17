import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import { getCategoryNames, getSubcategory } from "../../util/ListOfCategories";
import SendIcon from "@mui/icons-material/Send";
import { MultiSelect } from "../../util/reuseableComponents/MultiSelect";
import { LoadingCmp } from "../../util/reuseableComponents/LoadingCmp";
import SnackbarCmp from "../../util/reuseableComponents/SnackbarCmp";
import { uploadFileToPostAssetCanister } from "../../util/postAssetCanisterFunctions";
import { getFromSessionStorage, getUniqueId } from "../../util/functions";
import { PostImage } from "../../styling/MyAccount/CreatePosts";
import { CreatePostSpecificationForm } from "../../util/posts/CreatePostSpecificationForm";
import getPostSpecificationFromForm from "../../util/posts/GetPostSpecificationFromForm";
import { Principal } from "@dfinity/principal";
import { getAuthenticatedPostUser } from "../../util/auth";
import { getErrorMessage } from "../../util/ErrorMessages";

export default function CreatePost() {
  const categories = getCategoryNames();
  const [isLoading, setIsLoading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [productTitle, setProductTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [condition, setCondition] = useState("");

  const [yearOfManufacture, setYearOfManufacture] = useState("0");
  const [model, setModel] = useState("");
  const [gender, setGender] = useState("");
  const [isFurnished, setIsFurnished] = useState("");
  const [hasParkingSpace, setHasParkingSpace] = useState("");
  const [numberOfPlots, setNumberOfPlots] = useState("0");
  const [showSnackbarCmp, setShowSnackbarCmp] = useState(false);

  const [colour, setColour] = useState("");
  const [isRegistered, setIsRegistered] = useState("");

  const [transmission, setTransmission] = useState("");
  const [type, setType] = useState("");
  const [processor, setProcessor] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [display, setDisplay] = useState("");
  const [style, setStyle] = useState("");

  const [bedrooms, setBedrooms] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");
  const [storageType, setStorageType] = useState("");
  const [ram, setRAM] = useState("");
  const [brand, setBrand] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [formation, setFormation] = useState("");
  const [displayType, setDisplayType] = useState("");
  //maximum length of characters and number of images
  const MAXIMUM_NUMBER_OF_IMAGES = 3;
  const MAX_LENGTH_OF_DESCRIPTION = 150;

  function addImages(event) {
    if (selectedImages.length == MAXIMUM_NUMBER_OF_IMAGES) {
      alert(
        "The maximum number of images to add is " + MAXIMUM_NUMBER_OF_IMAGES
      );
      return;
    }
    setSelectedImages([...selectedImages, event.target.files[0]]);
  }

  /**
   * sends the created post to the backend but the user has to be authenticated first using the internet identity
   */
  async function createPost(event) {
    event.preventDefault();
    if (productDescription.length < MAX_LENGTH_OF_DESCRIPTION) {
      alert("Product description should be more than 149 characters");
      return;
    }
    setIsLoading(true);
    const userPrincipal = getFromSessionStorage("principalId", true);
    console.log(userPrincipal);
    const post = {
      creationDateOfPost: new Date().toLocaleDateString(),
      category: selectedCategory,
      postId: getUniqueId(),
      subcategory: selectedSubcategory,
      productTitle,
      creatorOfPostId: Principal.fromText(userPrincipal),
      isPublished: false,
      amount,
      productDescription,
      condition,
      productSpecification: {
        ...getPostSpecificationFromForm(
          selectedSubcategory,
          model,
          brand,
          condition,
          yearOfManufacture,
          transmission,
          type,
          colour,
          processor,
          ram,
          storageCapacity,
          operatingSystem,
          storageType,
          gender,
          formation,
          bedrooms,
          bathrooms,
          hasParkingSpace,
          numberOfPlots,
          displayType,
          style,
          display,
          isRegistered,
          isFurnished
        ),
      },
    };

    //paths to images stores the path to the images in the post asset canister
    const pathsToImages = [];
    await Promise.all(
      selectedImages.map(async (image) => {
        //generating unique id each time for each image
        const key = await uploadFileToPostAssetCanister(
          image,
          userPrincipal + "/post/" + getUniqueId()
        );
        pathsToImages.push(key);
      })
    );

    post.images = pathsToImages;
    const authenticatedUser = await getAuthenticatedPostUser();
    const result = await authenticatedUser.createPost(post);
    if (result?.err) {
      alert(getErrorMessage(result.err));
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    setShowSnackbarCmp(true);
  }

  return (
    <Box component="form" autoComplete="off" onSubmit={createPost}>
      <Box>
        <Typography style={{ marginBottom: "10px" }}>
          Product category
        </Typography>
        <Stack spacing={2}>
          <MultiSelect
            name="Product category"
            listOfElements={categories}
            clickedValue={(categoryName) => {
              setSubcategories(getSubcategory(categoryName));
              setSelectedCategory(categoryName);
            }}
          />
          <MultiSelect
            name="sub-category"
            listOfElements={subcategories}
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
              onChange={addImages}
              required
            />

            <Typography>
              Add some images. You can add up to 3 images. Jpeg or Png only.
            </Typography>
          </Box>
        </PostImage>
        <Divider />
        <Stack direction="row" spacing={2} style={{ marginTop: "20px" }}>
          {selectedImages.map((file, index) => (
            <Box key={index} style={{ width: "200px", height: "200px" }}>
              <img
                src={URL.createObjectURL(file)}
                alt="Posting preview"
                style={{
                  width: "100%",
                  height: "100%",
                }}
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
            onChange={(e) => setProductTitle(e.target.value)}
          />
          <TextField
            required
            type="number"
            inputProps={{ min: "0", step: "any" }}
            onChange={(e) => setAmount(e.target.value)}
            label="Price (USDT)"
          />
          {CreatePostSpecificationForm(
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
            setDisplayType
          )}
          <TextField
            required
            label="Product description"
            variant="outlined"
            multiline
            rows={7}
            placeholder="What other details do you want buyers to know about?"
            onChange={(e) => setProductDescription(e.target.value)}
          />
        </Stack>
      </Box>
      <Box style={{ marginTop: "40px" }}>
        <Button
          variant="outlined"
          endIcon={<SendIcon />}
          type="submit"
          disabled={isLoading}
        >
          Create post
        </Button>
      </Box>
      {isLoading && LoadingCmp(isLoading)}
      {showSnackbarCmp && (
        <SnackbarCmp
          message="Your post has been created! Go to my postings to view your post."
          open={showSnackbarCmp}
          handleClose={(event, reason) => {
            //the user has to click on the alert to close it.
            if (reason != "clickaway") {
              setShowSnackbarCmp(false);
            }
          }}
          severity="success"
        />
      )}
    </Box>
  );
}
