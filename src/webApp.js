import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
import { Route } from "react-router-dom";

//Navigatable components
import Home from './components/home.js';
import YouTubeList from './components/Trubrary/youtubeList.js';
import ProfileView  from './components/Profile/profileview';
import EventView from './components/Event/eventView.js';
import SimpleWebview from './components/WebResources/simpleWebView';
import CalendarView from './components/calendarView';
import MapView from './components/mapview';
import Trubrary from './components/Trubrary/trubrary.js';
import Activities from './components/Activities.js';
import SideBar from './components/NavBars/sidebar.js';

import {slide as Menu} from 'react-burger-menu';

import {   COMMON_DARK_BACKGROUND, COMMON_ICON_STYLE_SILVER,
        ROUTE_PROFILE_VIEW, ROUTE_EVENT_VIEW, ROUTE_YOUTUBELIST_VIEW,
         ROUTE_HOME, ROUTE_ACTIVITIES, ROUTE_TRUBRARY, ROUTE_MAPVIEW, ROUTE_EVENT_CALENDAR ,
       ICON_TAG_MENU, iconManager} from './constants.js';

/**
 *. The routed content and layout of the web application.  The equivalent
 *. of index.web.js
 */
export default class App extends Component {
 
 constructor(props) {
   super(props);
  }

render=()=>(
  <div id="outer-container" style={{backgroundColor:COMMON_DARK_BACKGROUND}}>
    <Menu isOpen id="menu" pageWrapId={'page-wrap'} outerContainerId={'outer-container'} >
      <SideBar />
    </Menu>
    <main id="page-wrap" style={{backgroundColor:COMMON_DARK_BACKGROUND}}>
      <div style={{backgroundColor:COMMON_DARK_BACKGROUND}}>{iconManager(ICON_TAG_MENU, COMMON_ICON_STYLE_SILVER)}</div>
      <Route exact path="/"  render={() => <Home />} />
      <Route path={ROUTE_HOME} render={() => <Home />} />
      <Route path={ROUTE_MAPVIEW} render={(props) => <MapView {...props}/>} />
      <Route  path={ROUTE_TRUBRARY} render={(props) => <Trubrary {...props} />} />
      <Route  path="/EventCalendar" render={(props) => <CalendarView {...props} />} />
      <Route  path="/SimpleWebView" render={(props) => <SimpleWebview {...props} />} />
      <Route  path={ROUTE_YOUTUBELIST_VIEW} render={(props) => <YouTubeList {...props} />} />
      <Route exact path={ROUTE_ACTIVITIES} render={ (props)=> <Activities {...props} />} />
      <Route exact path={ROUTE_PROFILE_VIEW} render={(props) => <ProfileView {...props}  />} />
      <Route path={ROUTE_PROFILE_VIEW+"/:id"} render={(props) => <ProfileView {...props}  />} />
      <Route path={ROUTE_EVENT_VIEW+"/:id"} render={(props) => <EventView {...props}  />} />
      <Route path={ROUTE_EVENT_VIEW} render={(props) => <EventView {...props}  />} />
    </main></div>)     
}

const styles = StyleSheet.create({
 
  //mapstyle: { flex: .3 },
  headerIconStyle: COMMON_ICON_STYLE_SILVER,
  headerStyle: {backgroundColor:COMMON_DARK_BACKGROUND,height:45},
  
});

