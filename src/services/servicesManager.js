
import {getRunningFunctionName,PROFILES_COLLECTION, EVENT_COLLECTION,
        DBNAME,ATLAS_FACTORY,
        FUNCTION_INSERTPROFILE,FUNCTION_INSERTEVENT, FUNCTION_QUERYPROFILE, FUNCTION_QUERYEVENTS, FUNCTION_UPDATEPROFILE,FUNCTION_UPDATEEVENT,
        FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID, FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID, FUNCTION_RETRIEVE_GOOGLE_APIKEY,
        GOOGLESIGNIN_OPTION_SCOPE, GOOGLESIGNIN_OPTION_RESPONSE_TYPE,REMOTE_RESOURCE_STRING} from  '../constants.js'
import  { Stitch, RemoteMongoClient, AnonymousCredential, GoogleCredential,CustomCredential,UserPasswordCredential } from  'mongodb-stitch-react-native-sdk';
import  { GoogleSignin } from 'react-native-google-signin';
import  Geocoder from 'react-native-geocoding';
/*import  {deleteManyEvents, deleteManyProfiles, deleteEvent, deleteProfile, 
        updateSingleEvent, updateSingleProfile, insertSingleProfile,
        insertSingleEvent, fetchEvents, fetchProfilesDB, getUserList} from './StitchCRUD_api.js'*/
import  CrudService from "./stitchCRUD_api.js"

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
    this.db = await client.getServiceClient(RemoteMongoClient.factory, ATLAS_FACTORY).db(DBNAME);
    this.stitchCrudServices = new CrudService(this.db, ServicesManager.dbClient);
   this.crud = this.stitchCrudServices;
   
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
   GoogleSignin.configure({scope:GOOGLESIGNIN_OPTION_SCOPE, response_type:GOOGLESIGNIN_OPTION_RESPONSE_TYPE,
    iosClientId:googleIosClientKey.secret, webClientId:googleWebClientKey.secret});
   
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
  return{error};
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
   let googleCredential = new GoogleCredential(authCode);
   const client = await ServicesManager.dbClient();

  const authorizedUser = await client.auth.loginWithCredential(googleCredential);
 
return authorizedUser;
}catch(error){
  return{errorStack:error};
  }
}


/**
 * Log out using the client's client.auth.logout()
 */
 async  logout() {
  try{
// Now remove user1
//await client.auth.removeUser();

  const unAuthorizedUser = await (this.client?this.client.auth.logout():false);
 
return unAuthorizedUser;
}catch(error){
  return{errorStack:error};
  }
}


}
