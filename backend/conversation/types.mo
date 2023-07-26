import Principal "mo:base/Principal";

module {
    public type UserId = Principal;

    public let CANISTER_ID : Text = "c2lt4-zmaaa-aaaaa-qaaiq-cai";

    //Friend combines two users principals together. <principal1>and<principal2>. It's either principal1 messaged principal2
    // or vice versa. Principal1 > principal2.
    public type Friend = Text;
    public type Message = {
        time : Text;
        date : Text;
        messageContent : Text;
        sender : UserId;
        receiver : UserId;
    };

    public type Result<T, E> = {
        #Ok  : T;
        #Err : E;
    };


    public type Error = {
        #UnAuthorizedUser;
        #NoConversationFound;
    };

    public type Interface = actor{
         getAllFriends: () -> async ([Text]) ;
        getAllMyFriends: () -> async (Result<[Text],Error>) ;
        getMyMessages: (Text) -> async (Result<[Message], Error>);
        resetAll: () -> ();
        sendMessage: (Message) -> async  (Result<(),Error>);
    };



};
