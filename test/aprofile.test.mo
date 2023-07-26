import {test; suite} "mo:test/async";
import Main "../backend/profile/main";
import Types "../backend/profile/types";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";


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


// jgsbe-zb4o4-vf5yc-6nyc6-j2kmz-yc5w2-moxqq-b46qt-7vnl6-txp4k-hae
let profile = await Main.ProfileCanister();

await suite("Preparing the database", func(): async() {
	await test("Reset the database", func(): async () {
		let response = await profile.resetAll();
		assert (response == ());
	});
});

await suite("Working with creating profiles", func(): async() {
	await test("should create a user profile", func(): async () {
		let response = await profile.createUserProfile(myProfile);
		assert (response == #ok(myProfile));
	});

	await test("should fail to create a user profile", func():async () {
		let response = await profile.createUserProfile(myProfile);
		assert(response == #err(#UserAlreadyExists));
	});
});

await suite("Update Profile Details", func(): async() {
	await test("should update user profile from the database", func(): async () {
		let response = await profile.updateUserProfile(newProfile);
		assert (response == #ok(newProfile));
	});

	await test("should fetch the new user profile from the database", func():async () {
		let response = await profile.getUserProfile();
		assert(response == #ok(newProfile));
	});

	await test("should assess the user who called the functions", func():async () {
		let response = await profile.whoami();
		Debug.print(response);
		assert(response == ("wo5qg-ysjiq-5da"));
	});

	// await test("is user authorized and own a profile", func():async () {
	// 	let response = await profile.isUserAuthorized(Principal.fromText("wo5qg-ysjiq-5da"));
	// 	//Debug.print(response);
	// 	assert(response == true);
	// });
});

//isUserAuthorized