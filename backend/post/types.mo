import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {
    public type Post = {
        //general descriptions of every posts start from here
        creationDateOfPost : Text;
        postId : Text;
        isPublished : Bool;
        creatorOfPostId : UserId;
        // path to the image in posts asset canister
        //images associated with a posts starts like this "<user-principal-id>/post/<post-id>"
        images : [Text];
        category : Text;
        subcategory : Text;
        productTitle : Text;
        amount : Text;
        location : Text;
        productDescription : Text;
        condition : Text;
        //very specific description of a post
        productSpecification : {
            #Vehicles : {
                #Cars : {
                    Model : Text;
                    Brand : Text;
                    Condition : Text;
                    Year_of_manufacture : Text;
                    Transmission : Text;
                    Is_Registered : Text;
                    Colour : Text;
                };
                #Buses : {
                    Model : Text;
                    Brand : Text;
                    Condition : Text;
                    Year_of_manufacture : Text;
                    Transmission : Text;
                    Is_Registered : Text;
                    Colour : Text;
                };
                #Trucks_and_trailers : {
                    Model : Text;
                    Type : Text;
                    Brand : Text;
                    Condition : Text;
                    Year_of_manufacture : Text;
                    Transmission : Text;
                    Is_Registered : Text;
                    Colour : Text;
                };
                #Vehicle_parts_and_assessories : {
                    Type : Text;
                    Brand : Text;
                    Condition : Text;
                };
                #Motocycles_and_bicycles : {
                    Model : Text;
                    Type : Text;
                    Brand : Text;
                    Condition : Text;
                    Year_of_manufacture : Text;
                    Transmission : Text;
                    Colour : Text;
                };
            };
            #Electronics : {
                #Computers_and_laptops : {
                    Model : Text;
                    Type : Text;
                    Brand : Text;
                    Condition : Text;
                    Operating_System : Text;
                    Processor : Text;
                    Storage_Capacity : Text;
                    Storage_Type : Text;
                    RAM : Text;
                };
                #Audio_and_music_equipments : {
                    Type : Text;
                    Condition : Text;
                };
                #Computer_accessories : {
                    Type : Text;
                    Condition : Text;
                };
                #Tv_and_dvd_equipment : {
                    Type : Text;
                    Condition : Text;
                    Brand : Text;
                };
            };
            #Health_and_beauty : {
                #Skincare : {
                    Type : Text;
                    Condition : Text;
                    Gender : Text;
                };
                #Hair_products : {
                    Type : Text;
                    Condition : Text;
                    Gender : Text;
                };
                #Fragrances : {
                    Formation : Text;
                    Condition : Text;
                    Gender : Text;
                };
                #Vitamins_and_supplements : {
                    Type : Text;
                    Formulation : Text;
                    Condition : Text;
                };

            };
            #Mobile_phones_and_tablets : {
                #Phones_and_tablets : {
                    Type : Text;
                    Storage_Capacity : Text;
                    Condition : Text;
                    RAM : Text;
                    Display_Type : Text;
                    Colour : Text;
                    Brand : Text;
                    Model : Text;
                };
                #Accessories_for_mobile_phones_and_tablets : {
                    Type : Text;
                    Condition : Text;
                };
            };
            #Properties : {
                #Houses_and_apartments_for_rent : {
                    Is_Furnished : Text;
                    Condition : Text;
                    Bathrooms : Text;
                    Bedrooms : Text;
                    Type : Text;
                    Has_Parking_Space : Text;

                };
                #Houses_and_apartments_for_sale : {
                    Is_Furnished : Text;
                    Condition : Text;
                    Bathrooms : Text;
                    Bedrooms : Text;
                    Type : Text;
                    Has_Parking_Space : Text;
                };
                #Land_and_plots_for_sale : {
                    Type : Text;
                    Number_of_Plots : Text;
                };
            };
            #Fashion : {
                #Bags : {
                    Gender : Text;
                    Condition : Text;
                    Colour : Text;
                    Type : Text;
                };
                #Clothing_and_clothing_accessories : {
                    Gender : Text;
                    Condition : Text;
                    Colour : Text;
                    Type : Text;
                };
                #Watches : {
                    Gender : Text;
                    Condition : Text;
                    Colour : Text;
                    Brand : Text;
                    Style : Text;
                    Display : Text;
                };
                #Shoes : {
                    Gender : Text;
                    Condition : Text;
                    Colour : Text;
                    Brand : Text;
                    Style : Text;
                    Type : Text;
                };

            };
        };
    };

    // all possible errors that can occur from the backend
    public type Error = {
        #PostNotFound;
        #CategoryNotFound;
        #SubcategoryNotFound;
        #UserAlreadyExists;
        #UserNotFound;
        #UnAuthorizedUser;
    };

    public type Top10Posts = {
        name : Text;
        post : [Post];
    };

    //the strucutre of how the posts are organised in the database
    public type Database = {
        name : Category;
        subcategory : [Subcategory];
    };

    public type UserId = Principal;
    public type PostId = Text;
    public type Category = Text;
    public type Subcategory = Text;

};
