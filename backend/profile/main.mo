import Type "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Error "mo:base/Error";


actor class ProfileCanister(){
    type UserId = Type.UserId;
    type Profile = Type.Profile;
    type Result<T, E> = Result.Result<T, E>;
    type Error = Type.Error;
       
    stable var userProfiles : Trie.Trie<UserId, Profile> = Trie.empty();

    //----------------------------------------------------------------------------------------
    // update calls
    //---------------------------------------------------------------------------------------

    public shared ({ caller }) func createUserProfile(profile : Profile) : async Result<Profile, Error> {
        //users that already have a profile shouldn't be able to create another profile with thesame identity
        if (not (userHasCreatedProfile(caller))) {
            userProfiles := Trie.put<UserId, Profile>(userProfiles, key(caller), Principal.equal, profile).0;
            #ok(profile);
        } else {
            #err(#UserAlreadyExists);
        };

    };

    public shared ({ caller }) func resetAll() : async () {
        userProfiles := Trie.empty<UserId, Profile>();
    };

    public shared ({ caller }) func updateUserProfile(profile : Profile) : async Result<Profile, Error> {
        if (userHasCreatedProfile(caller)) {
            userProfiles := Trie.replace<UserId, Profile>(userProfiles, key(caller), Principal.equal, Option.make(profile)).0;
            #ok(profile);
        } else {
            #err(#UserNotFound);
        };
    };

    //----------------------------------------------------------------------------------------
    // query calls
    //---------------------------------------------------------------------------------------
    public shared query ({ caller }) func getUserProfile() : async Result<Profile, Error> {
        // calling isUserAuthorized method in this method creates an error because of the async
        if (not (userHasCreatedProfile(caller) and not Principal.isAnonymous(caller))) {
            return #err(#UnAuthorizedUser);
        };
        switch (Trie.get(userProfiles, key(caller), Principal.equal)) {
            case null #err(#UserNotFound);
            case (?profile) #ok(profile);
        };
    };
    /**
    This function is only called by the profile canister We use this function to display top10Posts, and so on
    */
    public shared query func getUserProfilePicture(userId : UserId) : async Result<Profile, Error> {
        switch (Trie.get(userProfiles, key(userId), Principal.equal)) {
            case null #err(#UserNotFound);
            case (?profile) #ok(profile);
        };
    };

    func userHasCreatedProfile(caller : UserId) : Bool {
        switch (Trie.get(userProfiles, key(caller), Principal.equal)) {
            case null false;
            case (?profile) true;
        };

    };
    public shared query func isUserAuthorized(caller : UserId) : async Bool {
        return userHasCreatedProfile(caller) and not Principal.isAnonymous(caller);
    };

    func key(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };


  public shared({caller}) func whoami(): async Text{
    return Principal.toText(caller)
  }
};
