module {
    public type UserId = Principal;
    public type Notification = {
        sender : Principal;
        receiver : Principal;
    };
};
