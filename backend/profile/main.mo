import Type "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Error "mo:base/Error";

actor class Profile() {
    type UserId = Type.UserId;
    type Profile = Type.Profile;
    type Result<T, E> = Result.Result<T, E>;
    type Error = Type.Error;

    stable var userProfiles : Trie.Trie<UserId, Profile> = Trie.empty();
    // stable var stableProfiles : [(UserId, Profile)] = [];

    public shared ({ caller }) func createUserProfile(profile : Profile) : async Result<(), Error> {
        //users that already have a profile shouldn't be able to create another profile with thesame identity
        if (not (userHasCreatedProfile(caller))) {
            userProfiles := Trie.put<UserId, Profile>(userProfiles, key(caller), Principal.equal, profile).0;
            #ok();
        } else {
            #err(#UserAlreadyExists);
        };

    };

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

    //test method
    // public func getAllUsers() : [UserId] {
    //     Trie.toArray<UserId, Profile, UserId>(userProfiles, func(k, v) = k);
    // };
    //test method
    // public func deleteUserProfile(user : UserId) {
    //     userProfiles := Trie.remove(userProfiles, key(user), Principal.equal).0;
    // };
    //system method for saving user id and thier profile in stable memory before upgrading the canister
    // system func preupgrade() {
    //     stableProfiles := Trie.toArray<UserId, Profile, (UserId, Profile)>(userProfiles, func(k, v) = (k, v));
    // };
    // //system method for recovering profiles after canister is upgraded
    // system func postupgrade() {
    //     for ((userId, profile) in stableProfiles.vals()) {
    //         userProfiles := Trie.put<UserId, Profile>(userProfiles, key(userId), Principal.equal, profile).0;
    //     };
    //     stableProfiles := [];
    // };
    func key(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };

};
