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
    var conversations : Trie.Trie<Friend, List.List<Message>> = Trie.empty();
    stable var stableConversations : [(Friend, [Message])] = [];
    //a user has list of friends
    var friendList : Trie.Trie<UserId, List.List<UserId>> = Trie.empty();
    stable var stableFriendList : [(UserId, [UserId])] = [];

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
                //mark the last conversation between the two friends as seen (true) so we know all the messages
                //between the two friends are seen
                // switch(List.last(list)){
                //     case null return #err(#NoConversationFound);
                //     case (?conversation){

                //     }
                // }
                List.toArray(list);
            };
        };
        #ok(result);
    };

    //test methods
    public query func getAllFriends() : async [Friend] {
        Trie.toArray<Friend, List.List<Message>, Friend>(conversations, func(friend, message) = friend);
    };

    system func preupgrade() {
        stableConversations := Trie.toArray<Friend, List.List<Message>, (Friend, [Message])>(conversations, func(friend, messages) = (friend, List.toArray(messages)));
        stableFriendList := Trie.toArray<UserId, List.List<UserId>, (UserId, [UserId])>(friendList, func(userId, listOfUserIdFriends) = (userId, List.toArray(listOfUserIdFriends)));
    };

    system func postupgrade() {
        for ((friend, messages) in stableConversations.vals()) {
            conversations := Trie.put(conversations, key(friend), Text.equal, List.fromArray(messages)).0;
        };
        for ((userId, listOfUserIdFriends) in stableFriendList.vals()) {
            friendList := Trie.put(friendList, hashKey(userId), Principal.equal, List.fromArray(listOfUserIdFriends)).0;
        };
    };

    func key(t : Friend) : Trie.Key<Friend> {
        { hash = Text.hash(t); key = t };
    };
    func hashKey(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };

};
