import Type "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Error "mo:base/Error";

/**
    This module contains all operations on users create, update, read, delete and so on.
*/
module {
    type UserId = Type.UserId;
    type Profile = Type.Profile;
    type Result<T, E> = Result.Result<T, E>;
    type Error = Type.Error;

    public class UserProfiles() {
        var userProfiles : Trie.Trie<UserId, Profile> = Trie.empty();

        public func createUserProfile(user : Profile, caller : UserId) : Result<(), Error> {
            //users that already have a profile shouldn't be able to create another profile with thesame identity
            if (not userHasCreatedProfile(caller)) {
                userProfiles := Trie.put<UserId, Profile>(userProfiles, key(caller), Principal.equal, user).0;
                #ok();
            } else {
                #err(#UserAlreadyExists);
            };

        };

        public func getUserProfile(caller : UserId) : Result<Profile, Error> {
            switch (Trie.get(userProfiles, key(caller), Principal.equal)) {
                case null #err(#UserNotFound);
                case (?profile) #ok(profile);
            };
        };
        public func userHasCreatedProfile(caller : UserId) : Bool {
            switch (Trie.get(userProfiles, key(caller), Principal.equal)) {
                case null false;
                case (?profile) true;
            };

        };
        public func isUserAuthorized(caller : UserId) : Bool {
            return userHasCreatedProfile(caller) and not Principal.isAnonymous(caller);
        };

        //test method
        public func getAllUsers() : [UserId] {
            Trie.toArray<UserId, Profile, UserId>(userProfiles, func(k, v) = k);
        };
        //test method
        public func deleteUserProfile(user : UserId) {
            userProfiles := Trie.remove(userProfiles, key(user), Principal.equal).0;
        };
        //system method for saving user id and thier profile in stable memory before upgrading the canister
        public func preupgrade() : [(UserId, Profile)] {
            Trie.toArray<UserId, Profile, (UserId, Profile)>(userProfiles, func(k, v) = (k, v));
        };
        //system method for recovering profiles after canister is upgraded
        public func postupgrade(stableProfiles : [(UserId, Profile)]) {
            for ((userId, profile) in stableProfiles.vals()) {
                switch (createUserProfile(profile, userId)) {
                    case (#err(error)) {};
                    case (#ok()) {};
                };
            };
        };
        func key(t : UserId) : Trie.Key<UserId> {
            { hash = Principal.hash(t); key = t };
        };

    };
};
