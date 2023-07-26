import {test;suite } "mo:test/async";
import Main "../backend/conversation/main";
import Types "../backend/conversation/types";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Profile "../backend/profile/main"

 let conversation = await Main.Conversation();
 let ProfileCanister = await Profile.ProfileCanister();

let message ={
    time = "12345";
    date = "12345";
    messageContent = "I am working";
    sender =Principal.fromText("wo5qg-ysjiq-5da");
    receiver = Principal.fromText("jgsbe-zb4o4-vf5yc-6nyc6-j2kmz-yc5w2-moxqq-b46qt-7vnl6-txp4k-hae");

};

let myProfile ={
    firstName ="Samuel";
    lastName ="Atwebembeire";
    profilePicture ="none";
    email ="smartskillsweb3@gmail.com";
    location ="Uganda";

};

let newProfile ={
    firstName ="Samuel";
    lastName ="Atwebembeire";
    profilePicture ="none";
    email ="smartskillsweb3@gmail.com";
    location ="Kenya";

};

await suite("Reset the conversations database", func(): async() {
	await test("should reset the friend and message databases", func(): async () {
		 let response = await conversation.resetAll();
         assert(response == ());
	});

    await test("should Intializea new actor", func(): async () {
		 let response = await conversation.intialize();
         assert(response == ());
	});


});

await suite("Working with the database", func(): async() {
      await test("should create a profile in conversation", func(): async () {
		 let response = await ProfileCanister.createUserProfile(myProfile);
		assert (response == #ok(myProfile));
	});

    await test("is user authorized and own a profile in a conversation", func():async () {
		let response = await ProfileCanister.isUserAuthorized(Principal.fromText("wo5qg-ysjiq-5da"));
		//Debug.print(response);
		assert(response == true);
	});

	await test("should return an empty array of friends", func(): async () {
		 let response = await conversation.getAllMyFriends();
          assert(response == #ok([]));
	});

    await test("should send a message to a friend(jgsbe-zb4o4-vf5yc-6nyc6-j2kmz-yc5w2-moxqq-b46qt-7vnl6-txp4k-hae)", func(): async () {
		 let response = await conversation.sendMessage(message);
          assert(response == #ok());
	});

    await test("should get the message sent to the friend", func(): async () {
		 let response = await conversation.getMyMessages("jgsbe-zb4o4-vf5yc-6nyc6-j2kmz-yc5w2-moxqq-b46qt-7vnl6-txp4k-hae");
         assert(response == #ok([message]));
	});


});
