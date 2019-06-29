/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React, { Component } from "react";
import { Root, Container,Header, Left } from "native-base";
import sideBarReducer from './src/redux/sideBarReducer.js';
import { StyleSheet, View,Text,YellowBox,NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage,StatusBar} from 'react-native';
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

import { Switch, Route, Redirect,Link } from 'react-router'
import { NativeRouter } from 'react-router-native'

import Trubrary from './src/components/Trubrary/trubrary';
import YouTubeList from './src/components/Trubrary/youtubeList.js';
import Activities from './src/components/Activities/Activities';
import SimpleWebview from './src/components/WebResources/simpleWebView.js';
import Home from './src/components/Home/home';
import CalendarView from './src/components/calendarView';
import MapView from './src/components/mapview';
import ProfileView from './src/components/Profile/profileview';
import EventView from './src/components/Event/eventView.js';

import { COMMON_DARK_BACKGROUND, COMMON_ICON_STYLE_SILVER, 
        ROUTE_PROFILE_VIEW,ROUTE_EVENT_VIEW, ROUTE_YOUTUBELIST_VIEW,ROUTE_ROOT,
         ROUTE_HOME, ROUTE_ACTIVITIES, ROUTE_TRUBRARY, ROUTE_MAPVIEW, 
         ICON_TAG_MENU, iconManager} from './src/constants.js'

// Logger with default options
import logger from 'redux-logger';
import SideMenu from 'react-native-side-menu';

const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});

//create redux store
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
  
render() {
  const header = Platform.select({
                    ios: <Header style={styles.headerStyle}><Left>{iconManager(ICON_TAG_MENU, styles.headerIconStyle)}</Left></Header>,
                    android: <Header style={styles.headerStyle}>{iconManager(ICON_TAG_MENU, styles.headerIconStyle)}</Header> ,
                  });
  
  return(<Root><Provider store={store}><NativeRouter >
    <SideMenu menu={<SideBar/>}>
     <Container>
        {header}
       <Switch >
        <Route exact path={ROUTE_ROOT}  component={Home} />
        <Route path={ROUTE_HOME} component={Home}/>
        <Route path={ROUTE_MAPVIEW} render={(props) => <MapView {...props}/>}/>
        <Route  path={ROUTE_TRUBRARY} render={(props) => <Trubrary {...props} />} />
        <Route  path="/EventCalendar" render={(props) => <CalendarView {...props} />} />
        <Route  path="/SimpleWebView" render={(props) => <SimpleWebview {...props} />} />
        <Route  path={ROUTE_YOUTUBELIST_VIEW} render={(props) => <YouTubeList {...props} />} />
        <Route exact path={ROUTE_ACTIVITIES} render={ (props)=> <Activities {...props} />} />
        <Route exact path={ROUTE_PROFILE_VIEW} render={(props) => <ProfileView {...props}  />} />
        <Route path={ROUTE_PROFILE_VIEW+"/:id"} render={(props) => <ProfileView {...props}  />} />
        <Route path={ROUTE_EVENT_VIEW+"/:id"} render={(props) => <EventView {...props}  />}/>} />
        <Route path={ROUTE_EVENT_VIEW} render={(props) => <EventView {...props}  />}/>} />
      </Switch>
    </Container>
      <BottomNav />
    </SideMenu>
    </NativeRouter></Provider></Root>
    );
  }
}


const styles = StyleSheet.create({
  headerIconStyle: Platform.select({
      ios: {fontSize: 30, color: 'silver'},
      android: {fontSize: 30, color: 'silver', position:'absolute',left:5, padding:10}
    }),
  headerStyle: {backgroundColor:COMMON_DARK_BACKGROUND,height:45},
  
});


AppRegistry.registerComponent(appName, () => Main);
