import { Principal } from "@dfinity/principal";
import { post } from "../../../canisters/post";
import { uploadMultipleFiles } from "../../../canisters/post_assets";
import { getFromSessionStorage, getUniqueId } from "../../../util/functions";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";
import getPostSpecificationFromForm from "./util/getPostSpecificationFromForm";

function updateSnackBarCmp(setState) {
  setState("setSnackBarCmp", {
    showSnackbarCmp: (
      <SnackbarCmp
        message="Your post has been created! Go to My postings to see your post"
        handleClose={(event, reason) => {
          //the user has to click on the alert to close it.
          if (reason != "clickaway") {
            setState("setSnackBarCmp", { showSnackbarCmp: null });
          }
        }}
      />
    ),
  });
}

export async function submitForm(state, setState) {
  const MAX_LENGTH_OF_DESCRIPTION = 150;

  if (state.productDescription.length < MAX_LENGTH_OF_DESCRIPTION) {
    alert("Product description should be more than 149 characters");
    return;
  }
  setState("setIsLoading", { isLoading: true });
  const userPrincipal = getFromSessionStorage("principalId", true);
  console.log(userPrincipal);
  const createdPost = {
    creationDateOfPost: new Date().toLocaleDateString(),
    category: state.selectedCategory,
    postId: getUniqueId(),
    subcategory: state.selectedSubcategory,
    productTitle: state.productTitle,
    creatorOfPostId: Principal.fromText(userPrincipal),
    isPublished: false,
    amount: state.amount,
    location: state.location,
    productDescription: state.productDescription,
    condition: state.condition,
    productSpecification: {
      ...getPostSpecificationFromForm(state),
    },
  };

  createdPost.images = await uploadMultipleFiles(
    state.selectedImages,
    userPrincipal
  );
  const authenticatedUser = await post();
  const result = await authenticatedUser.createPost(createdPost);
  if (result?.err) {
    // alert(getErrorMessage(result.err));
    setState("setIsLoading", { isLoading: false });
    return;
  }
  setState("setIsLoading", { isLoading: false });
  updateSnackBarCmp(setState);
}
