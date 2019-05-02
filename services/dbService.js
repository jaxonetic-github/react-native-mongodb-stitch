
import {getRunningFunctionName,PROFILES_COLLECTION, EVENT_COLLECTION,
  REMOTE_RESOURCE_STRING,DBNAME,ATLAS_FACTORY,
  FUNCTION_INSERTPROFILE,FUNCTION_INSERTEVENT, FUNCTION_QUERYPROFILE, FUNCTION_QUERYEVENTS, FUNCTION_UPDATEPROFILE,FUNCTION_UPDATEEVENT,
   FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID, FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID, FUNCTION_RETRIEVE_GOOGLE_APIKEY,
  GOOGLESIGNIN_OPTION_SCOPE, GOOGLESIGNIN_OPTION_RESPONSE_TYPE} from  '../constants.js'
import { Stitch, RemoteMongoClient, AnonymousCredential, GoogleCredential,CustomCredential,UserPasswordCredential } from  'mongodb-stitch-react-native-sdk';
import { GoogleSignin } from 'react-native-google-signin';
import Geocoder from 'react-native-geocoding';

/**
 *
 * A Class to handle interaction with remote Stitch Mongo backend
 *
 * All errors should return an error object of the form {errorStack: 'someerror'}
 *
 * 
 */
export  default class DBService {

/**
 * Get the MongoDB Stitch client needed for access to the MongoDB backend.
 */
   static  getDBClient= async(remoteResourceString)=> {
   let dbClient =null;
    try{ 
        dbClient =  Stitch.hasAppClient(REMOTE_RESOURCE_STRING) ? 
        Stitch.defaultAppClient :
        Stitch.initializeDefaultAppClient(REMOTE_RESOURCE_STRING);

    }catch(error){ //currently handled by caller
      console.log('********** getDBClient ERROR************',error)
    }
     return  dbClient;
  }

/**
 * Privately retrieve the google keys required for google sign in and Geocoding API
 * Ths method may become deprecated in the future when I move the GoogleSign to a central server
 */
async configureGoogleKeys(){
   const client =await DBService.getDBClient();
   const googleWebClientKey = await client.callFunction(FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID);
   const googleIosClientKey = await client.callFunction(FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID);
   const retrieveGoogleApiKey = await client.callFunction(FUNCTION_RETRIEVE_GOOGLE_APIKEY);
   
   // configure react-native-google-signin
   GoogleSignin.configure({scope:GOOGLESIGNIN_OPTION_SCOPE, response_type:GOOGLESIGNIN_OPTION_RESPONSE_TYPE, iosClientId:googleIosClientKey.secret, webClientId:googleWebClientKey.secret});
   
   // initialize Geocoder with
   Geocoder.init(retrieveGoogleApiKey.secret);
}

/**
 * @param successFunction
 */
 async  authorizeAnonymously() {

  try{
  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING); 
  let authorizedUser;
    // Check if this user has already authenticated and we're here
  
if (client.auth.isLoggedIn){
return client.auth.authInfo;

}
if (!client.auth.isLoggedIn) {
 return client.auth.loginWithCredential(new AnonymousCredential());
  
} 

  //yield put(loginSucceeded(authorizedUser.auth.authInfo));
return  authorizedUser;
}catch(error){
  return{errorStack:'authorizeAnonymously() => '+error};
  }
}

/**
 * Log in to Stitch backend
 */
 async  authorize() {

  try{
  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING); // await getDBClient(REMOTE_RESOURCE_STRING);
  let authorizedUser;
    // Check if this user has already authenticated and we're here
  
if (client.auth.isLoggedIn){
return client.auth.authInfo;

}
//as a last case, attempt to login anonymously
if (!client.auth.isLoggedIn) {
 return client.auth.loginWithCredential(new AnonymousCredential());//.then(successFunction);
  
} 
  //yield put(loginSucceeded(authorizedUser.auth.authInfo));
return  authorizedUser;
}catch(error){
  return{errorStack:error};
  }
}


/**
* googleSignIn - create a GoogleCredential from the authCode and attempt to login to Stitch with it.
* @param authCode (required) - the one-time/first-time serverAuthCode specified by google
*/
 async  googleSignIn(authCode) {

  //parameter check
  if(!authCode) return null;
  try{
   const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);
   //expect Promise<void>
   let googleCredential = new GoogleCredential(authCode);

  const authorizedUser = await client.auth.loginWithCredential(googleCredential);
 
return authorizedUser;
}catch(error){
  return{errorStack:error};
  }
}


/* **
 * ** currently not used but may be in the future
 * **/
 async  customSignIn(user) {

  // parameter check
  if(!user || !user.idToken) return null;
  try{

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);
  //expect Promise<void>
  let customCredential = new CustomCredential(user.idToken);
  const authorizedUser = await client.auth.user.linkWithCredential(customCredential);
 
return authorizedUser;
}catch(error){

 // const user = await auth.loginWithCredential(new UserPasswordCredential('Jadksnjkdoo', '1234abcd'))
  //console.log('*******************',error);
  return{errorStack:error};
  }
}


/**
 * Log out using the client's client.auth.logout()
 */
 async  logout() {
  try{
  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

// Now remove user1
//await client.auth.removeUser();

  const unAuthorizedUser = await client.auth.logout();
 
return unAuthorizedUser;
}catch(error){
  return{errorStack:error};
  }
}

//************************ DELETE 

