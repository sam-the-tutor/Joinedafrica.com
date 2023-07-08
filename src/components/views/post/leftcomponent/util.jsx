import { createAuthenticatedActor } from "../../../../canisters/createActor";
import { canisterId, createActor } from "../../../../declarations/assets";
import { createObjectURLFromArrayOfBytes } from "../../../../util/functions";

export async function getPostImages(response) {
  const actor = await createAuthenticatedActor(canisterId, createActor);
  return await Promise.all(
    response.Images.map(async (image) => {
      const imageFile = await actor.getAsset(image);
      const url = createObjectURLFromArrayOfBytes(imageFile.ok);
      return {
        original: url,
        thumbnail: url,
      };
    })
  );
}
