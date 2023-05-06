import Principal "mo:base/Principal";

module {
    public type UserId = Principal;
    //Friend combines two users principals together. <principal1>and<principal2>. It's either principal1 messaged principal2
    // or vice versa. Principal1 > principal2.
    public type Friend = Text;
    //users are able to send themselves messages and messages to other people.
    public type Message = {
        time : Text;
        date : Text;
        messageContent : Text;
        sender : UserId;
        //who should receive this message. Note, I can also send message to myself
        mainReceiver : UserId;
        //After sending messages to myself, I should be able to see the messages they are sending with who they
        //are chatting with
        secondReceiver : Text;
    };

    public type Error = {
        #UnAuthorizedUser;
        #NoConversationFound;
    };
};
