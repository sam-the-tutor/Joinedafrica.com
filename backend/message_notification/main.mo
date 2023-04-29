import Trie "mo:base/Trie";
import Types "types";
import List "mo:base/List";
import Principal "mo:base/Principal";

actor MessageNotification {
    type Notification = Types.Notification;
    type UserId = Types.UserId;
    var notifications : Trie.Trie<UserId, List.List<Notification>> = Trie.empty();
    //send message notifications to the receiver
    public shared ({ caller }) func sendNotification(receiver : UserId) : async () {
        switch (Trie.get(notifications, hashKey(receiver), Principal.equal)) {
            case null {
                notifications := Trie.put(notifications, hashKey(receiver), Principal.equal, List.push({ sender = caller; receiver = receiver }, List.nil())).0;
            };
            case (?listOfNotifications) {
                notifications := Trie.put(notifications, hashKey(receiver), Principal.equal, List.push({ sender = caller; receiver = receiver }, listOfNotifications)).0;

            };
        };
    };
    //get myMyNotifications will be called from the webworker in the frontend.
    public shared query ({ caller }) func getMyNotifications() : async [Notification] {
        return switch (Trie.get(notifications, hashKey(caller), Principal.equal)) {
            case null [];
            case (?listOfNotifications) List.toArray(listOfNotifications);
        };
    };
    //this is when the user has clicked on the friend to view the list of messages or when the user
    //starts typing a message in the message box. It means the sender has seen the message
    public shared ({ caller }) func removeNotification() : async () {

    };
    func hashKey(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };
};
