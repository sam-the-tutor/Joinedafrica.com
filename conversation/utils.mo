import types "types";
import Principal "mo:base/Principal";
module {
    type UserId = types.UserId;

    public func sortPrincipals(caller : UserId, receiver : UserId) : Text {
        let callerPrincipal = Principal.toText(caller);
        let receiverPrincipal = Principal.toText(receiver);
        var friend = "";
        if (caller > receiver) {
            friend := receiverPrincipal # "and" #callerPrincipal;
        } else {
            friend := callerPrincipal # "and" # receiverPrincipal;
        };
        return friend;
    };
};
