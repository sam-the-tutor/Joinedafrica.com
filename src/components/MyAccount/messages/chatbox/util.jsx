import { conversation } from "../../../../authentication/conversation";

export async function loadNewMessages(userProfile) {
  return getMyMessages(userProfile);
  //check if i'm currently chatting with a friend
  //   if (myFriendPrincipal.length > 0) {
  //     const result = newMessageNotification.filter(
  //       (newMessage) => !contains(newMessage.date + "" + newMessage.time)
  //     );
  //     console.log(result);
  //     if (result.length > 0) {
  //       const newMessages = [...myMessages, ...result];
  //       setMyMessages([...sort(newMessages)]);
  //       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
}

function contains(searchTime) {
  for (var i = 0; i < myMessages.length; i++) {
    const pastTime = myMessages[i].date + "" + myMessages[i].time;
    if (pastTime === searchTime) return true;
  }
  return false;
}

async function getMyMessages(friendProfilePicture) {
  const friendsPrincipal = friendProfilePicture.substring(0, 63);
  const authenticatedUser = await conversation();
  const messages = await authenticatedUser.getMyMessages(friendsPrincipal);
  return [...sort(messages.ok).reverse()];
}

//sorting the messages by date and time
function sort(newMessages) {
  return newMessages.sort((child, parent) => {
    if (child.date === parent.date) {
      return parent.time < child.time;
    } else {
      //
      return parent.date < child.date;
    }
  });
}

async function sendMessage() {
  if (myFriendPrincipal.length == 0) {
    alert("You have to click on a friend to send message to them");
    return;
  }
  const chatMessage = {
    messageContent: conversation,
    sender: Principal.fromText(myPrincipal),
    mainReceiver: Principal.fromText(myFriendPrincipal),
    time: new Date().toLocaleTimeString(),
    date: new Date().toLocaleDateString(),
    secondReceiver: "",
  };

  const myMessage = { ...chatMessage };
  myMessage.mainReceiver = Principal.fromText(myPrincipal);
  myMessage.secondReceiver = myFriendPrincipal;
  //send the message to the creators posts notification
  const authenticatedWorker = await getAuthenticatedMessageNotificationWorker();
  //send the message to my message notifications canister so it can be pulled
  //using webworker and displayed in the chatbox
  await authenticatedWorker.sendNotification(myMessage);
  //send the notification to my friend
  await authenticatedWorker.sendNotification(chatMessage);
  const authenticatedUser = await getAuthenticatedConversationUser();
  //save message in conversations canister
  await authenticatedUser.sendMessage(chatMessage);
}
