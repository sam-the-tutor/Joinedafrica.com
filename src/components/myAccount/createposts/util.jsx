import { Principal } from "@dfinity/principal";
import { createAuthenticatedActor } from "../../../canisters/createActor";
import { post } from "../../../canisters/post";
import { canisterId, createActor } from "../../../declarations/assets";
import { getFromSessionStorage, getUniqueId } from "../../../util/functions";
import SnackbarCmp from "../../../util/reuseableComponents/SnackbarCmp";

export function getSuccessSnackbarCmp(setSnackbarCmp) {
  return (
    <SnackbarCmp
      message="Your post has been created! Go to My postings to see your post"
      handleClose={(event, reason) => {
        //the user has to click on the alert to close it.
        if (reason != "clickaway") {
          setSnackbarCmp(null);
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
    Images: await uploadFilesToAssetCanister(
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

async function uploadFilesToAssetCanister(images, userPrincipal) {
  const actor = await createAuthenticatedActor(canisterId, createActor);
  return await Promise.all(
    images.map(async (image) => {
      const assetId = userPrincipal + "/post/" + getUniqueId();
      const asset = await convertImageFileToNat8(image);
      await actor.uploadAsset(asset, assetId);
      return assetId;
    })
  );
}

async function convertImageFileToNat8(file) {
  const imageArray = await file.arrayBuffer();
  return [...new Uint8Array(imageArray)];
}
