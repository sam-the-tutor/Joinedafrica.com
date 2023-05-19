import Trie "mo:base/Trie";
import types "types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import utils "utils";
shared ({ caller = initializer }) actor class () {

    type Friend = types.Friend;
    type Message = types.Message;
    type Error = types.Error;
    type UserId = types.UserId;

    //conversations between two people
    stable var conversations : Trie.Trie<Friend, List.List<Message>> = Trie.empty();
    stable var stableConversations : [(Friend, [Message])] = [];
    //a user has list of friends
    stable var friendList : Trie.Trie<UserId, List.List<UserId>> = Trie.empty();
    // stable var stableFriendList : [(UserId, [UserId])] = [];

    //user has to be authorized to make this function
    public shared ({ caller }) func sendMessage(message : Message) : async Result.Result<(), Error> {
        Debug.print("caller is ");
        Debug.print(debug_show (caller));
        if (Principal.isAnonymous(caller) or Principal.equal(message.sender, message.mainReceiver)) {
            return #err(#UnAuthorizedUser);
        };
        var friend = utils.sortPrincipals(caller, message.mainReceiver);
        switch (Trie.get(conversations, key(friend), Text.equal)) {
            case null {
                //caller and reciever haven't messaged each other before
                await addUserToFriendList(caller, message.mainReceiver);
                await addUserToFriendList(message.mainReceiver, caller);
                conversations := Trie.put(conversations, key(friend), Text.equal, List.push(message, List.nil())).0;
            };
            case (?list) {
                //caller and reciever have messaged each other before
                conversations := Trie.put(conversations, key(friend), Text.equal, List.push(message, list)).0;
            };
        };
        #ok();
    };

    public func addUserToFriendList(user1 : UserId, user2 : UserId) : async () {
        switch (Trie.get(friendList, hashKey(user1), Principal.equal)) {
            case null {
                friendList := Trie.put(friendList, hashKey(user1), Principal.equal, List.push(user2, List.nil())).0;
            };
            case (?list) {
                //if user1 doesn't contain user2's id
                let containsReceiver = List.some<UserId>(list, func receiverId = receiverId == user2);
                if (not containsReceiver) {
                    friendList := Trie.put(friendList, hashKey(user1), Principal.equal, List.push(user2, list)).0;
                };
            };
        };
    };

    public shared query ({ caller }) func getAllMyFriends() : async Result.Result<[UserId], Error> {
        if (Principal.isAnonymous(caller)) {
            return #err(#UnAuthorizedUser);
        };
        let result = switch (Trie.get(friendList, hashKey(caller), Principal.equal)) {
            case null [];
            case (?list) List.toArray(list);
        };
        #ok(result);
    };

    public shared query ({ caller }) func getMyMessages(friend : Friend) : async Result.Result<[Message], Error> {
        if (Principal.isAnonymous(caller)) {
            return #err(#UnAuthorizedUser);
        };
        var sortedPrincipals = utils.sortPrincipals(caller, Principal.fromText(friend));
        let result = switch (Trie.get(conversations, key(sortedPrincipals), Text.equal)) {
            case null [];
            case (?list) {
                List.toArray(list);
            };
        };
        #ok(result);
    };

    //test methods
    public query func getAllFriends() : async [Friend] {
        Trie.toArray<Friend, List.List<Message>, Friend>(conversations, func(friend, message) = friend);
    };
    func key(t : Friend) : Trie.Key<Friend> {
        { hash = Text.hash(t); key = t };
    };
    func hashKey(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };

};
