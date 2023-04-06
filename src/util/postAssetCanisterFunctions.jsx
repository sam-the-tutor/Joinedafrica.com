// Create asset manager instance
import { AssetManager } from "@dfinity/assets";
import { HttpAgent } from "@dfinity/agent";

const canisterId = process.env.POST_ASSETS_CANISTER_ID; // Canister id of the post asset canister
const agent = new HttpAgent(); // Agent with an authorized identity

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
 * Profile picture path starts like this "<user-principal-id>/profile/<file name>"
 * images associated with a posts starts like this "<user-principal-id>/post/<post-id>"
 *
 * after deploying locally, run this command to authorize the post_asset canister
 * dfx canister call post_assets authorize '(principal "2vxsx-fae")'
 *
 * after deploying remotely, run this command to authorize the post_asset canister on mainnet. You only run this command
 * once.
 * dfx canister --network ic call post_assets authorize '(principal "2vxsx-fae")'
 */
export async function uploadFileToPostAssetCanister(file, pathToFile) {
  const key = await assetManager.store(file, { path: pathToFile });
  return key;
}

export async function removeFileFromPostAssetCanister(pathToFile) {
  await assetManager.delete(pathToFile);
}

export async function getFileFromPostAssetCanister(pathToFile) {
  const file = await assetManager.get(pathToFile);
  return file;
}
