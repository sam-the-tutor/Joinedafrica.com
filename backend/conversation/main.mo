//this line gies an error. You have to deploy the canisters to remove the error
import ProfileCanister "canister:profile";

import Debug "mo:base/Debug";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Trie "mo:base/Trie";

import types "types";
import utils "utils";

shared ({ caller = initializer }) actor class () {

  type Friend = types.Friend;
  type Message = types.Message;
  type Error = types.Error;
  type UserId = types.UserId;

  //conversations between two people
  stable var conversations : Trie.Trie<Friend, List.List<Message>> = Trie.empty();

  //a user has list of friends
  stable var friendList : Trie.Trie<UserId, List.List<UserId>> = Trie.empty();

  //----------------------------------------------------------------------------------------
  // update calls
  //---------------------------------------------------------------------------------------

  //user has to be authorized to make this function
  public shared ({ caller }) func sendMessage(message : Message) : async Result.Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    if (Principal.equal(message.sender, message.receiver)) {
      return #err(#UnAuthorizedUser);
    };
    var friend = utils.sortPrincipals(caller, message.receiver);
    switch (Trie.get(conversations, key(friend), Text.equal)) {
      case null {
        //caller and reciever haven't messaged each other before
        addUserToFriendList(caller, message.receiver);
        addUserToFriendList(message.receiver, caller);
        conversations := Trie.put(conversations, key(friend), Text.equal, List.push(message, List.nil())).0;
      };
      case (?list) {
        //caller and reciever have messaged each other before
        conversations := Trie.put(conversations, key(friend), Text.equal, List.push(message, list)).0;
      };
    };
    #ok();
  };

  public shared func resetAll() : async () {
    conversations := Trie.empty();
    friendList := Trie.empty();
  };

  private func addUserToFriendList(user1 : UserId, user2 : UserId) : () {
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

  //----------------------------------------------------------------------------------------
  // query calls
  //---------------------------------------------------------------------------------------

  public shared query ({ caller }) func getAllMyFriends() : async Result.Result<[UserId], Error> {
    // let authorized = await ProfileCanister.isUserAuthorized(caller);
    // if (not authorized) return #err(#UnAuthorizedUser);
    let result = switch (Trie.get(friendList, hashKey(caller), Principal.equal)) {
      case null [];
      case (?list) List.toArray(list);
    };
    #ok(result);
  };

  public shared query ({ caller }) func getMyMessages(friend : Friend) : async Result.Result<[Message], Error> {
    // let authorized = await ProfileCanister.isUserAuthorized(caller);
    // if (not authorized) return #err(#UnAuthorizedUser);
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
