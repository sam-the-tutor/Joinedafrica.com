import Trie "mo:base/Trie";
import Types "types";
import Text "mo:base/Text";
import Option "mo:base/Option";
import List "mo:base/List";
import Util "utils";
import DatabaseStructure "DatabaseStructure";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
/**
    This module is reponsible all published posts. 
*/
module {
    type Post = Types.Post;
    type Database = Types.Database;
    type PostId = Types.PostId;
    type UserId = Types.UserId;
    type Category = Types.Category;
    type Subcategory = Types.Subcategory;
    type Top10Posts = Types.Top10Posts;
    type Error = Types.Error;

    public class Posts() {
        //stores all the published posts
        var publishedPosts = Util.createDatabase(DatabaseStructure.Database);

        var singlePosts : Trie.Trie<PostId, Post> = Trie.empty();

        //stores all personal postings created by the users that deployed this canister.
        var myPostings : Trie.Trie<UserId, List.List<PostId>> = Trie.empty();

        public func createPost(newPost : Post, userId : UserId) {
            let userPostings : List.List<PostId> = switch (Trie.get(myPostings, hashKey(userId), Principal.equal)) {
                case null List.nil();
                case (?postids) postids;
            };
            myPostings := Trie.put(myPostings, hashKey(userId), Principal.equal, List.push(newPost.postId, userPostings)).0;
            singlePosts := Trie.put(singlePosts, textHash(newPost.postId), Text.equal, newPost).0;
        };
        public func getAllMyPostings(userId : UserId) : [?Post] {
            switch (Trie.get(myPostings, hashKey(userId), Principal.equal)) {
                case null [];
                case (?myPosts) {
                    Array.mapEntries<PostId, ?Post>(
                        List.toArray(myPosts),
                        func(postid, index) {
                            Debug.print(postid);
                            Trie.get(singlePosts, textHash(postid), Text.equal);
                        },
                    );
                };
            };

        };
        //only joined africa calls this function
        public func getAllPostingsInSubcategory(category : Category, subcategory : Subcategory) : Result.Result<[Post], Error> {
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

        //based on the category and sub category, add this post id in the list
        func publishPost(post : Post) : Result.Result<(), Error> {
            //getting the correct category the post is associated to
            switch (Trie.get(publishedPosts, categoryKey(post.category), Text.equal)) {
                case null return #err(#CategoryNotFound);
                case (?subTrie) {
                    //get the right subcategory the post is associated to
                    switch (Trie.get(subTrie, categoryKey(post.subcategory), Text.equal)) {
                        case null return #err(#SubcategoryNotFound);
                        case (?list) {
                            var subcategoryTrie = subTrie;
                            subcategoryTrie := Trie.put(subcategoryTrie, categoryKey(post.subcategory), Text.equal, List.push(post.postId, list)).0;
                            publishedPosts := Trie.put(publishedPosts, categoryKey(post.category), Text.equal, subcategoryTrie).0;

                        };
                    };

                };
            };
            #ok();
        };

        /**
            Get the top 10 postings in a subcategory. 
        */
        public func getTop10PostingsInCategory(category : Category, subcategory : Subcategory) : Result.Result<Top10Posts, Error> {
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
                subCategoryName = subcategory;
            });
        };
        public func markPostAsPublished(post : Post, userId : UserId) : Result.Result<(), Error> {
            //replace the previous post
            singlePosts := Trie.replace<PostId, Post>(singlePosts, textHash(post.postId), Text.equal, Option.make(post)).0;
            return switch (publishPost(post)) {
                case (#err(error)) #err(error);
                case (#ok()) #ok();
            };

        };
        public func getPostById(id : PostId) : Result.Result<Post, Error> {
            switch (Trie.get(singlePosts, textHash(id), Text.equal)) {
                case null #err(#PostNotFound);
                case (?post) #ok(post);
            };
        };
        //this method is a testing method, and will be removed
        public func getAllPostIds(caller : UserId) : [PostId] {
            Trie.toArray<PostId, Post, PostId>(singlePosts, func(k, v) = k);
        };

        //system method. Saving the usersId and post in stable memory.
        public func preupgrade() : [(UserId, Post)] {
            Trie.toArray<PostId, Post, (UserId, Post)>(singlePosts, func(k, v) = (v.creatorOfPostId, v));
        };
        //system method. After upgrading the canister, we initialise our data structures back with the posts
        public func postupgrade(stablePosts : [(UserId, Post)]) {
            for ((userId, post) in stablePosts.vals()) {
                createPost(post, userId);
                if (post.isPublished) {
                    switch (publishPost(post)) {
                        case (#err(error)) {};
                        case (#ok()) {};
                    };
                };
            };
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

};
