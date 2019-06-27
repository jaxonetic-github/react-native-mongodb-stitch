
import {PROFILES_COLLECTION, EVENT_COLLECTION,
  FUNCTION_INSERTPROFILE,FUNCTION_INSERTEVENT, FUNCTION_QUERYPROFILE, 
  FUNCTION_QUERYEVENTS, FUNCTION_UPDATEPROFILE,FUNCTION_UPDATEEVENT,
  FUNCTION_RETRIEVE_GOOGLE_WEBCLIENTID, FUNCTION_RETRIEVE_GOOGLE_IOSCLIENTID,FUNCTION_RETRIEVE_GOOGLE_APIKEY,
  FUNCTION_DELETE_PROFILE} from  '../constants.js'

/**
*  This CrudService is for the MongoDB Stitch Backend.
*  This service accesses Stitch using Stitch  Functions available through the client parameter
*  and db access methods.  I'm purposefully keeping both styles for demo/example purposes. I will
*  slowly start replacing all daos with Client Functions.
*  https://www.mongodb.com/
*/
export  default class CrudService {
/**
* @param client: client needed to access backend functions
* @param db    
*/
 constructor( db, client) {
    this.db = db;
    this.client = client;
  }
//************************ DELETE 

/** 
 *  Delete an Event from the DB
 *  @param eventIdObject :an object {id:xyzID}
 *  @returns {deletedCount:1} on success or {deleteCount:0} or the error stack on exceptions
 */
 deleteManyEvents = async ()=> {
   try {
    const eventsCollection = this.db.collection(EVENT_COLLECTION);
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
 deleteManyProfiles = async ()=> {
   try {
        const profilesCollection = await this.db.collection(PROFILES_COLLECTION).deleteMany({ _id: { $exists: true}});
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
  deleteEvent = async (eventIdObject)=> {
   try { 
    const results = await this.db.collection(EVENT_COLLECTION).deleteOne(eventIdObject)
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
  deleteProfile = async (profileIdObject)=> {
    console.log("deleting profile :=", profileIdObject);
   try {
             const client = await this.client();
      const results = await client.callFunction(FUNCTION_DELETE_PROFILE,[profileIdObject]);  
      console.log("results",results);
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
 updateSingleEvent = async (eventAction)=> {

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

const options = { upsert: true };

    try {
          const client = await this.client();

      const results = await client.callFunction(FUNCTION_UPDATEEVENT,[query,update,options]);  
      console.log("results",results);
      return results;
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
   updateSingleProfile = async (profileAction)=> {

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
    const client = await this.client();

    const results = await client.callFunction(FUNCTION_UPDATEPROFILE,[query,update,options]);  
    return results;
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
   insertSingleProfile = async (profile)=> {

   try {
    const client = await this.client();
    const profileCollection = await client.callFunction(FUNCTION_INSERTPROFILE,[profile]);  
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
   insertSingleEvent = async (event)=> {

   try {   
        const client = await this.client();

    const eventsCollection = await client.callFunction(FUNCTION_INSERTEVENT,[event]);
  
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
  getUserList = async ()=> {

try{  
      const client = await this.client();

      const users = await client.auth.listUsers().find({}).toArray();
      return users;
 }catch(error) {
    return ({errorStack:error});
  }
  
  }


/** 
  * Fetch all events 
  */
  fetchEvents = async ()=> {

  try {  
    const client = await this.client();
    const eventsCollection = await client.callFunction(FUNCTION_QUERYEVENTS);
    return eventsCollection;
  }catch(error) {
      return ({errorStack:error});
  }
  
  }

/** 
  * Fetch all Profiles 
  */
  fetchProfiles = async ()=> {

try{
    const client = await this.client();//await ServicesManager.dbClient();
    const profilesCollection = await client.callFunction(FUNCTION_QUERYPROFILE);     
    return profilesCollection;
 }catch(error) {
    return ({errorStack:error});
  }
  
  }


}