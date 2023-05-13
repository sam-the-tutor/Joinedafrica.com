import Type "types";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
module {
    type UserId = Type.UserId;
    type Profile = Type.Profile;

    public func userHasCreatedProfile(caller : UserId, userProfiles : Trie.Trie<UserId, Profile>) : Bool {
        switch (Trie.get(userProfiles, key(caller), Principal.equal)) {
            case null false;
            case (?profile) true;
        };

    };
    public func isUserAuthorized(caller : UserId, userProfiles : Trie.Trie<UserId, Profile>) : Bool {
        return userHasCreatedProfile(caller, userProfiles) and not Principal.isAnonymous(caller);
    };
    func key(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };
};
