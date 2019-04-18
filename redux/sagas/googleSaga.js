
  
 import { call, all,put, takeEvery, take, fork } from 'redux-saga/effects'
import { GoogleSignin } from 'react-native-google-signin';
import DBService from '../../services/dbService.js'
import { googleSigninSuccess } from '../../components/Authentication/Redux/Actions/authActions.js'
import { AsyncStorage } from 'react-native'
import { LOGOUT_USER_FAILURE } from '../types.js'


export  function* googleSilentLogin(service, initialCheck) {

const playServices = yield GoogleSignin.hasPlayServices();
let isGoogleUser = yield GoogleSignin.isSignedIn();
let googleUser =  yield GoogleSignin.getCurrentUser();
console.log(isGoogleUser,'-1---------', googleUser)

try{
 if(playServices && isGoogleUser && !googleUser) 

{
  console.log('djaslfhjkdslafjadslkfkjl', isGoogleUser);
   googleUser = yield GoogleSignin.signInSilently();
   isGoogleUser = yield GoogleSignin.isSignedIn();
     console.log('djaslfhjkdslafjadslkfkjl', isGoogleUser);

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
   //const tmp = yield AsyncStorage.getItem('GOOGLE_SERVER_AUTHCODE');

  //revokeAccess = yield GoogleSignin.revokeAccess();
  //console.log("revokeAccess",revokeAccess);
  //signOut = yield GoogleSignin.signOut();
  //console.log("Googlesignout before signin",signOut);
  googleUser = yield GoogleSignin.signIn();
    console.log("Googleuser after signin",googleUser);
if(!googleUser.serverAuthCode){
  yield GoogleSignin.revokeAccess();
  console.log("revoking Access");
  yield GoogleSignin.signOut();
    console.log("signingOut;");

}
  googleUser = yield service.googleSignIn(googleUser.serverAuthCode);

  console.log("post Stitch/Googlemsignin attempt",googleUser);


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

  

