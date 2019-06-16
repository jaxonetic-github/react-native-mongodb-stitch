/**
 *
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Root } from "native-base";
import sideBarReducer from './redux/sideBarReducer.js';
import { BrowserRouter, Route } from "react-router-dom";


import { initialStoreState } from './redux/state.js';
import { Provider } from 'react-redux';
import { rootSaga } from './redux/sagas/authSagas.js';
import { createStore, applyMiddleware,combineReducers } from 'redux';
import resourcesReducer from './redux/resourcesReducer.js';
import videoRefsReducer from './redux/videoRefsReducer.js';
import profilesReducer from './components/Profile/Redux/Reducers/profileReducer.js';
import authReducer from './components/Authentication/Redux/Reducers/authReducer.js';
import eventsReducer from './components/Event/Redux/Reducers/eventReducer.js';
import createSagaMiddleware from 'redux-saga';


import App from './webApp.js';

// Logger with default options
import logger from 'redux-logger';
//import SideMenu from 'react-native-side-menu';//<SideMenu menu={menu}> </SideMenu>
import * as serviceWorker from './serviceWorker';
import {decorator as reduxBurgerMenu} from 'redux-burger-menu';
import {slide as Menu} from 'react-burger-menu';
import { createBrowserHistory } from 'history';

//A browser history object for navigation
const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

//combine reducers
const rootReducer = combineReducers({profiles: profilesReducer, events:eventsReducer, auth: authReducer, resourcesData:resourcesReducer, 
  sideBar:sideBarReducer,videoMediaPromotions:videoRefsReducer});
const store = createStore(rootReducer, initialStoreState,  applyMiddleware(sagaMiddleware, logger) );

console.disableYellowBox = true;
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Root><Provider store={store}><BrowserRouter history={history}><App /></BrowserRouter></Provider></Root>,
					 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change<WebBottomNav />
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
