
  import React from 'react'
import {NativeEventEmitter,NativeModules,  Button, StyleSheet, Text, View } from 'react-native';
 import { call, all,put, takeEvery, take, fork,putResolve } from 'redux-saga/effects'
import {REMOVE_LOCAL_EVENT,REMOVE_LOCAL_PROFILE, ADD_PROFILE_REQUEST,ADD_PROFILE_FAILURE, ADD_PROFILE_SUCCESS,DELETE_PROFILE_SUCCESS,DELETE_PROFILE_FAILURE,DELETE_PROFILE_REQUEST,
 FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE,FETCH_PROFILE_REQUEST,DELETE_EVENT_SUCCESS,DELETE_EVENT_FAILURE,
 DELETE_EVENT_REQUEST,FETCH_EVENT_REQUEST , FETCH_EVENT_SUCCESS, LOGOUT_USER_FAILURE,
FETCH_EVENT_FAILURE,LOGIN_SUCCESS,LOGIN_FAILURE, LOGIN_USER_REQUEST, LOGOUT_USER,
      GOOGLE_SIGNOUT, GOOGLE_SIGNIN_REQUEST,GOOGLE_SIGNIN_SUCCESS, UPDATE_PROFILE_REQUEST,UPDATE_EVENT_REQUEST, 
      ADD_PROFILE_TO_USERPROFILES, ADD_EVENTS_TO_USEREVENTS, ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE ,
    GOOGLE_SERVERAUTHCODE_RECEIVED} from '../types.js';
    
import {loginFailed, loginSucceeded,loginUserRequest,dbClientInitialized, dbClientAlreadyInitialized } from '../../components/Authentication/Redux/Actions/authActions.js';
 
import { addEventSuccess,addEventFailure,removeLocalEvent,deleteEventSuccess,updateEventSuccess, addEventsToLocal, requestFetchEvent, fetchEventFailure, fetchEventSuccess,updateEventFailure,deleteEventFailure } from '../../components/Event/Redux/Actions/eventActions.js'
import { deleteProfileSuccess,updateProfileSuccess,updateProfileFailure,fetchProfileSuccess, removeLocalProfile, addProfile,fetchProfileFailure, addProfileSuccess,addProfileFailure,fetchProfileRequest,deleteProfileFailure } from '../../components/Profile/Redux/Actions/profile.js'

import ServicesManager from '../../services/servicesManager'
import {googleAuthenticationPress, _onPressLogout,googleSilentLogin} from './googleSaga'
import {resourceData, REMOTE_RESOURCE_STRING} from '../../constants.js'


/**
 * Insert an profile object to DB
 * @param service, the DAO service object
 * @param action,  redux action with a profile object as payload
 */
  export function* insertProfile(service, action) {
   try {
const results =  yield call (service.insertSingleProfile, action.payload);
if(results && results.insertedId){
   yield put(addProfileSuccess(results));
      const profiles  = yield call ( fetchProfiles, service );
  yield put(addProfile(profiles));

      }else {
          //no client
           yield put(addProfileFailure(results))
        }

  }catch(error) {
    yield put(addProfileFailure(error));
    return null;
  }

  }

/**
 * Insert an event object to DB
 * @param service, the DAO service object
 * @param action,  redux action with an event object as payload
 */
  export function* insertEvent(service, action) {
    // Get a MongoDB Service Client
try{
  const results = yield call (service.insertSingleEvent, action.payload) 
  if(results && results.insertedId){
   yield put(addEventSuccess(results))

           yield put( requestFetchEvent() );
}
        else {
          //no client
           yield put(addEventFailure(results))
        }
  }
  catch(error) {
    yield put(addEventFailure(error));
  }
}


/**
 * Insert an event object to DB
 * @param service, the DAO service object
 * @param action,  redux action with an event object as payload
*/
  export function* updateEvent(service, action) {
    // Get a MongoDB Service Client
try{
  const results = yield call (service.updateSingleEvent, action) 

  const { matchedCount, modifiedCount } = results;
  
  if(matchedCount && modifiedCount){
   yield put(updateEventSuccess(results))
  }
  else {
           yield put(updateEventFailure(results))
        }
  }
  catch(error) {
    yield put(updateEventFailure(error))
  }
}

/**
 * Insert an event object to DB  
 * @param service: the DAO service object
 * @param action:  redux action with an event object as payload
 */
  export function* updateProfile(service, action) {
    // Get a MongoDB Service Client
try{
  const results = yield call (service.updateSingleProfile, action) 

  const { matchedCount, modifiedCount } = results;
  
  if(matchedCount && modifiedCount){
   yield put(updateProfileSuccess(results))

}
        else {
          //no client
           yield put(updateProfileFailure(results))
        }
  }
  catch(error) {
    yield put(updateProfileFailure(error))
  }
}


/** Insert an event object to DB 
 *   
 * @param service: the DAO service object
 *   @param action : an object of the form {id:xyzID}
 */
  export function* deleteEvent(service, action) {
    // Get a MongoDB Service Client
try{

const results = yield call(service.deleteEvent, action.payload);
    if(results.deletedCount>=0){
  
   yield put(deleteEventSuccess(results.deletedCount ))
//FOR NOW update store by requesting fresh events list from db, todo: Stitch watcher 
   yield put(removeLocalEvent(action.payload));
   
        }else {
          //-1 delete count???
           yield put(deleteEventFailure("-1 deletedCount detected" ))
        }
  }
  catch(error) {
    yield put(deleteEventFailure(error))
  }

}

