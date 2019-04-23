/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/


import React, { Component } from "react";
import { Root } from "native-base";
import sideBarReducer from './redux/sideBarReducer.js';
import {NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage} from 'react-native';
import {name as appName} from './app.json';

import mainStack from './routes.js';

import { initialStoreState } from './redux/state.js';
import {Provider} from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { rootSaga, clean,saveAuthCode} from './redux/sagas/authSagas.js';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import resourcesReducer from './redux/resourcesReducer.js';
import profilesReducer from './components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from './components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from './components/Event/Redux/Reducers/eventReducer.js';
import eventsCRUD from './components/Event/Redux/Reducers/eventsCRUD.js';
import createSagaMiddleware from 'redux-saga'

// Logger with default options
import logger from 'redux-logger';
/*removing but keeping this emitter code.  It works but 
* the app has been re-architected and is therefore no longer needed.
*
const { RNGoogleSignin } = NativeModules;
const eventEmitter = new NativeEventEmitter(RNGoogleSignin);
const _storeAuthCode = async (event) =>{ console.log("authcode",event); if(event) await AsyncStorage.setItem('GOOGLE_SERVER_AUTHCODE', event)};
const subscription = eventEmitter.addListener('onUserAuthenticated',_storeAuthCode);
*/

const sagaMiddleware = createSagaMiddleware();
const AppContainer = createAppContainer(mainStack);

//
//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, sideBar:sideBarReducer});
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware, logger) );
//const eventEmitter = new NativeEventEmitter(RNGoogleSignin);

sagaMiddleware.run(rootSaga);

/*
 * Redux-ed application entry point
 */
export default class App extends React.Component {

 constructor() {
    super();
    this.state = {
      isReady: false
    };

  }
  componentDidMount() {
    //this.subscription = eventEmitter.addListener('onUserAuthenticated',(event)=>{sagaMiddleware.run(saveAuthCode,{payload:event});});
    // this.subscription = eventEmitter.addListener('onUserAuthenticated',this._grabAuthCode);

    }
  componentWillUnmount() {
    sagaMiddleware.run(clean/*subscription*/);
  }
  render() {
    return(
      <Root>
      <Provider store= {store}>
      <AppContainer />

      </Provider>
      </Root>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);
