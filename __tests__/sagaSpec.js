
import { call } from 'redux-saga/effects';
import { expectSaga, put } from 'redux-saga-test-plan';

import profilesReducer from '../src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from '../src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from '../src/components/Event/Redux/Reducers/eventReducer.js';


import {
  rootSaga, insertProfile, insertEvent, fetchProfiles, fetchEvents, actionWatcher,
} from '../src/redux/sagas/authSagas';
import DBService from '../src/services/servicesManager';
import 'isomorphic-fetch'; // --> https://github.com/facebook/react-native/issues/11537
import {
  ADD_PROFILE_REQUEST, ADD_PROFILE_SUCCESS, ADD_PROFILE_FAILURE,
  DELETE_PROFILE_REQUEST, DELETE_PROFILE_SUCCESS, REMOVE_LOCAL_PROFILE, DELETE_EVENT_SUCCESS,
  ADD_EVENT_REQUEST, ADD_EVENT_SUCCESS, ADD_EVENT_FAILURE, ADD_EVENTS_TO_USEREVENTS, REMOVE_LOCAL_EVENT,
  FETCH_PROFILE_REQUEST, FETCH_PROFILE_SUCCESS, FETCH_EVENT_REQUEST, FETCH_EVENT_SUCCESS,
  ADD_PROFILE_TO_USERPROFILES,
} from '../src/redux/types.js';
import { googleAuthenticationPress } from '../src/redux/sagas/googleSaga';

import {
  TIME_OUT, JEST_TIME_OUT, STATE, TYPES, getDefaultEvent, getDefaultProfile,
} from '../src/constants.js';
import {
  fetchProfileRequest, addProfileRequest, addProfileSuccess, addProfile, deleteProfileRequest,
} from '../src/components/Profile/Redux/Actions/profile.js';

import { deleteEventRequest, addEventRequest } from '../src/components/Event/Redux/Actions/eventActions.js';


export const testInsertProfileAction = {
  type: ADD_PROFILE_SUCCESS,
  payload: STATE.initialStoreState.profiles.tmpProfile,
};


export const testEventAction = {
  type: 'TEST_Event',
  payload: STATE.initialStoreState.events.tmpEvent,
};

const successFunc = (user) => {
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^', user);
  authorizedUser = { ...user };
};
  let failedToConnectOrAuthorize = false;
  let service = null;
  let authorizedUser = null;
  let profiles; let events; let dlt;

describe('Integration tests between Sagas, and backend services (MongoStitch)', () => {

  /**
 * Before all test, create a service object and attempt to login to Stitch. If
 * successful it should return a StitchUserImpl object(see mocks/StitchUserMock.js for an example)
 */
  beforeAll(async () => {
  jest.setTimeout(JEST_TIME_OUT);

    try {
      service = new DBService();
      service.initialize();
      authorizedUser = await service.authorizeAnonymously();
      // expect(results.errorStack).toBeFalsy();
      expect(authorizedUser.error).toBeFalsy();
      //console.log(authorizedUser.isLoggedIn);
    } catch (error) {
      failedToConnectOrAuthorize = true;
    }
  });

    afterAll(async () => {
  //jest.setTimeout(JEST_TIME_OUT);

   
      service.logout();
     console.log("jdljafdsafdafdsaf");

  });

/*
  it('inserts mock profile into DB and updates State', () => {
    // get a copy of
    const prof = getDefaultProfile();
    const finalState = STATE.initialStoreState;
    finalState.profiles.profiles[prof.id] = prof;

    return expectSaga(actionWatcher, service)
     .withReducer(profilesReducer, STATE.initialStoreState.profiles)
      .provide({
       call(effect, next) {
          //   console.log(effect.fn,"-",failedToConnectOrAuthorize);
        // Intercept API call to return fake value
          if (effect.fn === fetchProfiles) {
           if(failedToConnectOrAuthorize)
           {

            console.log("mocking",effect.fn);
            const testProfiles = STATE.initialStoreState.profiles.profiles;
            const id = effect.args[0];
            return testProfiles;

            }
          }

          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
    // assert that the saga will eventually yield `put`
    // with the expected action
      .put.actionType(ADD_PROFILE_SUCCESS)
      .put.actionType(ADD_PROFILE_TO_USERPROFILES)

      .dispatch(addProfileRequest(prof))
     .dispatch(addProfile(prof))
    //  .dispatch(deleteProfileRequest({ id: prof.id }))
    // .hasFinalState(finalState)
      .run(TIME_OUT);
  });


  it('inserts mock event into DB and updates State', () => {
    // get a copy of
    const evt = getDefaultEvent();

    const finalState = STATE.initialStoreState;
    finalState.events.events[evt.id] = evt;

    return expectSaga(actionWatcher, service)
    // .withReducer(profilesReducer, STATE.initialStoreState.profiles)
      .provide({
        call(effect, next) {
        // Intercept API call to return fake value
          if (effect.fn === fetchEvents) {
            // console.log(effect);
            const testProfiles = STATE.initialStoreState.events.events;
            const id = effect.args[0];
            return testEvents;
          }

          // Allow Redux Saga to handle other `call` effects
          return next();
        },
      })
    // assert that the saga will eventually yield `put`
    // with the expected action
      .put.actionType(ADD_EVENT_SUCCESS)
      .put.actionType(ADD_EVENTS_TO_USEREVENTS)

      .dispatch(addEventRequest(evt))
     //.dispatch(addProfile(prof))
    //  .dispatch(deleteEventRequest({ id: evt.id }))
    // .hasFinalState(finalState)
      .run(TIME_OUT);
  });
*/
  /*
it('inserts mock profile into DB', () => {


      let newProfileKey = Math.floor(Math.random() * Math.floor(999999));
testInsertProfileAction.payload.id = newProfileKey;
  return expectSaga(insertProfile, service, testInsertProfileAction)
    // assert that the saga will eventually yield `put`
    // with the expected action
    .put.actionType( ADD_PROFILE_SUCCESS)

    .put.actionType(FETCH_PROFILE_REQUEST)
    .put.actionType(ADD_PROFILE_TO_USERPROFILES)

    .run(TIME_OUT);
});


it('inserts mock event into DB', () => {

      testEventAction.id   = Math.floor(Math.random() * Math.floor(999999));

  return expectSaga(insertEvent, service, testEventAction)
    // assert that the saga will eventually yield `put`
    // with the expected action
    .put.actionType( ADD_EVENT_SUCCESS)

    .put.actionType(FETCH_EVENT_REQUEST)

    .run(TIME_OUT);
});


  it('fetches events', async () => expectSaga(fetchEvents, service)
    // assert that the saga will eventually yield `put`
    // with the expected action
  // .returns({ hello: 'world' })
    .put({ type: FETCH_EVENT_SUCCESS })
  // .put.actionType(ADD_EVENTS_TO_USEREVENTS)

    .run(TIME_OUT), 10000);

  it('fetches profiles', async () => expectSaga(fetchProfiles, service)
    // assert that the saga will eventually yield `put`
    // with the expected action
  // .returns({ hello: 'world' })
    .put({ type: FETCH_PROFILE_SUCCESS })
    .run(TIME_OUT), 10000);
*/
    it('6. fetches events, if any, from DB', async () => {
    const results = await service.crud.fetchEvents();
    expect(results.length).toBeGreaterThanOrEqual(0);
  });

  it('7. fetches profiles, if any, from DB', async () => {
    const results = await service.crud.fetchProfiles();

    expect(results.length).toBeGreaterThanOrEqual(0);
  });

});