/** Insert an event object to DB  
 *   @param service : the DAO service object
 *   @param action : a redux action where action.payload={id:xyz}
 */
  export function* deleteProfile(service,action) {

try{
const results = yield call (service.deleteProfile, action.payload);

//FUTURE : note in the logs when deleteCount is 0 
   if(results.deletedCount>=0){
   yield put(deleteProfileSuccess(results.deletedCount ))
   yield put(removeLocalProfile(action.payload));
        }else {
           yield put(deleteProfileFailure("-1 deletedCount detected" ))
        }  
 } catch(error) {
    yield put(deleteProfileFailure(error));
  }
}


/**
 * Fetch all events
 * @param service : a DAO object
 */
  export function* fetchEvents(service) {

try{
        let events = yield call(service.fetchEvents);
        if(events  && events.errorStack)
          {
            yield put(fetchEventFailure(events.errorStack+"\n"+events.error.message))
          }else
          {
            //store all the events 
            yield put(fetchEventSuccess(events));
       
            //store the remaining filtered events accessible to user
            yield put(addEventsToLocal(events));
         }
       return events;
 }catch(error) {
    yield put(fetchEventFailure(error))
  }
  }
  

/**
 * Fetch all profiles 
 * @param service: a DAO object
 */
  export function* fetchProfiles(service) {

try{
    
      const profiles = yield call(service.fetchProfiles);
      if(!profiles.errorStack){
         yield put(fetchProfileSuccess(profiles));
       }else
       {
            yield put(fetchProfileFailure(profiles.errorStack+profiles.error.message) )
       }
return profiles;
 }catch(error) { //catch unexpected errors

    yield put(fetchProfileFailure(error))
  }
  
  }

/**
 * Authorize a user no the backend and update state with results()
 * @param service:  A DAO object
 */
 export function* authorizeUser(service) {

   try{
      const user = yield call(service.authorizeAnonymously);
      yield put(loginSucceeded(user))
      return user;
    }catch(error){
      yield put(loginFailed(error))
  }
}

/**
 *  fetch App info and start configuration of google services
 *  @param service: a DAO object
 */
  export function* _onAuthSucess(service) {
   yield put( requestFetchEvent() );
   yield put( fetchProfileRequest() );

   //set up google services
   yield call (service.configureGoogleKeys);

  }
/**
 *  fetch App info and start configuration of google services
 *  @param service: a DAO object
 */
  export function* logout(service) {
   
   //set up google services
   yield call (service.logout);

  }
/**
* actionWatcher : Spawns the generator fuctions that listens for actions
* @param service: a DAO object
*/
export function* actionWatcher(service) {
     yield takeEvery(LOGIN_USER_REQUEST, authorizeUser,service);
  yield takeEvery(GOOGLE_SIGNOUT, logout,service);
  yield takeEvery(LOGIN_SUCCESS, _onAuthSucess, service);
  yield takeEvery (GOOGLE_SIGNIN_REQUEST, googleAuthenticationPress,service,false )
   yield takeEvery(ADD_PROFILE_REQUEST, insertProfile, service.stitchCrudServices);
   yield takeEvery(ADD_EVENT_REQUEST, insertEvent, service.stitchCrudServices);
   yield takeEvery(UPDATE_EVENT_REQUEST, updateEvent, service.stitchCrudServices);
   yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfile, service.stitchCrudServices);
   yield takeEvery(FETCH_PROFILE_REQUEST, fetchProfiles, service.stitchCrudServices);
   yield takeEvery(FETCH_EVENT_REQUEST, fetchEvents, service.stitchCrudServices);
   yield takeEvery(DELETE_EVENT_REQUEST, deleteEvent, service.stitchCrudServices);
   yield takeEvery(DELETE_PROFILE_REQUEST, deleteProfile, service.stitchCrudServices);
}


/*
 * clean 
 * meant to be a cleanup function
 *
export function *clean(emitterListener) {
  emitterListener.remove();

}*/

/*
 * 
 *
export function *loadYoutubeLists() {
  const youtube = resourceData;//await fetch(this.state.baseURL);
  console.log(youtube);
  return youtube;
}
*/
 
/** only export the rootSaga
 *  single entry point to start all Sagas at once
 */
export  function* rootSaga() {
  let authUser;
  const service =  new ServicesManager(REMOTE_RESOURCE_STRING);
  console.log("rootsaga",service);
yield service.initialize()
//  yield service.authListen();

try{
    authUser = yield call(authorizeUser, service);

    if(!authUser){
      authUser = yield service.dbServices.authorizeAnonymously();
    }

    if(authUser.isLoggedIn){

    //start listening  for actions
    yield fork(actionWatcher, service);

    //retrieve data from backend
    yield call(  _onAuthSucess, service); 
}
else{
  console.error('StitchUser Unable to Login:=>', authUser);
}

}catch(error){
console.log(authUser,"--------------",error);
 yield fork(actionWatcher, service);
}

}
