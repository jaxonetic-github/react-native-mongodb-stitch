/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React, { Component } from "react";
import { Root } from "native-base";
import sideBarReducer from './redux/sideBarReducer.js';
import { YellowBox,NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage} from 'react-native';
import { name as appName } from './app.json';

import mainStack from './routes.js';

import { initialStoreState } from './redux/state.js';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { rootSaga } from './redux/sagas/authSagas.js';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import resourcesReducer from './redux/resourcesReducer.js';
import videoRefsReducer from './redux/videoRefsReducer.js';
import profilesReducer from './components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from './components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from './components/Event/Redux/Reducers/eventReducer.js';
import createSagaMiddleware from 'redux-saga'

// Logger with default options
import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();
const AppContainer = createAppContainer(mainStack);

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware, logger) );

//YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps','Warning: componentWillUpdate', 'Warning: componentWillMount']);
console.disableYellowBox = true;

sagaMiddleware.run(rootSaga);

/*
 * Redux-ed application entry point
 */
export default class App extends React.Component {

 constructor() {
    super();
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
