function updateSnackBarCmp() {
  setShowSnackbarCmp(
    <SnackbarCmp
      message="Your post has been created! Go to My postings to see your post"
      handleClose={(event, reason) => {
        //the user has to click on the alert to close it.
        if (reason != "clickaway") {
          setShowSnackbarCmp(null);
        }
      }}
    />
  );
}

function removeImage(imagePosition) {
  const result = selectedImages.filter(
    (image, index) => imagePosition != index
  );
  setSelectedImages(result);
}

function addImages(event) {
  if (selectedImages.length == MAXIMUM_NUMBER_OF_IMAGES) {
    alert("The maximum number of images to add is " + MAXIMUM_NUMBER_OF_IMAGES);
    return;
  }
  setSelectedImages([...selectedImages, event.target.files[0]]);
}
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
        isFurnished,
        formulation
      ),
    },
  };

  //paths to images stores the path to the images in the post asset canister
  const pathsToImages = [];
  await Promise.all(
    selectedImages.map(async (image) => {
      console.log(image);
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
  updateSnackBarCmp();
}
