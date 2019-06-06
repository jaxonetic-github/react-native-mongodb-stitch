
  
 import { call, all,put, takeEvery, take, fork } from 'redux-saga/effects'
//import { GoogleSignin } from 'react-native-google-signin';
import ServicesManager from '../../services/servicesManager'
import { googleSigninSuccess } from '../../components/Authentication/Redux/Actions/authActions.js'
import { AsyncStorage } from 'react-native'
import { LOGOUT_USER_FAILURE } from '../types.js'


export  function* googleSilentLogin(service, initialCheck) {

return null;
}


/**
* revokeAccess and signOut to force an updated authcode before calling 
* DBService.googleSignIn whi
*/
 export  function* googleAuthenticationPress(service) {
 return null
}


 export function* _onPressLogout(service) {
   
try{

//  const revoke = yield GoogleSignin.revokeAccess();
//  const signout = yield GoogleSignin.signOut();
  const logout= yield service.logout();
  console.log(logout)
}catch(error){
      yield put({ type: LOGOUT_USER_FAILURE, error })

}
  }

  

