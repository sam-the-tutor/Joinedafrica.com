module {
    public type Profile = {
        firstName : Text;
        lastName : Text;
        //path to the image in post asset canister.
        //Profile picture path starts like this "<user-principal-id>/profile/<file name>"
        profilePicture : Text;
        email : Text;
    };
    // all possible errors that can occur from the backend
    public type Error = {
        #UserAlreadyExists;
        #UserNotFound;
        #UnAuthorizedUser;
    };

    public type UserId = Principal;
};