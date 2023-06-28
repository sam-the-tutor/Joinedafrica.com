module {
    // AssetId can be in the form of <user_PrincipalId>/profile/<unique_id> or <user_PrincipalId>/post/<unique_id>
    // depending on the type of asset the user wants to store. The type of assets could be a post asset or a
    // profile asset
    public type AssetId = Text;
    public type Asset = [Nat8];
    public type Error = {
        #UnAuthorizedUser;
        #DuplicateAssetId;
    };
};
