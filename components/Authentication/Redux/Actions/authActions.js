import {LOGIN_FAILURE,INTERNET_CONNECTIVITY_CHANGED_DETECTED, GOOGLE_SERVERAUTHCODE_RECEIVED, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNOUT,GOOGLE_SIGNIN_REQUEST,DB_CLIENT_INITIALIZED,DB_CLIENT_ALREADY_INITIALIZED, LOGIN_USER_REQUEST, LOGOUT_USER,LOGIN_SUCCESS } from '../../../../redux/types';

/** User is attempting to log in */
export function loginUserRequest(googleUserObject) {
  return {
    type: LOGIN_USER_REQUEST, payload: googleUserObject
  }
}

/** User is attempting to log in */
export function dbClientInitialized() {
  return {
    type: DB_CLIENT_INITIALIZED, payload:'dbinitialization check'
  }
}
/** User is attempting to log in */
export function dbClientAlreadyInitialized() {
  return {
    type: DB_CLIENT_ALREADY_INITIALIZED, payload:'db already initialized'
  }
}

export function loginSucceeded(user){
    return {type: LOGIN_SUCCESS, payload:user }
}

export function loginFailed(err){
    return {type: LOGIN_FAILURE, payload:err }
}
export function googleSignInRequest(googleInfo)
{
  return {type: GOOGLE_SIGNIN_REQUEST, payload:googleInfo }
}
export function googleSignOut()
{
  return {type: GOOGLE_SIGNOUT }
}
export function googleSigninSuccess(authUser){
  
  return {type: GOOGLE_SIGNIN_SUCCESS, payload:authUser }
}
export function googleServerAuthCodeReceived(serverAuthode){
  
  return {type: GOOGLE_SERVERAUTHCODE_RECEIVED, payload:serverAuthode }
}
export function updateInternetConnectivity(isConnected){
  return {type:INTERNET_CONNECTIVITY_CHANGED_DETECTED, payload:isConnected}
}
