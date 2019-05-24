/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React, { Component } from "react";
import { Root, Container,Header } from "native-base";
import sideBarReducer from './redux/sideBarReducer.js';
import { View,Text,YellowBox,NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage,StatusBar} from 'react-native';
import { name as appName } from './app.json';

import App from './App';

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

import FooterNav from './components/NavBars/footerNav.js';
import SideBar from './components/NavBars/sidebar.js';

import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'

import Trubrary from './components/Trubrary/trubrary.js';
import Activities from './components/Activities.js';
import Home from './components/home';
import ProfileView from './components/Profile/profileview.js';

import { createBrowserHistory,createMemoryHistory } from 'history';
import { COMMON_DARK_BACKGROUND} from './constants.js'

// Logger with default options
import logger from 'redux-logger';
import SideMenu from 'react-native-side-menu';

const history = createMemoryHistory();
const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware, logger) );

//YellowBox.ignoreWarnings(['Warning: componentWillReceiveProps','Warning: componentWillUpdate', 'Warning: componentWillMount']);
console.disableYellowBox = true;

sagaMiddleware.run(rootSaga);

/*
 * Redux-ed application entry point
 */
export default class Main extends React.Component {

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
    const menu = <SideBar/>;
    return(
      <Root>
      <Provider store={store} >
  

 <SideMenu menu={menu}>
     <NativeRouter history={history} ><Container>
      <Header style={{backgroundColor:COMMON_DARK_BACKGROUND,height:30}}></Header>

       <Switch>
      <Route exact path="/" component={Home} />
        <Route path="/Home" component={Home} />
       <Route path="/ProfileView/:id" component={ProfileView} />
       <Route  path="/Trubrary" component={Trubrary} />
        <Route  path="/Activities" component={Activities} />
      </Switch>
      </Container>
      <App />
    </NativeRouter>   
      </SideMenu>
      </Provider>
      </Root>
    );
  }
}

AppRegistry.registerComponent(appName, () => Main);
