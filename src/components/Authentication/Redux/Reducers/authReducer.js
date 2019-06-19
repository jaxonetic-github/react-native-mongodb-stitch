import {INTERNET_CONNECTIVITY_CHANGED_DETECTED,GOOGLE_SERVERAUTHCODE_RECEIVED, GOOGLE_SIGNIN_SUCCESS,
  LOGIN_SUCCESS, LOGIN_USER_REQUEST, LOGOUT_USER,  DB_CLIENT_INITIALIZED, DB_CLIENT_ALREADY_INITIALIZED,
  GOOGLE_SIGNIN_REQUEST,GOOGLE_SIGNOUT} from '../../../../redux/types';

import {initialStoreState} from '../../../../redux/state.js';
import {NEED_AT_LEAST_ANONYMOUS_LOGIN} from '../../../../constants.js'

/*
 *
 const authUsersState = {
  "auth": 1,
  "users": {
    1: {"username": "mattiamanzati", "token": "resthttprequestsaccesstoken"},
    2: {"username": "another user"}
  }
}
*/
const authReducer = (state={}, action) => {

  if(!action) return state;
  
  switch(action.type){

    case INTERNET_CONNECTIVITY_CHANGED_DETECTED:
      return {
                  app:{isConnectedToInternet:action.payload} ,//boolean
                  auth: { ...state.auth } 
              };
    case LOGIN_SUCCESS:
    console.log("login success identites");
      return {
                  app: { ...state.app, registeredUser:(action.payload.identities?action.payload.identities[0].id:action.payload.userProfile.identities[0].id) },
                  auth: action.payload  
              };
    case LOGOUT_USER:
    console.log('LOGOUT_USER');
    return {
                  app:{...state.app},
                  auth:NEED_AT_LEAST_ANONYMOUS_LOGIN
              }
   
       case GOOGLE_SIGNIN_SUCCESS:
         console.log(action);
      console.log(state.app);
     return {  

        app:{...state.app, registeredUser: action.payload.auth.authInfo.userProfile.identities[0].id},
        auth:action.payload.auth.authInfo
      };
/*
     {  auth:{ googleAuthCode: action.payload,
                      google:action.payload,
                      auth:{...state.auth.auth,
                      userProfile:{...state.auth.auth.userProfile, email:action.payload.user.email, 
                                   pictureUrl:action.payload.user.photo, firstName:action.payload.user.givenName,
                                   lastName:action.payload.user.familyName, name:action.payload.user.name,
                                   data:{...state.auth.auth.userProfile.data, userState:'verified'},
                                   identities:{...state.auth.auth.userProfile.identites}}
                    },
              users:{...state.auth.users}}}; 
              */  
      case GOOGLE_SIGNOUT:

     return{  app:{...state.auth.app}, auth:NEED_AT_LEAST_ANONYMOUS_LOGIN};   
    default:
      return state;
  }

}




export default authReducer;