/** 
 *  Delete an Event from the DB
 *  @param eventIdObject :an object {id:xyzID}
 *  @returns {deletedCount:1} on success or {deleteCount:0} or the error stack on exceptions
 */
   async deleteManyEvents() {

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

   try {
    
    const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY);

    const eventsCollection = mongodb.db(DBNAME).collection(EVENT_COLLECTION);
    const results = await eventsCollection.deleteMany({ _id: { $exists: true}});
   return results; 
  }
  catch(error) {
    return({errorStack:error});
  }
   
  }

/** 
 *  Delete a profile from the DB
 *   @returns {deletedCount:} on success or {deletedCount:0} or the error stack on exceptions
 */
   async deleteManyProfiles() {

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

   try {
const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY);
const profilesCollection = await mongodb.db(DBNAME).collection(PROFILES_COLLECTION).deleteMany({ _id: { $exists: true}});

   console.log(results);
      return profilesCollection; 

  }
  catch(error) {
    return({errorStack:error});
  }
  }


/** 
 *  Delete an Event from the DB
 *  @param eventIdObject :an object {id:xyzID}
 *  @returns {deletedCount:1} on success or {deleteCount:0} or the error stack on exceptions
 */
   async deleteEvent(eventIdObject) {

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

   try { 
    const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY);
    const eventsCollection = mongodb.db(DBNAME).collection(EVENT_COLLECTION);
    const results = await eventsCollection.deleteOne(eventIdObject)
   return results; 
  }
  catch(error) {
    return({errorStack:error, arg:eventIdObject});
  }
   
  }

/** 
 *  Delete a profile from the DB
 *  @param profileIdObject : an object {id:xyzID}
 *   @returns {deletedCount:1} on success or {deletedCount:0} or the error stack on exceptions
 */
   async deleteProfile(profileIdObject) {

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

   try {
      const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY);
      const profilesCollection = await mongodb.db(DBNAME).collection(PROFILES_COLLECTION);
      const results = await profilesCollection.deleteOne(profileIdObject)
    return results; 

  }
  catch(error) {
    return({errorStack:error, arg:profileIdObject});
  }
  }


//*************************UPDATES
/** Deprecating
 *  Insert an event into the DB
 *  @param eventAction : an object with a payload key whose value is the profile to insert 
 *  @returns {modifiedCount:1, matchedCount:1} on success or {modifiedCount:0} or the error stack on exceptions
 */
async updateSingleEvent(eventAction) {

const query = { id: eventAction.payload.id };
const update ={
  $set: {
    name: eventAction.payload.name,
    email: eventAction.payload.email,
    phone: eventAction.payload.phone,
    location: eventAction.payload.location,
    calendar: eventAction.payload.calendar,
    description: eventAction.payload.description,
    website : eventAction.payload.website
  }
}

const options = { upsert: false };

    try {
      const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);
      const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY);
      const eventsCollection = mongodb.db(DBNAME).collection(EVENT_COLLECTION);
      const presults = await eventsCollection.updateOne(query, update, options);
    return presults;

  }catch(error) {
    return({errorStack:error, arg:eventAction});
  }

  }


/** DEPRECATED
 *. 
 *  Insert a profile into the DB
 *  @param profile : an object with a payload key whose value is the profile to insert 
 *  @returns {count:{insertedCount:1}} on success or {insertedCount:0} or the error stack on exceptions
 */
async updateSingleProfile(profileAction) {

const query = { id: profileAction.payload.id };
const update ={
  $set: {
    name: profileAction.payload.name,
    email: profileAction.payload.email,
    phone: profileAction.payload.phone,
    description: profileAction.payload.description,
    website : profileAction.payload.website
  }
}

const options = { upsert: false };

   try {
const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);
const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY);
const profilesCollection = mongodb.db(DBNAME).collection(PROFILES_COLLECTION);
const results = await profilesCollection.updateOne(query, update, options);

return results;

  }catch(error) {
    return({errorStack:error, arg:profileAction});
  }

  }



//************************ INSERTS

/** 
 *  Insert a profile into the DB
 *  @param profile : a profile object
 *  @returns {count:{insertedCount:1}} on success or {insertedCount:0} 
              or the error stack on exceptions. {errorStack}
 *
 */
   async insertSingleProfile(profile) {

   try {
    const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);
    const profileCollection = await client.callFunction(FUNCTION_QUERYPROFILE,[profile]);  
    return profileCollection;
  }
  catch(error) {
    return({errorStack:error, arg:profile});
  }

  }

/** 
 *  Insert an event into the DB
 *  @param event : an event object
 *  @return profile : an object with a payload key whose value is the profile to insert 
 */
   async insertSingleEvent(event) {

      const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

   try {   
    const eventsCollection = await client.callFunction(FUNCTION_INSERTEVENT,[event]);//mongodb.db(DBNAME).collection(EVENT_COLLECTION).insertOne(event);
    return eventsCollection;
  }
  catch(error) {
    return({errorStack:error, arg:event});
  }

  }



//************************ READS
/** 
  * Fetch all registeredUsers 
  */
   async getUserList() {

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

try{  
      const users = await client.auth.listUsers().find({}).toArray();
      return users;
 }catch(error) {
    return ({errorStack:error});
  }
  
  }


/** 
  * Fetch all events 
  */
   async fetchEvents() {

  const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);

  try {  
    const eventsCollection = await client.callFunction(FUNCTION_QUERYEVENTS);
    return eventsCollection;
  }catch(error) {
      return ({errorStack:error});
  }
  
  }

/** 
  * Fetch all events 
  */
async fetchProfiles() {

const client =  await DBService.getDBClient(REMOTE_RESOURCE_STRING);
try{
      const mongodb = client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY );
      const profilesCollection = await client.callFunction(FUNCTION_QUERYPROFILE);     
       return profilesCollection;
 }catch(error) {
    return ({errorStack:error});
  }
  
  }

}
