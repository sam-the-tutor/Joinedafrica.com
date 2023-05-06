module {
    public type UserId = Principal;
    //users are able to send themselves messages and messages to other people.
    public type Notification = {
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
};
