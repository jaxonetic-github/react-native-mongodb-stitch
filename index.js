/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React, { Component } from "react";
import { Root, Container,Header } from "native-base";
import sideBarReducer from './src/redux/sideBarReducer.js';
import { View,Text,YellowBox,NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage,StatusBar} from 'react-native';
import { name as appName } from './app.json';


import { initialStoreState } from './src/redux/state.js';
import { Provider } from 'react-redux';
import { createAppContainer } from 'react-navigation';
import { rootSaga } from './src/redux/sagas/authSagas.js';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import resourcesReducer from './src/redux/resourcesReducer.js';
import videoRefsReducer from './src/redux/videoRefsReducer.js';
import profilesReducer from './src/components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from './src/components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from './src/components/Event/Redux/Reducers/eventReducer.js';
import createSagaMiddleware from 'redux-saga'
import BottomNav from './src/components/NavBars/BottomNav.js';
import FooterNav from './src/components/NavBars/footerNav.js';
import SideBar from './src/components/NavBars/sidebar.js';

import { Switch, Route, Redirect } from 'react-router'
import { NativeRouter, Link } from 'react-router-native'

import Trubrary from './src/components/Trubrary/trubrary.js';
import YouTubeList from './src/components/Trubrary/youtubeList.js';
import Activities from './src/components/Activities.js';
import SimpleWebview from './src/components/WebResources/simpleWebView.js';
import Home from './src/components/home';
import CalendarView from './src/components/calendarView';
import MapView from './src/components/mapview';
import ProfileView from './src/components/Profile/profileview';
import EventView from './src/components/Event/eventView';

import { createBrowserHistory, createMemoryHistory } from 'history';
import { COMMON_DARK_BACKGROUND} from './src/constants.js'

// Logger with default options
import logger from 'redux-logger';
import SideMenu from 'react-native-side-menu';

const history = createMemoryHistory();
////////////////////////////////////////////////////////////
// then our route config
const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/Home",
    component: Home
  },
    {
    path: "/Trubrary",
    component: Trubrary
  },
  {
    path: "/Activities",
    component: Activities,
    routes: [
      {
        path: "/Activities/ProfileView",
        component: ProfileView
      },
      {
        path: "/Activities/ProfileView/:id",
        component: ProfileView
      },
      {
        path: "/Activities/EventView/:id",
        component: EventView
      }
    ]
  }

];

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
       <Switch >
        <Route exact path="/"  render={() => <Home />} />
        <Route path="/Home" render={() => <Home />}/>
        <Route path="/MapView" render={(props) => <MapView {...props}/>}/>
        <Route  path="/Trubrary" render={(props) => <Trubrary {...props} />} />
        <Route  path="/EventCalendar" render={(props) => <CalendarView {...props} />} />
        <Route  path="/SimpleWebView" render={(props) => <SimpleWebview {...props} />} />
        <Route  path="/YoutubeListView" render={(props) => <YouTubeList {...props} />} />
        <Route exact path="/Activities" render={ (props)=> <Activities {...props} />} />
        <Route exact path="/Activities/ProfileView/" render={(props) => <ProfileView {...props}  />} />
        <Route path="/Activities/ProfileView/:id" render={(props) => <ProfileView {...props}  />} />
        <Route path="/Activities/EventView/:id" render={(props) => <EventView {...props}  />}/>} />
        <Route path="/Activities/EventView" render={(props) => <EventView {...props}  />}/>} />
      </Switch>
      </Container>
      <BottomNav />
    </NativeRouter>   
      </SideMenu>
      </Provider>
      </Root>
    );
  }
}

AppRegistry.registerComponent(appName, () => Main);
