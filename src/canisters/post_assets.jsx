// Create asset manager instance
import { AssetManager } from "@dfinity/assets";
import { HttpAgent } from "@dfinity/agent";
import { getUniqueId } from "../util/functions";

const agent = new HttpAgent(); // Agent with an authorized identity

/**
 * In order to view the post_asset canister in candid UI locally, paste this link in the browser
 * http://127.0.0.1:4943/?canisterId=rno2w-sqaaa-aaaaa-aaacq-cai&id=rkp4c-7iaaa-aaaaa-aaaca-cai
 * http://localhost:4943/?canisterId=<Candid_UI_CanisterId>&id=<post_asset_canisterId>
 */
const canisterId = process.env.POST_ASSETS_CANISTER_ID; // Canister id of the post asset canister

if (process.env.DFX_NETWORK !== "ic") {
  agent.fetchRootKey().catch((err) => {
    console.warn(
      "Unable to fetch root key. Check to ensure that your local replica is running"
    );
    console.error(err);
  });
}
const assetManager = new AssetManager({
  canisterId,
  agent,
});

/**
 *
 * @param {*} file The file to upload to the post asset canister
 * @param {*} pathToFile The path to the file. Every path has the structure.
 * Profile picture path starts like this "<user-principal-id>/profile/<uniqueId>/"
 * images associated with a posts starts like this "<user-principal-id>/post/<uniqueId>/"
 *
 * after deploying locally, run this command to authorize the post_asset canister
 * dfx canister call post_assets authorize '(principal "2vxsx-fae")'
 *
 * after deploying remotely, run this command to authorize the post_asset canister on mainnet. You only run this command
 * once.
 * dfx canister --network ic call post_assets authorize '(principal "2vxsx-fae")'
 */
export async function uploadFileToPostAssetCanister(file, pathToFile) {
  const key = await assetManager.store(file, {
    fileName: "",
    path: pathToFile,
  });
  return key;
}

export async function removeFileFromPostAssetCanister(pathToFile) {
  await assetManager.delete(pathToFile);
}

export async function getFileFromPostAssetCanister(pathToFile) {
  pathToFile += pathToFile.charAt(pathToFile.length - 1) == "/" ? "" : "/";
  const file = await assetManager.get(pathToFile);
  return file;
}

export function deletePostImagesFromPostAssetCanister(images) {
  images.forEach(async (image) => {
    await removeFileFromPostAssetCanister(image);
  });
}
