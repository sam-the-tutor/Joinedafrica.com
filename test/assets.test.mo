import {test; suite} "mo:test/async";
import Main "../backend/assets/main";
import Types "../backend/assets/types";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Profile "../backend/profile/main";

let asset = await Main.Assets();
let ProfileCanister = await Profile.ProfileCanister();

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







 await suite("Preparing the Assets database", func():async() {
	
	 await test("Reset the database", func():async(){
		let response =  await asset.resetAll();
		assert (response == ());
	});

	await test("Initialize the database", func():async(){
		let response =  await asset.intialize();
		assert (response == ());
	});
});



await suite("Working with assets", func(): async() {

	await test("should return the user who called the functions in the assets canister", func():async () {
		let response = await ProfileCanister.whoami();
		assert(response == ("wo5qg-ysjiq-5da"));
	});

	await test("should create a profile", func(): async () {
		 let response = await ProfileCanister.createUserProfile(myProfile);
		assert (response == #ok(myProfile));
	});

	await test("is user authorized and own a profile", func():async () {
		let response = await ProfileCanister.isUserAuthorized(Principal.fromText("wo5qg-ysjiq-5da"));
		assert(response == true);
	});


	await test("should  upload the assets to the database", func(): async () {
		 let response = await asset.uploadAsset([], "testID");
		 
         assert(response == #ok());
	});


	
});
