//this line gies an error. You have to deploy the canisters to remove the error
import ProfileCanister "canister:profile";

import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Trie "mo:base/Trie";

import DatabaseStructure "databasestructure";
import Type "types";
import Util "utils";

shared ({ caller = initializer }) actor class () {

  type Category = Text;
  type Post = Type.Post;
  type UserId = Type.UserId;
  type Result<T, E> = Result.Result<T, E>;
  type PostId = Type.PostId;
  type Top10Posts = Type.Top10Posts;
  type Subcategory = Type.Subcategory;
  type Error = Type.Error;
  type Database = Type.Database;

  //stores all the published posts
  stable var publishedPosts = Util.createDatabase(DatabaseStructure.Database);

  //Every post and can be identified by its id
  stable var postsLedger : Trie.Trie<PostId, Post> = Trie.empty();

  //stores all personal postings created by the unique principal
  stable var myPostings : Trie.Trie<UserId, List.List<PostId>> = Trie.empty();

  //posts currently on review.
  stable var postsOnReview : List.List<PostId> = List.nil<PostId>();

  //----------------------------------------------------------------------------------------
  // update calls
  //---------------------------------------------------------------------------------------

  public shared ({ caller }) func createPost(post : Post) : async Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    let userPostings : List.List<PostId> = switch (Trie.get(myPostings, hashKey(caller), Principal.equal)) {
      case null List.nil();
      case (?postids) postids;
    };
    myPostings := Trie.put(myPostings, hashKey(caller), Principal.equal, List.push(post.PostId, userPostings)).0;
    postsLedger := Trie.put(postsLedger, textHash(post.PostId), Text.equal, post).0;
    #ok();

  };

  public shared func resetAll() : async () {
    myPostings := Trie.empty();
    postsLedger := Trie.empty();
    publishedPosts := Util.createDatabase(DatabaseStructure.Database);
  };

  /*
    Only posts that are not published to the marketplace can be deleted. A post that is published to the marketplace
    has to first be removed from the marketplace before they can be deleted.
  */
  public shared ({ caller }) func deletePost(postId : PostId) : async Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    switch (Trie.get(myPostings, hashKey(caller), Principal.equal)) {
      case null return #err(#UserNotFound);
      case (?postings) {
        let myNewPostIds = List.filter(
          postings,
          func(id : PostId) : Bool {
            return id != postId;
          },
        );
        myPostings := Trie.put(myPostings, hashKey(caller), Principal.equal, myNewPostIds).0;
        postsLedger := Trie.remove(postsLedger, textHash(postId), Text.equal).0;
      };
    };
    #ok();
  };

  private func postIsAlreadyInReview(postId : PostId) : Bool {
    return List.some(
      postsOnReview,
      func(id : PostId) : Bool {
        return postId == id;
      },
    );
  };

  public shared ({ caller }) func markPostAsPublished(updatedPost : Post) : async Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    if (postIsAlreadyInReview(updatedPost.PostId)) return #err(#PostIsAlreadyInReview);
    postsOnReview := List.push(updatedPost.PostId, postsOnReview);
    #ok();
  };

  /**
    Only posts that have been reviewed by Joined Africa team can be published to the marketplace.
  */
  public shared func publishPost(post : Post) : async Result.Result<(), Error> {
    //getting the correct category the post is associated to
    Debug.print(debug_show (post));
    switch (Trie.get(publishedPosts, categoryKey(post.Category), Text.equal)) {
      case null return #err(#CategoryNotFound);
      case (?subTrie) {
        //get the right subcategory the post is associated to
        switch (Trie.get(subTrie, categoryKey(post.Subcategory), Text.equal)) {
          case null return #err(#SubcategoryNotFound);
          case (?list) {
            var subcategoryTrie = subTrie;
            subcategoryTrie := Trie.put(subcategoryTrie, categoryKey(post.Subcategory), Text.equal, List.push(post.PostId, list)).0;
            publishedPosts := Trie.put(publishedPosts, categoryKey(post.Category), Text.equal, subcategoryTrie).0;
            postsLedger := Trie.replace<PostId, Post>(postsLedger, textHash(post.PostId), Text.equal, Option.make(post)).0;
          };
        };

      };
    };
    #ok();
  };

  /**
    Only posts that have been reviewed by Joined Africa team can be published to the marketplace.
  */
  public shared func removePostFromReview(post : Post) : async () {
    postsOnReview := List.filter(
      postsOnReview,
      func(postId : PostId) : Bool {
        return postId != post.PostId;
      },
    );
  };
  public shared ({ caller }) func removePostFromMarketplace(post : Post) : async Result<(), Error> {
    let authorized = await ProfileCanister.isUserAuthorized(caller);
    if (not authorized) return #err(#UnAuthorizedUser);
    /*
      Updating the post in the ledger. The post passed as an argument will not be published. This was done from
      the front end. We updated the post in the ledger as not published.
    */
    postsLedger := Trie.replace<PostId, Post>(postsLedger, textHash(post.PostId), Text.equal, Option.make(post)).0;
    //The switch statement below removes the post from the marketplace
    switch (Trie.get(publishedPosts, categoryKey(post.Category), Text.equal)) {
      case null {
        return #err(#CategoryNotFound);
      };
      case (?subcategoryList) {
        switch (Trie.get(subcategoryList, categoryKey(post.Subcategory), Text.equal)) {
          case null {
            return #err(#SubcategoryNotFound);
          };
          case (?listOfPostIds) {

            let newList = List.filter(
              listOfPostIds,
              func(publishedPostIds : PostId) : Bool {
                return publishedPostIds != post.PostId;
              },
            );
            let updatedSubcategory = Trie.put(subcategoryList, categoryKey(post.Subcategory), Text.equal, newList).0;
            publishedPosts := Trie.put(publishedPosts, categoryKey(post.Category), Text.equal, updatedSubcategory).0;
            #ok();
          };
        };

      };
    };
  };

  //----------------------------------------------------------------------------------------
  // query calls
  //---------------------------------------------------------------------------------------

  public shared query ({ caller }) func getAllMyPostings() : async Result<[?Post], Error> {
    // let authorized = await ProfileCanister.isUserAuthorized(caller);
    // if (not authorized) return #err(#UnAuthorizedUser);
    let result = switch (Trie.get(myPostings, hashKey(caller), Principal.equal)) {
      case null [];
      case (?myPosts) {
        Array.mapEntries<PostId, ?Post>(
          List.toArray(myPosts),
          func(postid, index) {
            Trie.get(postsLedger, textHash(postid), Text.equal);
          },
        );
      };
    };
    #ok(result);
  };

  public shared query ({ caller }) func getPostsOnReview() : async Result<[Post], Error> {
    var result : List.List<Post> = List.nil();
    for (postId in List.toArray(postsOnReview).vals()) {
      switch (getPostById(postId)) {
        case (#err(errorValue)) return #err(errorValue);
        case (#ok(post)) {
          result := List.push(post, result);
        };
      };
    };
    return #ok(List.toArray(result));
  };

  /**
    This function is accessible to everybody and doens't need the caller to be authorized
  */
  public shared query func getPost(id : PostId) : async Result<Post, Error> {
    return switch (Trie.get(postsLedger, textHash(id), Text.equal)) {
      case null #err(#PostNotFound);
      case (?post) #ok(post);
    };
  };
  private func getPostById(id : PostId) : Result<Post, Error> {
    return switch (Trie.get(postsLedger, textHash(id), Text.equal)) {
      case null #err(#PostNotFound);
      case (?post) #ok(post);
    };
  };

  //caller doens't have to be authorized
  public shared query func getTop10PostingsInHomepage() : async Result<[Top10Posts], Error> {
    let top10Posts = Buffer.Buffer<Top10Posts>(0);
    //get all subcategories in a category
    let allCategories : [Category] = DatabaseStructure.getAllCategories();
    for (category in allCategories.vals()) {
      switch (_getTop10PostingsInHomepage(category)) {
        case (#err(result)) return #err(result);
        case (#ok(result)) {
          var posts = Buffer.Buffer<Post>(0);
          for (top10PostCategory in result.vals()) {
            for (post in top10PostCategory.post.vals()) {
              posts.add(post);
            };
          };
          top10Posts.add({ name = category; post = Buffer.toArray(posts) });
        };
      };
    };
    return #ok(Buffer.toArray(top10Posts));
  };

  /**
    This function is accessible to everybody and doens't need the caller to be authorized.
  */
  public shared query func getAllPostingsInSubcategory(category : Category, subcategory : Subcategory) : async Result<[Post], Error> {
    switch (Trie.get(publishedPosts, categoryKey(category), Text.equal)) {
      case null return #err(#CategoryNotFound);
      case (?subcatgoryTrie) {
        switch (Trie.get(subcatgoryTrie, categoryKey(subcategory), Text.equal)) {
          case null return #err(#SubcategoryNotFound);
          case (?listOfPostIds) {
            let result = Buffer.Buffer<Post>(0);
            let arrayOfPostIds = List.toArray(listOfPostIds);
            for (postId in arrayOfPostIds.vals()) {
              switch (getPostById(postId)) {
                case (#err(value)) return #err(value);
                case (#ok(post)) {
                  result.add(post);
                };
              };
            };
            return #ok(Buffer.toArray(result));
          };

        };
      };
    };
  };

  private func _getTop10PostingsInHomepage(category : Category) : Result<[Top10Posts], Error> {

    let top10Posts = Buffer.Buffer<Top10Posts>(0);
    //get all subcategories in a category
    let subCategories : [Subcategory] = DatabaseStructure.getSubcategory(category);
    //get the top 10 posts in a subcategory
    for (subcategory in subCategories.vals()) {
      switch (_getTop10PostingsInCategory(category, subcategory)) {
        case (#ok(posts)) top10Posts.add(posts);
        //the failure could be one of the error messages
        case (#err(failure)) return #err(failure);
      };
    };
    return #ok(Buffer.toArray(top10Posts));
  };

  // /**
  //   Returns the top 10 postings from each subcategory in a category. This method doesn't need authentication
  //   and can be accessed by a user without an account. The post has to be published to the market place before it
  //   can be viewed by other users
  // */
  public shared query func getTop10PostingsInCategory(category : Category) : async Result<[Top10Posts], Error> {

    let top10Posts = Buffer.Buffer<Top10Posts>(0);
    //get all subcategories in a category
    let subCategories : [Subcategory] = DatabaseStructure.getSubcategory(category);
    //get the top 10 posts in a subcategory
    for (subcategory in subCategories.vals()) {
      switch (_getTop10PostingsInCategory(category, subcategory)) {
        case (#ok(posts)) top10Posts.add(posts);
        //the failure could be one of the error messages
        case (#err(failure)) return #err(failure);
      };
    };
    return #ok(Buffer.toArray(top10Posts));
  };
  private func _getTop10PostingsInCategory(category : Category, subcategory : Subcategory) : Result.Result<Top10Posts, Error> {
    let top10Posts = Buffer.Buffer<Post>(0);
    switch (Trie.get(publishedPosts, categoryKey(category), Text.equal)) {
      case null return #err(#CategoryNotFound);
      case (?subTrie) {
        switch (Trie.get(subTrie, categoryKey(subcategory), Text.equal)) {
          case null return #err(#SubcategoryNotFound);
          case (?listOfPostIds) {
            let arrayOfPostIds = List.toArray(listOfPostIds);
            var index = 0;
            //if we get to the 11th post, we break the loop
            while (index < arrayOfPostIds.size() and index < 11) {
              switch (getPostById(arrayOfPostIds[index])) {
                case (#ok(post)) {
                  top10Posts.add(post);
                };
                case (#err(failure)) return #err(failure);
              };
              index := index + 1;
            };
          };
        };
      };
    };
    return #ok({
      post = Buffer.toArray(top10Posts);
      name = subcategory;
    });
  };

  func hashKey(t : UserId) : Trie.Key<UserId> {
    { hash = Principal.hash(t); key = t };
  };
  func textHash(t : PostId) : Trie.Key<PostId> {
    { hash = Text.hash(t); key = t };
  };
  func categoryKey(t : Category) : Trie.Key<Category> {
    { key = t; hash = Text.hash(t) };
  };

};
