import Trie "mo:base/Trie";
import Type "types";
import Posts "Posts";
import DatabaseStructure "DatabaseStructure";
import List "mo:base/List";
import Debug "mo:base/Debug";
import UserProfiles "UserProfiles";
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

  /**
    All data structures 
  */

  //publishedPosts contains all published posts (visible to other users)
  var posts : Posts.Posts = Posts.Posts();

  //users profile, includes create, deleting, searching, and editing profiles
  var userProfiles : UserProfiles.UserProfiles = UserProfiles.UserProfiles();

  stable var stablePosts : [(UserId, Post)] = [];
  stable var stableProfiles : [(UserId, Profile)] = [];

  /**
    The methods below are for user profiles
  */

  //new users have to create their profile to gain more access to the site.
  public shared ({ caller }) func createUserProfile(profile : Profile) : async Result<(), Error> {
    Debug.print("creating user profile");
    Debug.print(debug_show(caller));
    userProfiles.createUserProfile(profile, caller);
  };

  public shared query ({ caller }) func getUserProfile() : async Result<Profile, Error> {
        Debug.print("geeting user profile");
  Debug.print(debug_show(caller));
    if (not (userProfiles.isUserAuthorized(caller))) {
      return #err(#UnAuthorizedUser);
    };
    userProfiles.getUserProfile(caller);
  };

//this function is only called by the canister (joined africa), 
//all userIds are not annoymous and are in the registered list
//we use this function to display top10Posts, and so on
public shared query func getUserProfilePicture(userId : UserId) : async Result<Profile, Error>{
      userProfiles.getUserProfile(userId);
};
  /**
  The methods below are for my Postings.
*/
  public shared ({ caller }) func createPost(post : Post) : async Result<(), Error> {
    if (not (userProfiles.isUserAuthorized(caller))) {
      return #err(#UnAuthorizedUser);
    };
    posts.createPost(post, caller);
    #ok();

  };
  public shared query ({ caller }) func getAllMyPostings() : async Result<[?Post], Error> {
            Debug.print("get all my postings");
  Debug.print(debug_show(caller));
    if (not (userProfiles.isUserAuthorized(caller))) {
      return #err(#UnAuthorizedUser);
    };
    #ok(posts.getAllMyPostings(caller));
  };
  //this function is accessible to everybody and doens't need the caller to be authorized
  public shared query func getPost(id : PostId) : async Result<Post, Error> {
     posts.getPostById(id);
  };
  public shared ({ caller }) func markPostAsPublished(updatedPost : Post) : async Result<(), Error> {
    if (not (userProfiles.isUserAuthorized(caller))) {
      return #err(#UnAuthorizedUser);
    };
    posts.markPostAsPublished(updatedPost, caller);
  };

  /**
    Returns the top 10 postings from each subcategory in a category. This method doesn't need authentication
    and can be accessed by a user without an account. The post has to be published to the market place before it
    can be viewed by other users
  */
  public shared query ({ caller }) func getTop10SubcategoryPostingsInCategory(category : Category) : async Result<[Top10Posts], Error> {

    let top10Posts = Buffer.Buffer<Top10Posts>(0);
    //get all subcategories in a category
    let subCategories : [Subcategory] = DatabaseStructure.getSubcategory(category);
    //get the top 10 posts in a subcategory
    for (subcategory in subCategories.vals()) {
      switch (posts.getTop10PostingsInSubcategory(category, subcategory)) {
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
  //get the principal id of the caller
  public shared ({ caller }) func whoAmI() : async UserId {
    return caller;
  };
  public shared query ({ caller }) func getAllPostIds() : async [PostId] {
    posts.getAllPostIds(caller);
  };
  public  shared query func getAllUsersId() : async [UserId] {
    userProfiles.getAllUsers();
  };
  public func deleteUserProfile(user : UserId) : async(){
        userProfiles.deleteUserProfile(user);
  };

  //system method. Saving all the posts and user profiles in stable memory whenever we upgrade our canister.
  system func preupgrade() {
    stablePosts := posts.preupgrade();
    stableProfiles := userProfiles.preupgrade();
  };
  //system method
  system func postupgrade() {
    posts.postupgrade(stablePosts);
    userProfiles.postupgrade(stableProfiles);
    stablePosts := [];
    stableProfiles := [];
  };

};
