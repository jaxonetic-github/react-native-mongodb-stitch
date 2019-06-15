// import React from 'react';
// import  {fetchEvents,getDBClient,_onPressLogin} from '../redux/sagas/authSagas.js';
import 'isomorphic-fetch'; // --> https://github.com/facebook/react-native/issues/11537
// import { cloneableGenerator } from '@redux-saga/testing-utils';
import { JEST_TIME_OUT, STATE, TYPES, getDefaultProfile, getDefaultEvent, REMOTE_RESOURCE_STRING } from '../src/constants.js';
import ServicesManager from '../src/services/servicesManager.js';

// import {insertProfile, insertEvent, deleteEvent, deleteProfile, fetchEvents, fetchProfiles, _onPressLogin, _onPressLogout}
/**
 * This a simple **preliminary** unit test spec for specific requests made to the DB.
 *
 */

successFunc = (user) => {
  console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^', user);
  authorizedUser = { ...user };
};
const delay = ms => new Promise(res => setTimeout(res, ms));

describe('DB services', () => {
  let service = null;
let authorizedUser = null;

let mock = true; // true will mock unless it the anon authorization test passes

/**
 * Before all test, create a service object and attempt to login to Stitch. If
 * successful it should return a StitchUserImpl object(see mocks/StitchUserMock.js for an example)
 */
  beforeAll(async () => {
    jest.setTimeout(JEST_TIME_OUT);

    service =  new ServicesManager(REMOTE_RESOURCE_STRING);
    await service.initialize();
    authorizedUser= await service.authorizeAnonymously();
    mock = authorizedUser.error;
  });



  it('1. authorizes successfully', async () => {
    // expect(results.errorStack).toBeFalsy();
    expect(authorizedUser).toBeTruthy();
   
  });


  it('2. deletes Events', async () => {
    if (!mock) {
      const gen = await service.crud.deleteManyEvents();
      expect(gen).toBeTruthy();
    } else {

    }
  });

  it('3. deletes Profiles', async () => {
    const gen = await service.crud.deleteManyProfiles();
    expect(gen).toBeTruthy();
  });



  it('5. inserts an event', async () => {
    // console.log(testEventAction);
    const evt = getDefaultEvent();
    let insert = await service.crud.insertSingleEvent(evt);
    expect(insert).toBeTruthy();

    let events = await service.crud.fetchEvents();

  });


  it('6. fetches events, if any, from DB', async () => {
    const results = await service.crud.fetchEvents();
    expect(results.length).toBeGreaterThanOrEqual(0);
  });

  it('7. fetches profiles, if any, from DB', async () => {
    const results = await service.crud.fetchProfiles();
    expect(results.length).toBeGreaterThanOrEqual(0);
  });


  it('attempts to logout', async () => {
    const results = await service.logout();
    expect(results).toBeFalsy();
  });
    /**
 * After all tests have been run, cleanly close down Stitch DB service
 */
  afterAll(async() => {
  // Todo::Close Stitch  ex. service.clean()
  console.log("after all");
  });
});
