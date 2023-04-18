import Principal "mo:base/Principal";

module {
    public type UserId = Principal;
    //Friend combines two users principals together. <principal1>and<principal2>. It's either principal1 messaged principal2
    // or vice versa. Principal1 > principal2.
    public type Friend = Text;
    public type Message = {
        time : Text;
        messageContent : Text;
        sender : UserId;
        receiver : UserId;
    };

    public type Error = {
        #UnAuthorizedUser;
    };
};
