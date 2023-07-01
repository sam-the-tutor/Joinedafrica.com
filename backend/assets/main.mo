import ProfileCanister "canister:profile";

import Result "mo:base/Result";
import Text "mo:base/Text";
import Trie "mo:base/Trie";

import types "types";

shared ({ caller = initializer }) actor class () {
  type Error = types.Error;
  type AssetId = types.AssetId;
  type Asset = types.Asset;
  stable var assets : Trie.Trie<AssetId, Asset> = Trie.empty();

  //----------------------------------------------------------------------------------------
  // update calls
  //---------------------------------------------------------------------------------------

  public shared ({ caller }) func uploadAsset(asset : Asset, assetId : AssetId) : async Result.Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    assets := Trie.put(assets, key(assetId), Text.equal, asset).0;
    #ok();
  };

  public shared ({ caller }) func deleteAsset(assetId : AssetId) : async Result.Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    let (updatedAsset, asset) = Trie.remove(assets, key(assetId), Text.equal);
    switch (asset) {
      case null return #err(#AssetNotFound);
      case _ {
        assets := updatedAsset;
        #ok();
      };
    };
  };

  public shared ({ caller }) func resetAll() : async () {
    assets := Trie.empty<AssetId, Asset>();
  };

  //----------------------------------------------------------------------------------------
  // query calls
  //---------------------------------------------------------------------------------------

  //The caller doens't have to be authenticated to call this function
  public shared query ({ caller }) func getAsset(assetId : AssetId) : async Result.Result<Asset, Error> {
    return switch (Trie.get(assets, key(assetId), Text.equal)) {
      case null #err(#AssetNotFound);
      case (?asset) #ok(asset);
    };
  };

  func key(assetId : AssetId) : Trie.Key<AssetId> {
    { hash = Text.hash(assetId); key = assetId };
  };
};
