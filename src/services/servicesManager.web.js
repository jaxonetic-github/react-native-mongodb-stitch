
import {getRunningFunctionName,PROFILES_COLLECTION, EVENT_COLLECTION,
        DBNAME,ATLAS_FACTORY,
        FUNCTION_INSERTPROFILE,FUNCTION_INSERTEVENT, FUNCTION_QUERYPROFILE, FUNCTION_QUERYEVENTS, FUNCTION_UPDATEPROFILE,FUNCTION_UPDATEEVENT,
        FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID, FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID, FUNCTION_RETRIEVE_GOOGLE_APIKEY,
        GOOGLESIGNIN_OPTION_SCOPE, GOOGLESIGNIN_OPTION_RESPONSE_TYPE,REMOTE_RESOURCE_STRING} from  '../constants.js'
import  { Stitch, RemoteMongoClient, AnonymousCredential, GoogleCredential,CustomCredential,UserPasswordCredential,UserPasswordAuthProviderClient } from  'mongodb-stitch-browser-sdk';
//import  { GoogleSignin } from 'react-native-google-signin';
import  Geocoder from 'react-native-geocoding';
/*import  {deleteManyEvents, deleteManyProfiles, deleteEvent, deleteProfile, 
        updateSingleEvent, updateSingleProfile, insertSingleProfile,
        insertSingleEvent, fetchEvents, fetchProfilesDB, getUserList} from './StitchCRUD_api.js'*/
import  CrudService from "./stitchCRUD_api.js"
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

//  the Firebase products 
import "firebase/auth";
import "firebase/firestore";
import "firebase/database";


/**
 *
 * A Class to handle interaction with remote Stitch Mongo backend
 *
 * 
 */
 export default class ServicesManager {
 
  static dbClient = async ()=> { 
    const client =   Stitch.hasAppClient(REMOTE_RESOURCE_STRING) ? 
    Stitch.defaultAppClient :
        Stitch.initializeDefaultAppClient(REMOTE_RESOURCE_STRING);

  return client;
  }

/**
 * Initialize sub "services" like CRUD services
 *
 */
  async initialize(){
    
    let client = await ServicesManager.dbClient(REMOTE_RESOURCE_STRING);
    this.db = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY).db(DBNAME);
    this.stitchCrudServices = new CrudService(this.db, ServicesManager.dbClient);
  
  
  var firebaseConfig = {
    apiKey: "AIzaSyAE6KIft5wm1pcUMkgRV4Dsyu0L5fY1O4c",//"AIzaSyCSXLM0pMb0GCPvNtVdd1GeSa0UCl6zAEM",
    authDomain: "gathering-f3e30.firebaseapp.com",
    databaseURL: "https://gathering-f3e30.firebaseio.com",
    projectId: "gathering",
    storageBucket: "gathering.appspot.com",
    messagingSenderId: "296133059037",
    appId: "1:296133059037:web:613f88574f982937"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  console.log("Innialized", firebase);
  }

/**
 * Initialize sub "services" like CRUD services
 * @param credentialInfo = {email:this.state.email, passwd:this.state.password}
 *
 */
  async emailAuth(credentialInfo){
    
    let client = await ServicesManager.dbClient(REMOTE_RESOURCE_STRING);
    const emailPassClient = client.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
const confResults = await emailPassClient.registerWithEmail(credentialInfo.email, credentialInfo.passwd)
   //= await emailPassClient.confirmUser(credentialInfo.email, credentialInfo.passwd);
/*emailPassClient.registerWithEmail(credentialInfo.email, credentialInfo.passwd)
  .then(() => {
     console.log("Successfully sent account confirmation email!");
  })
  .catch(err => {
     console.log("Error registering new user:", err);
  });
*/
   console.log(confResults);
  }

/**
 * Privately retrieve the google keys required for google sign in and Geocoding API
 * Ths method may become deprecated in the future when I move the GoogleSign to a central server
 */
async configureGoogleKeys(){
  const client = await ServicesManager.dbClient();
   const googleWebClientKey = await client.callFunction(FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID);
   const googleIosClientKey = await client.callFunction(FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID);
   const retrieveGoogleApiKey = await client.callFunction(FUNCTION_RETRIEVE_GOOGLE_APIKEY);
   
   // configure react-native-google-signin
   //GoogleSignin.configure({scope:GOOGLESIGNIN_OPTION_SCOPE, response_type:GOOGLESIGNIN_OPTION_RESPONSE_TYPE, iosClientId:googleIosClientKey.secret, webClientId:googleWebClientKey.secret});
   
   // initialize Geocoder with
   Geocoder.init(retrieveGoogleApiKey.secret);
}

/**
 * Log in to Stitch backend anonymously
 */
 async  authorizeAnonymously() {

  try{
  let authorizedUser;
    // Check if this user has already authenticated and we're here
  const client = await ServicesManager.dbClient();

  if (client.auth.isLoggedIn){
    authorizedUser = client.auth.authInfo;
  }
  else{
    authorizedUser = await  client.auth.loginWithCredential(new AnonymousCredential()) ;
  }
  
  return  authorizedUser;
 }catch(error){
  return{errorStack:'authorizeAnonymously() => '+error};
 }
}

/**
* googleSignIn - create a GoogleCredential from the authCode and attempt to login to Stitch with it.
* @param authCode (required) - the one-time/first-time serverAuthCode specified by google
*/
 async  googleSignIn(googleObject) {
console.log("googleSignin with authcode=", googleObject);
  //parameter check
  if(!googleObject) return null;
  try{
   let googleCredential = new GoogleCredential(googleObject);
   const client = await ServicesManager.dbClient();

  const authorizedUser = await client.auth.loginWithCredential(googleCredential);
 
return authorizedUser;
}catch(error){
  return{errorStack:error};
  }
}

   isUserEqual(googleUser, firebaseUser) {
  if (firebaseUser) {
    var providerData = firebaseUser.providerData;
    for (var i = 0; i < providerData.length; i++) {
      if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()) {
        // We don't need to reauth the Firebase connection.
        return true;
      }
    }
  }
  return false;
}

 googleFirebaseSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  console.log('onsignin', googleUser);
  console.log('Google Auth Response', googleUser);
  // We need to register an Observer on Firebase Auth to make sure auth is initialized.
  var fbUser = null;
  var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
  fbUser=firebaseUser;

    unsubscribe();
    // Check if we are already signed-in Firebase with the correct user.
    console.log(googleUser,"----", firebaseUser);
    if (!this.isUserEqual(googleUser, firebaseUser)) {
      // Build Firebase credential with the Google ID token.
      var credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.getAuthResponse().id_token);
      // Sign in with credential from the Google user.
      firebase.auth().signInWithCredential(credential).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    } else {
        console.log('User already signed-in Firebase.');
        // Get a reference to the database service
      var database = firebase.database();
  
  var profiles =  firebase.database().ref('/profiles/'+ googleUser.getBasicProfile().getId());
  console.log("profiles:",profiles);
  
 // function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref('/profiles').push({
    username: "name10",
    email: "email10",
    inner_id: googleUser.getBasicProfile().getId(),
    profile_picture : profile.getImageUrl()
  });
//}
 
    }
  });
  console.log("googlesignin firebaseuser=", fbUser);
  return fbUser;
}

/**
 * Log out using the client's client.auth.logout()
 */
 async  logout() {
  try{
// Now remove user1
//await client.auth.removeUser();

  const unAuthorizedUser = await this.client.auth.logout();
 
return unAuthorizedUser;
}catch(error){
  return{errorStack:error};
  }
}


}
