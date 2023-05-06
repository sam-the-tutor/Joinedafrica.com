import Trie "mo:base/Trie";
import Types "types";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
actor MessageNotification {
    type Notification = Types.Notification;
    type UserId = Types.UserId;
    var notifications : Trie.Trie<UserId, List.List<Notification>> = Trie.empty();
    stable var stableNotifications : [(UserId, [Notification])] = [];
    //send message notifications to the receiver
    public shared ({ caller }) func sendNotification(message : Notification) : async () {
        Debug.print("readchded re");
        switch (Trie.get(notifications, hashKey(message.mainReceiver), Principal.equal)) {
            case null {
                notifications := Trie.put(notifications, hashKey(message.mainReceiver), Principal.equal, List.push(message, List.nil())).0;
            };
            case (?listOfNotifications) {
                notifications := Trie.put(notifications, hashKey(message.mainReceiver), Principal.equal, List.push(message, listOfNotifications)).0;

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
    system func postupgrade() {
        for ((userId, mynotifications) in stableNotifications.vals()) {
            notifications := Trie.put(notifications, hashKey(userId), Principal.equal, List.fromArray(mynotifications)).0;
        };
        stableNotifications :=[];
    };
    system func preupgrade() {
        stableNotifications := Trie.toArray<UserId, List.List<Notification>, (UserId, [Notification])>(notifications, func(userId, notifications) = (userId, List.toArray(notifications)));
    };
    func hashKey(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };
};
