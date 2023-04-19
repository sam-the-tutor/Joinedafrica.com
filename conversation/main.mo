import Trie "mo:base/Trie";
import types "types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Debug "mo:base/Debug";

shared ({ caller = initializer }) actor class () {

    type Friend = types.Friend;
    type Message = types.Message;
    type Error = types.Error;
    type UserId = types.UserId;

    //conversations between two people
    var conversations : Trie.Trie<Friend, List.List<Message>> = Trie.empty();
    //a user has list of friends
    var friendList : Trie.Trie<UserId, List.List<UserId>> = Trie.empty();
    //user has to be authorized to make this function
    public shared ({ caller }) func sendMessage(message : Message) : async Result.Result<(), Error> {
        Debug.print("caller is ");
        Debug.print(debug_show (caller));
        if (Principal.isAnonymous(caller) or Principal.equal(message.sender, message.receiver)) {
            return #err(#UnAuthorizedUser);
        };
        let callerPrincipal = Principal.toText(caller);
        let receiverPrincipal = Principal.toText(message.receiver);
        //sorting the principals. <lesser principal>and<greater principal> so we can identity two users in contact with
        //each other
        var friend : Friend = "";
        if (caller > message.receiver) {
            friend := receiverPrincipal # "and" #callerPrincipal;
        } else {
            friend := callerPrincipal # "and" # receiverPrincipal;
        };

        switch (Trie.get(conversations, key(friend), Text.equal)) {
            case null {
                //caller and reciever haven't messaged each other before
                conversations := Trie.put(conversations, key(friend), Text.equal, List.push(message, List.nil())).0;
            };
            case (?list) {
                //caller and reciever have messaged each other before
                conversations := Trie.put(conversations, key(friend), Text.equal, List.push(message, list)).0;
            };
        };
        #ok();
    };

    //test methods
    public query func getAllFriends() : async [Friend] {
        Trie.toArray<Friend, List.List<Message>, Friend>(conversations, func(friend, message) = friend);
    };
    public query func getAllMessages() : async [Message] {
        [];
    };

    func key(t : Friend) : Trie.Key<Friend> {
        { hash = Text.hash(t); key = t };
    };

};
