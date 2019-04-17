
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
    
import { loginSucceeded, logout,loginUserRequest,dbClientInitialized, dbClientAlreadyInitialized } from '../../components/Authentication/Redux/Actions/authActions.js';
 
import { requestFetchEvent } from '../../components/Event/Redux/Actions/eventActions.js'
import { fetchProfileRequest } from '../../components/Profile/Redux/Actions/profile.js'

//import { googleSigninSuccess } from '../../components/Authentication/Redux/Actions/authActions.js'
import DBService from '../../services/dbService.js'
import {googleAuthenticationPress, _onPressLogout,googleSilentLogin} from './googleSaga.js'
import {resourceData} from '../../constants.js'


/** Insert a profile into the DB */
  export function* insertProfile(service, action) {

   try {
console.log(action)
const results =  yield call (service.insertSingleProfile, action.payload);

if(results && results.insertedId){
   yield put({ type: ADD_PROFILE_SUCCESS});
      const profiles  = yield call ( fetchProfiles, service );
  yield put({type: ADD_PROFILE_TO_USERPROFILES, payload:profiles});

      }else {
          //no client
           yield put({ type: ADD_PROFILE_FAILURE, payload:results })
        }
  }catch(error) {
    console.log("insertprofilesagaerror", error);
    yield put({ type: ADD_PROFILE_FAILURE, payload:error })
  }

  }

/** Insert an event object to DB  */
  export function* insertEvent(service, action) {
    // Get a MongoDB Service Client
try{
  const results = yield call (service.insertSingleEvent, action.payload) 
  if(results && results.insertedId){
   yield put({ type: ADD_EVENT_SUCCESS, payload:results })

           yield put( requestFetchEvent() );
}
        else {
          //no client
           yield put({ type: ADD_EVENT_FAILURE, payload:results })
        }
  }
  catch(error) {
    yield put({ type: ADD_EVENT_FAILURE, error })
  }
}


/** Insert an event object to DB  */
  export function* updateEvent(service, action) {
    // Get a MongoDB Service Client
try{
  const results = yield call (service.updateSingleEvent, action) 

  const { matchedCount, modifiedCount } = results;
  
  if(matchedCount && modifiedCount){
   yield put({ type: 'UPDATE_EVENT_SUCCESS', payload:results })

}
        else {
          //no client
           yield put({ type: 'UPDATE_EVENT_FAILURE', payload:results})
        }
  }
  catch(error) {
    yield put({ type: 'UPDATE_EVENT_FAILURE', error })
  }
}

/** Insert an event object to DB  */
  export function* updateProfile(service, action) {
    // Get a MongoDB Service Client
try{
  const results = yield call (service.updateSingleProfile, action) 

  const { matchedCount, modifiedCount } = results;
  
  if(matchedCount && modifiedCount){
   yield put({ type: 'UPDATE_PROFILE_SUCCESS', payload:results })

}
        else {
          //no client
           yield put({ type: 'UPDATE_PROFILE_FAILURE', payload:results})
        }
  }
  catch(error) {
    yield put({ type: 'UPDATE_PROFILE_FAILURE', error })
  }
}


/** Insert an event object to DB 
 *   @param service : an object of the form {id:xyzID} 
 *   @param action : an object of the form {id:xyzID}
 */
  export function* deleteEvent(service, action) {
    // Get a MongoDB Service Client
try{

const results = yield call(service.deleteEvent, action.payload);
    if(results.deletedCount>=0){
  
   yield put({ type: 'DELETE_EVENT_SUCCESS', payload:results.deletedCount })
//FOR NOW update store by requesting fresh events list from db, todo: Stitch watcher 
   yield put({ type: 'REMOVE_LOCAL_EVENT', payload:action.payload})
   
        }else {
          //-1 delete count???
           yield put({ type: 'DELETE_EVENT_FAILURE', payload:"-1 deletedCount detected" })
        }
  }
  catch(error) {
    yield put({ type: 'DELETE_EVENT_FAILURE', error })
  }

}

/** Insert an event object to DB  
*   @param action : an object of the form {id:xyzID}
*/
  export function* deleteProfile(service,action) {

try{
const results = yield call (service.deleteProfile, action.payload);

//FUTURE : note in the logs when deleteCount is 0 
   if(results.deletedCount>=0){
   yield put({ type: 'DELETE_PROFILE_SUCCESS', payload:results.deletedCount })
   yield put({ type: 'REMOVE_LOCAL_PROFILE', payload:action.payload })
//FOR NOW update store by requesting fresh events list from db, todo: Stitch watcher 
        }else {
          //no client
           yield put({ type: 'DELETE_PROFILE_FAILURE', payload:"-1 deletedCount detected" })
        }
  
 } catch(error) {
    yield put({ type: 'DELETE_PROFILE_FAILURE', error })
  }

}


