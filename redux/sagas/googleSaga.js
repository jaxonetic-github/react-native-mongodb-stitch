
  
 import { call, all,put, takeEvery, take, fork } from 'redux-saga/effects'
import { GoogleSignin } from 'react-native-google-signin';
import ServicesManager from '../../services/servicesManager.js'
import { googleSigninSuccess } from '../../components/Authentication/Redux/Actions/authActions.js'
import { AsyncStorage } from 'react-native'
import { LOGOUT_USER_FAILURE } from '../types.js'


export  function* googleSilentLogin(service, initialCheck) {

const playServices = yield GoogleSignin.hasPlayServices();
let isGoogleUser = yield GoogleSignin.isSignedIn();
let googleUser =  yield GoogleSignin.getCurrentUser();

try{
 if(playServices && isGoogleUser && !googleUser) 

{
   googleUser = yield GoogleSignin.signInSilently();
   isGoogleUser = yield GoogleSignin.isSignedIn();

}
}catch(error){console.log("silentlog in failed",error)}
return googleUser;
}


/**
* revokeAccess and signOut to force an updated authcode before calling 
* DBService.googleSignIn whi
*/
 export  function* googleAuthenticationPress(service) {
  let googleUser,other ;
  let revokeAccess,signOut;

try{
 
  googleUser = yield GoogleSignin.signIn();
if(!googleUser.serverAuthCode){
  yield GoogleSignin.revokeAccess();
  yield GoogleSignin.signOut();
}
  googleUser = yield service.googleSignIn(googleUser.serverAuthCode);

  if(googleUser && googleUser.isLoggedIn){
     yield put(googleSigninSuccess(googleUser));
  }

return googleUser;
  
  } catch (error) {
    console.log('***********************',error)
  }


}


 export function* _onPressLogout(service) {
   
try{

  yield GoogleSignin.revokeAccess();
  yield GoogleSignin.signOut();
  yield service.logout();
}catch(error){
      yield put({ type: LOGOUT_USER_FAILURE, error })

}
  }

  

