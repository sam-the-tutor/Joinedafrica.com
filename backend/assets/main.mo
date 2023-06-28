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

    public shared ({ caller }) func uploadAsset(asset : Asset, assetId : AssetId) : async Result.Result<(), Error> {
        let authorized = await ProfileCanister.isUserAuthorized(caller);
        if (not authorized) return #err(#UnAuthorizedUser);
        assets := Trie.put(assets, key(assetId), Text.equal, asset).0;
        #ok();
    };

    func key(assetId : AssetId) : Trie.Key<AssetId> {
        { hash = Text.hash(assetId); key = assetId };
    };
};
