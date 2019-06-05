/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Root, Container,Header } from "native-base";
import sideBarReducer from './redux/sideBarReducer.js';
import { View,Text,YellowBox,NativeEventEmitter, Platform, AppRegistry, NativeModules, AsyncStorage,StatusBar} from 'react-native';
import { name as appName } from './app.json';

import BottomNav from './components/BottomNav.js';

import { initialStoreState } from './redux/state.js';
import { Provider } from 'react-redux';
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
import YouTubeList from './components/Trubrary/youtubeList.js';
import Activities from './components/Activities.js';
import SimpleWebview from './components/WebResources/simpleWebView.js';
import Home from './components/home';
import CalendarView from './components/calendarView.js';
import MapView from './components/mapview';
import ProfileView from './components/Profile/profileview.js';
import EventView from './components/Event/eventView.js';

import { createBrowserHistory, createMemoryHistory } from 'history';
import { COMMON_DARK_BACKGROUND} from './constants.js'

// Logger with default options
import logger from 'redux-logger';
import SideMenu from 'react-native-side-menu';
import * as serviceWorker from './serviceWorker';
 
const menu = <SideBar/>;
const history = createMemoryHistory();

const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware, logger) );

console.disableYellowBox = true;
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Root><Provider store={store}><SideMenu menu={menu}>
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
    </NativeRouter></SideMenu>
    </Provider></Root>,
					 document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
