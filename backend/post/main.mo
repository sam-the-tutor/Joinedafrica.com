import Trie "mo:base/Trie";
import Type "types";
import Posts "posts";
import DatabaseStructure "databasestructure";
import List "mo:base/List";
import Debug "mo:base/Debug";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Error "mo:base/Error";
import utils "utils";

shared ({ caller = initializer }) actor class () {

  type Category = Text;
  type Post = Type.Post;
  type UserId = Type.UserId;
  type Profile = Type.Profile;
  type Result<T, E> = Result.Result<T, E>;
  type PostId = Type.PostId;
  type Top10Posts = Type.Top10Posts;
  type Subcategory = Type.Subcategory;
  type Error = Type.Error;

  var posts : Posts.Posts = Posts.Posts();
  stable var stablePosts : [(UserId, Post)] = [];

  public shared ({ caller }) func createPost(post : Post) : async Result<(), Error> {
    if (Principal.isAnonymous(caller)) {
      return #err(#UnAuthorizedUser);
    };
    posts.createPost(post, caller);
    #ok();

  };
  //this method should be defined using query but but it will give an error because we're importing the
  //profile canister
  public shared ({ caller }) func getAllMyPostings() : async Result<[?Post], Error> {
    if (Principal.isAnonymous(caller)) {
      return #err(#UnAuthorizedUser);
    };
    #ok(posts.getAllMyPostings(caller));
  };
  /**
  this function is accessible to everybody and doens't need the caller to be authorized
  */
  public shared query func getPost(id : PostId) : async Result<Post, Error> {
    posts.getPostById(id);
  };
  public shared ({ caller }) func markPostAsPublished(updatedPost : Post) : async Result<(), Error> {
    if (Principal.isAnonymous(caller)) {
      return #err(#UnAuthorizedUser);
    };
    posts.markPostAsPublished(updatedPost, caller);
  };

  public shared query func getAllPostingsInSubcategory(category : Category, subcategory : Subcategory) : async Result<[Post], Error> {
    posts.getAllPostingsInSubcategory(category, subcategory);
  };

  /**
    Returns the top 10 postings from each subcategory in a category. This method doesn't need authentication
    and can be accessed by a user without an account. The post has to be published to the market place before it
    can be viewed by other users
  */
  public shared query ({ caller }) func getTop10PostingsInCategory(category : Category) : async Result<[Top10Posts], Error> {

    let top10Posts = Buffer.Buffer<Top10Posts>(0);
    //get all subcategories in a category
    let subCategories : [Subcategory] = DatabaseStructure.getSubcategory(category);
    //get the top 10 posts in a subcategory
    for (subcategory in subCategories.vals()) {
      switch (posts.getTop10PostingsInCategory(category, subcategory)) {
        case (#ok(posts)) top10Posts.add(posts);
        //the failure could be one of the error messages
        case (#err(failure)) return #err(failure);
      };
    };
    return #ok(Buffer.toArray(top10Posts));
  };

  /**
    The methods below are test methods
  */
  public shared ({ caller }) func whoAmI() : async UserId {
    return caller;
  };
  public shared query ({ caller }) func getAllPostIds() : async [PostId] {
    posts.getAllPostIds(caller);
  };

  //system method. Saving all the posts and user profiles in stable memory whenever we upgrade our canister.
  system func preupgrade() {
    stablePosts := posts.preupgrade();
  };
  //system method
  system func postupgrade() {
    posts.postupgrade(stablePosts);
    stablePosts := [];
  };

};
