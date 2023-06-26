import { Principal } from "@dfinity/principal";
import { post } from "../../../canisters/post";
import { uploadMultipleFiles } from "../../../canisters/post_assets";
import { getFromSessionStorage, getUniqueId } from "../../../util/functions";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";

export function getSuccessSnackbarCmp() {
  return (
    <SnackbarCmp
      message="Your post has been created! Go to My postings to see your post"
      handleClose={(event, reason) => {
        //the user has to click on the alert to close it.
        if (reason != "clickaway") {
          setState("setSnackBarCmp", { showSnackbarCmp: null });
        }
      }}
    />
  );
}

export async function handleSubmit(
  generalProductInformation,
  productSpecification
) {
  const [authenticatedUser, createdPost] = await Promise.all([
    post(),
    createPost(generalProductInformation, productSpecification),
  ]);
  console.log(createdPost);
  const result = await authenticatedUser.createPost(createdPost);
  return result;
}

async function createPost(generalProductInformation, productSpecification) {
  const userPrincipal = getFromSessionStorage("principalId", true);
  const Category = generalProductInformation.Category.replaceAll(" ", "_");
  const Subcategory = generalProductInformation.Subcategory.replaceAll(
    " ",
    "_"
  );
  const result = {
    ...generalProductInformation,
    Date: new Date().toLocaleDateString(),
    PostId: getUniqueId(),
    CreatorOfPostId: Principal.fromText(userPrincipal),
    IsPublished: false,
    Images: await uploadMultipleFiles(
      generalProductInformation.Images,
      userPrincipal
    ),
    ProductSpecification: {
      [Category]: {
        [Subcategory]: productSpecification,
      },
    },
  };
  return result;
}