/** Fetch all events   */
  export function* fetchEvents(service) {

try{
  
        let events = yield call(service.fetchEvents);
        if(events  && events.errorStack)
          {
            yield put({type:FETCH_EVENT_FAILURE, error:events.errorStack+events.error.message})
        
          }else
          {
        //store all the events 
            yield put({type: FETCH_EVENT_SUCCESS, payload:events});
       
        //store the remaining filtered events accessible to user
        yield put({type: ADD_EVENTS_TO_USEREVENTS, payload:events});
         }
       return events;
 }catch(error) {
    yield put({ type: FETCH_EVENT_FAILURE, error })
  }
  }
  

/** Fetch all profiles   */
  export function* fetchProfiles(service) {

try{
    
      const profiles = yield call(service.fetchProfiles);
      if(!profiles.errorStack){
         yield put({type: FETCH_PROFILE_SUCCESS, payload:profiles});
       }else
       {
            yield put({ type: FETCH_PROFILE_FAILURE, error:profiles.errorStack+profiles.error.message })
       }
               console.log("profiles",profiles);

return profiles;
 }catch(error) { //catch unexpected errors
    yield put({ type: FETCH_PROFILE_FAILURE, error })
  }
  
  }

 export function* authorizeUser(service) {

try{
      const user = yield call(service.authorize);
      yield put(loginSucceeded(user))
      return user;
}catch(error){
      yield put({ type: LOGIN_FAILURE, error })
}
  }
/*
 export function* _onPressLogin(service) {

try{
      const user = yield call(service.authorizeAnonymously);
      yield put(loginSucceeded(user))
      return user;
}catch(error){
      yield put({ type: LOGIN_FAILURE, error })
}
  }
 */
/*
 export function* saveAuthCode(action) {
console.log(action);
try{
       if(action.payload)
       yield AsyncStorage.setItem('GOOGLE_SERVER_AUTHCODE', action.payload);

}catch(error){
    console.log(error)
}
  }
*/
  export function* _onAuthSucess(service) {
  //yield put(NavigationActions.navigate({ routeName: 'Main' }));
  //NavigationService.navigate('Inner' );
  //yield navigate({ routeName: 'Inner' });
   yield put( requestFetchEvent() );
   yield put( fetchProfileRequest() );

   //After a successfull authentication, pass 
   yield call (service.configureGoogleKeys);

  }


export function* actionWatcher(service) {

    // yield takeEvery(LOGIN_USER_REQUEST, _onPressLogin,service);
  // user requests to log-in
     yield takeEvery(LOGIN_USER_REQUEST, authorizeUser,service);
   
  // user 
  yield takeEvery(GOOGLE_SIGNOUT, _onPressLogout,service);
  yield takeEvery(LOGIN_SUCCESS, _onAuthSucess, service);

  yield takeEvery (GOOGLE_SIGNIN_REQUEST, googleAuthenticationPress,service,false )

   yield takeEvery(ADD_PROFILE_REQUEST, insertProfile, service);
   yield takeEvery(ADD_EVENT_REQUEST, insertEvent, service);
   yield takeEvery(UPDATE_EVENT_REQUEST, updateEvent, service);
   yield takeEvery(UPDATE_PROFILE_REQUEST, updateProfile, service);

   yield takeEvery(FETCH_PROFILE_REQUEST, fetchProfiles, service);
   yield takeEvery(FETCH_EVENT_REQUEST, fetchEvents, service);
      yield takeEvery(DELETE_EVENT_REQUEST, deleteEvent, service);

      yield takeEvery(DELETE_PROFILE_REQUEST, deleteProfile, service);
//yield takeEvery(GOOGLE_SERVERAUTHCODE_RECEIVED, saveAuthCode)
}


export function *clean(emitterListener) {
  emitterListener.remove();

}

export function *loadYoutubeLists() {
  const youtube = resourceData;//await fetch(this.state.baseURL);
  console.log(youtube);
  return youtube;
}

 
/** only export the rootSaga
 *  single entry point to start all Sagas at once
 */
export  function* rootSaga(serviceArg) {
  let authUser;
  const service = serviceArg || new DBService();
  yield service.authListen();

try{
    authUser = yield call(authorizeUser, service);
}catch(error){
console.log(error);
}

if(!authUser){
  authUser = yield service.authorizeAnonymously();

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

}
