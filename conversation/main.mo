import Trie "mo:base/Trie";
import types "types";
import List "mo:base/List";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

shared ({ caller = initializer }) actor class () {

    type Friend = types.Friend;
    type Message = types.Message;
    type Error = types.Error;

    var conversations : Trie.Trie<Friend, List.List<Message>> = Trie.empty();

    //user has to be authorized to make this function
    public shared ({ caller }) func sendMessage(message : Message) : async Result.Result<(), Error> {
        if (Principal.isAnonymous(caller)) {
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

    func key(t : Friend) : Trie.Key<Friend> {
        { hash = Text.hash(t); key = t };
    };

};
