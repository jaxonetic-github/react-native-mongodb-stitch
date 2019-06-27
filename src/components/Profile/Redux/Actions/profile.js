/**
*  TODO:  Documentation
*/
import {REMOVE_LOCAL_PROFILE, FETCH_PROFILE_SUCCESS, FETCH_PROFILE_FAILURE, FETCH_PROFILE_REQUEST, ADD_NAME,
 ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE, DELETE_PROFILE_SUCCESS,DELETE_PROFILE_FAILURE,DELETE_PROFILE_REQUEST,
 ADD_DESC, ADD_EMAIL, ADD_PHONE, ADD_WEBSITE, ADD_IMAGE,ADD_PROFILE_TO_USERPROFILES,
UPDATE_PROFILE_NAME_BY_KEY, UPDATE_PROFILE_WEBSITE_BY_KEY, UPDATE_PROFILE_PHONE_BY_KEY, UPDATE_PROFILE_EMAIL_BY_KEY,UPDATE_PROFILE_IMAGE_BY_KEY,
UPDATE_PROFILE_DESC_BY_KEY, UPDATE_PROFILE_REQUEST,UPDATE_PROFILE_FAILURE, UPDATE_PROFILE_SUCCESS } from '../../../../redux/types';

/*
 * action creators
 */
export function removeLocalProfile(id) {
  return { type: REMOVE_LOCAL_PROFILE, payload:id }
}

export function updateProfileNameByKey(text, key) {
  return { type: UPDATE_PROFILE_NAME_BY_KEY, payload:text, key:key}
}
export function updateProfileDescByKey(text, key) {
  return { type: UPDATE_PROFILE_DESC_BY_KEY, payload:text, key:key}
}
export function updateProfileWebsiteByKey(text, key) {
  return { type: UPDATE_PROFILE_WEBSITE_BY_KEY, payload:text, key:key}
}
export function updateProfilePhoneByKey(text, key) {
  return { type: UPDATE_PROFILE_PHONE_BY_KEY, payload:text, key:key}
}
export function updateProfileEmailByKey(text, key) {
  return { type: UPDATE_PROFILE_EMAIL_BY_KEY, payload:text, key:key}
}
export function updateProfileImageByKey(text, key) {
  return { type: UPDATE_PROFILE_IMAGE_BY_KEY, payload:text, key:key}
}
/**
* @param results: results from backend update
*/
export function updateProfileSuccess(results) {
  return { type: UPDATE_PROFILE_SUCCESS, payload:results }
}

export function updateProfileFailure(updatedEventError) {
  return { type: UPDATE_PROFILE_FAILURE, payload:updatedEventError }
}

export function updateProfileRequest(updatedEvent) {
  return { type: UPDATE_PROFILE_REQUEST, payload:updatedEvent }
}

export function addProfileName(text) {
  return { type: ADD_NAME, payload:text }
}

export function addProfileEmail(text) {
  return { type: ADD_EMAIL, payload:text }
}

export function addProfilePhone(text) {
  return { type: ADD_PHONE, payload:text }
}

export function addProfileDescription(text) {
  return { type: ADD_DESC, payload:text }
}

export function addProfileWebsite(text) {
  return { type: ADD_WEBSITE, payload:text }
}

export function addProfileImage(text) {
  return { type: ADD_IMAGE, payload:text }
}

export function addProfile(profileObj) {
  return { type: ADD_PROFILE_TO_USERPROFILES, payload:profileObj }
}


export function fetchProfileRequest() {
 return {type: FETCH_PROFILE_REQUEST }
}
export function fetchProfileFailure(error) {
  return { type: FETCH_PROFILE_FAILURE, error: error }
}
export function fetchProfileSuccess(profiles) {
  return { type: FETCH_PROFILE_SUCCESS, payload: profiles }
}

/**
* @param idObj is {id:itemId}
*/
export function deleteProfileRequest(idObj) {
 return {type: DELETE_PROFILE_REQUEST ,  payload:idObj}
}
export function deleteProfileFailure(error) {
  return { type: DELETE_PROFILE_FAILURE, payload: error }
}
export function deleteProfileSuccess(results) {
  return { type: DELETE_PROFILE_SUCCESS, payload: results }
}


export function addProfileRequest(profile) {
  return { type: ADD_PROFILE_REQUEST, payload:profile }
}
export function addProfileSuccess(profileSuccess) {
  return { type: ADD_PROFILE_SUCCESS, payload:profileSuccess }
}
export function addProfileFailure(err) {
  return { type: ADD_PROFILE_FAILURE, payload:err }
}
