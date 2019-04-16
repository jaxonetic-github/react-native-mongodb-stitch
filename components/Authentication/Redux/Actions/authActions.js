import {INTERNET_CONNECTIVITY_CHANGED_DETECTED, GOOGLE_SERVERAUTHCODE_RECEIVED, GOOGLE_SIGNIN_SUCCESS, GOOGLE_SIGNOUT,GOOGLE_SIGNIN_REQUEST,DB_CLIENT_INITIALIZED,DB_CLIENT_ALREADY_INITIALIZED, LOGIN_USER_REQUEST, LOGOUT_USER,LOGIN_SUCCESS } from '../../../../redux/types';

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
export function googleSignInRequest()
{
  return {type: GOOGLE_SIGNIN_REQUEST }
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
/*
export function login(credentials, successFlag, token, errorMsg) {
 

  localStorage.setItem('token', token);

    return {
        type: LOGOUT_USER
    }
}



export function loginUserSuccess(token) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        dispatch(pushState(null, '/login'));
    }
}

export function loginUser(email, password, redirect="/") {
    return function(dispatch) {
        dispatch(loginUserRequest());
        return fetch('http://localhost:3000/auth/getToken/', {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: email, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    dispatch(pushState(null, redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
*/

