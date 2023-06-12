import Type "types";
import Array "mo:base/Array";
import Buffer "mo:base/Buffer";

module {
    type Database = Type.Database;
    type Category = Type.Category;
    type Subcategory = Type.Subcategory;

    public let Database : [Database] = [
        {
            name = "Vehicles";
            subcategory = [
                "Cars",
                "Buses",
                "Trucks and trailers",
                "Vehicle parts and assessories",
                "Motocycles and bicycles",
            ];
        },
        {
            name = "Electronics";
            subcategory = [
                "Computers and laptops",
                "Electronic supplies",
                "Audio and music equipments",
                "Computer accessories",
                "Tv and dvd equipment",
            ];
        },
        {
            name = "Health and beauty";
            subcategory = [
                "Skincare",
                "Hair products",
                "Fragrances",
                "Vitamins and supplements",
            ];
        },
        {
            name = "Mobile phones and tablets";
            subcategory = [
                "Phones and tablets",
                "Accessories for mobile phones and tablets",
            ];
        },
        {
            name = "Properties";
            subcategory = [
                "Houses and apartments for rent",
                "Houses and apartments for sale",
                "Land and plots for sale",
            ];
        },
        {
            name = "Fashion";
            subcategory = [
                "Bags",
                "Clothing and clothing accessories",
                "Watches",
                "Shoes",
            ];
        },
    ];

    public func getSubcategory(category : Category) : [Subcategory] {
        for (databaseCategory in Database.vals()) {
            if (databaseCategory.name == category) return databaseCategory.subcategory;
        };
        //category can't be found
        return [];
    };
    public func getAllCategories() : [Category] {
        let allCategories = Buffer.Buffer<Category>(0);
        for (category in Database.vals()) {
            allCategories.add(category.name);
        };
        return Buffer.toArray(allCategories);
    };
};
