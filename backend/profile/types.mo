module {
     public type Result<T, E> = {
        #Ok  : T;
        #Err : E;
    };

      public type Friend = Text;

    public type Profile = {
        firstName : Text;
        lastName : Text;
        //path to the image in post asset canister.
        //Profile picture path starts like this "<user-principal-id>/profile/<unique Id>"
        profilePicture : Text;
        email : Text;
        location : Text;
    };
    // all possible errors that can occur from the backend
    public type Error = {
        #UserAlreadyExists;
        #UserNotFound;
        #UnAuthorizedUser;
    };

    public type UserId = Principal;
    public let CANISTER_ID : Text = "by6od-j4aaa-aaaaa-qaadq-cai";

    public type Interface = actor {
        createUserProfile: (Profile) -> async Result<Profile,Error>;
        getUserProfile: () -> async Result<Profile,Error>;
        getUserProfilePicture: (UserId) -> async Result<Profile,Error>;
        isUserAuthorized: (UserId) -> async Bool;
        resetAll: () -> ();
        updateUserProfile: (Profile) -> async Result<Profile,Error>;

    };
};
