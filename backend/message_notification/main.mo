import Trie "mo:base/Trie";
import Types "types";
import List "mo:base/List";

actor MessageNotification {
    type Notification = Types.Notification;
    type UserId = Types.UserId;
    var conversations : Trie.Trie<UserId, List.List<Notification>> = Trie.empty();

};
