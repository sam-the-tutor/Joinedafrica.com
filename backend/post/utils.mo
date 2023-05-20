import List "mo:base/List";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Trie "mo:base/Trie";

import DatabaseStructure "databasestructure";
import Types "types";

module {
    type UserId = Types.UserId;
    type Category = Types.Category;
    type Subcategory = Types.Subcategory;
    type Database = Types.Database;
    type Post = Types.Post;
    type PostId = Types.PostId;

    /**
        cfeateDatabase initialises the database with the category and subcategory
    */
    public func createDatabase(allCategories : [Database]) : Trie.Trie<Category, Trie.Trie<Subcategory, List.List<PostId>>> {
        var database : Trie.Trie<Category, Trie.Trie<Subcategory, List.List<PostId>>> = Trie.empty();
        for (category in allCategories.vals()) {
            var allSubCategories : Trie.Trie<Subcategory, List.List<PostId>> = Trie.empty();
            for (subcategory in category.subcategory.vals()) {
                allSubCategories := Trie.put(allSubCategories, key(subcategory), Text.equal, List.nil()).0;
            };
            database := Trie.put(database, key(category.name), Text.equal, allSubCategories).0;
        };
        return database;
    };
    func key(t : Category) : Trie.Key<Category> {
        { key = t; hash = Text.hash(t) };
    };
};
