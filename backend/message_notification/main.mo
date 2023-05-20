import Trie "mo:base/Trie";
import Types "types";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";

//user caller of this must be registered in the profile otherwise, an error message is sent
actor MessageNotification {
    type Notification = Types.Notification;
    type UserId = Types.UserId;
    stable var notifications : Trie.Trie<UserId, List.List<Notification>> = Trie.empty();

    //----------------------------------------------------------------------------------------
    // update calls
    //---------------------------------------------------------------------------------------

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
    public shared ({ caller }) func getMyNotifications() : async [Notification] {
        return switch (Trie.get(notifications, hashKey(caller), Principal.equal)) {
            case null [];
            case (?listOfNotifications) {
                //remove all previous notifications for this caller
                notifications := Trie.remove(notifications, hashKey(caller), Principal.equal).0;
                List.toArray(listOfNotifications);
            };
        };
    };

    //this is when the user has clicked on the friend to view the list of messages or when the user
    //starts typing a message in the message box. It means the sender has seen the message

    public shared ({ caller }) func clearAllNotifications() : async () {
        notifications := Trie.remove(notifications, hashKey(caller), Principal.equal).0;
    };
    //test method
    public shared ({ caller }) func removeNotification(user : UserId) : async () {
        notifications := Trie.remove(notifications, hashKey(user), Principal.equal).0;
    };

    func hashKey(t : UserId) : Trie.Key<UserId> {
        { hash = Principal.hash(t); key = t };
    };
};
